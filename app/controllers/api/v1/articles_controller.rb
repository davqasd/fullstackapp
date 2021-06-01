# frozen_string_literal: true

class Api::V1::ArticlesController < Api::V1::BaseController
  def index
    @result = Api::V1::Articles.index(articles_params).result
    json_response(@result)
  end

  private

  def articles_params
    params.permit(:q, :grouped_by, :sort_by, :sort_order, :page, :size)
  end
end
