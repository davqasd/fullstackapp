# frozen_string_literal: true

module Api::V1::Articles
  extend ApiHelper

  module_function

  ACCEPTABLE_GROUP_LIST = %w[story_id atype name body].freeze

  def index(params)
    articles = list_query(params)

    meta_payload = meta_payload(articles)
    data = prepare_data(articles, params)

    Api::V1::Result.new(data: data, payload: {}, meta: meta_payload)
  end

  ## --------------------- Helpers ---------------------

  def list_query(params)
    articles = Article.all
    articles = articles.ransack(name_or_body_cont: params[:q]).result if params[:q].present?

    sort_articles(articles, params).page(params[:page]).per(params[:size])
  end

  def sort_articles(articles, params)
    sort = params[:sort_order].present? ? params[:sort_order] : :asc
    sort_by = sort_field(params)

    articles.order(sort_by => sort)
  end

  def sort_field(params)
    params[:sort_by].present? ? params[:sort_by] : :created_at
  end

  def prepare_data(articles, params)
    if ACCEPTABLE_GROUP_LIST.exclude?(params[:grouped_by])
      return prepare(:articles, articles, each_serializer: ArticlesSerializer)
    end

    prepare(
      :grouped_articles,
      group_articles(articles, params),
      each_serializer: GroupedArticlesSerializer
    )
  end

  def group_articles(articles, params)
    return {} if ACCEPTABLE_GROUP_LIST.exclude?(params[:grouped_by])

    grouped_by = params[:grouped_by]
    sort_by = sort_field(params)
    article_attributes = Article.column_names.map { |value| "'#{value}',#{value}" }.join(',')
    select_sql = <<~SQL.squish
      #{grouped_by} AS grouped_by,
      count(id) AS count_articles,
      count(atype) AS count_articles_types,
      max(created_at) AS last_created_article,
      ARRAY_AGG(json_build_object(#{article_attributes})) AS articles
    SQL

    articles.select(select_sql).group(grouped_by, sort_by)
  end
end
