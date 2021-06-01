# frozen_string_literal: true

class GroupedArticlesSerializer
  include JSONAPI::Serializer

  attributes(
    :grouped_by,
    :count_articles,
    :count_articles_types,
    :last_created_article,
    :articles
  )
end
