# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  protect_from_forgery with: :null_session

  include ErrorHandling

  def json_response(data)
    render json: data
  end
end
