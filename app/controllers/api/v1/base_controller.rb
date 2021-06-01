# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  protect_from_forgery with: :null_session

  include ErrorHandling

  def json_response(data)
    render json: data
  end

  private

  # Prepares a hash for response
  # @param [Symbol] data_key = field name
  # @param [Any] data - payload
  # @param [Serializer] serializer - for data model
  # @param [Serializer] each_serializer - serializer for collections
  # @return [Hash] { data_key -> serialized_data }
  def prepare(data_key, data, serializer: nil, each_serializer: nil)
    raise 'Only One serializer type is available' if serializer.present? && each_serializer.present?

    if serializer.present? && data.present?
      { data_key => serializer.new(data).serializable_hash }
    elsif each_serializer.present? && data.present?
      { data_key => data.map { |e| each_serializer.new(e).serializable_hash } }
    else
      { data_key => data }
    end
  end
end
