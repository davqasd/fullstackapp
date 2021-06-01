# frozen_string_literal: true

class Api::V1::Result
  attr_reader :data, :payload, :meta, :status, :errors

  def initialize(data:, payload: nil, meta: { success: true }, status: 200)
    @data = data
    @payload = payload
    @status = status

    meta['success'] = false unless success?
    @meta = { meta: meta }
  end

  def result(include_meta: true, include_payload: true)
    result = @data || {}
    result.merge!(@payload) if payload.present? && include_payload
    result.merge!(@meta) if include_meta

    result
  end

  def success?
    true
  end
end
