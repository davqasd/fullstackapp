# frozen_string_literal: true

class Api::V1::ArticlesController < Api::V1::BaseController
  def index
    @result = Api::V1::Articles.index(articles_params).result
    json_response(@result)
  end

  def create_random
    record = Article.create_random
    @result = Api::V1::Articles.show(record.id).result
    json_response(@result)
  end

  def destroy
    Article.find(params[:id]).destroy
    json_response(success: true)
  end

  private

  def articles_params
    params.permit(:q, :grouped_by, :sort_by, :sort_order, :page, :size)
  end
end
