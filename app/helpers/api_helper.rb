# frozen_string_literal: true

module ApiHelper
  # Prepares a hash for response
  # @param [Symbol] data_key = field name
  # @param [Any] data - payload
  # @param [Serializer] serializer - for data model
  # @param [Serializer] each_serializer - serializer for collections
  # @return [Hash] { data_key -> serialized_data }
  def prepare(data_key, data, serializer: nil, each_serializer: nil, preload: true, params: nil)
    raise 'Only One serializer type is available' if serializer.present? && each_serializer.present?

    if serializer.present? && data.present?
      { data_key => serializer.new(data, params: params).serializable_hash[:data][:attributes] }
    elsif each_serializer.present? && data.present?
      data = data.try(:with_preload) || data if preload
      value =
        data.map do |e|
          each_serializer.new(e, params: params).serializable_hash[:data][:attributes]
        end

      { data_key => value }
    else
      { data_key => data }
    end
  end

  # Adds meta payload for requests with paginating
  # @param [ActiveRecord_Relation] object - paginated object
  # @return [Hash] meta payload
  def meta_payload(object, use_index_name = nil)
    total = if use_index_name.present?
              object.unscope(where: :id).from("#{object.table_name} USE INDEX(#{use_index_name})").total_count
            else
              object.unscope(where: :id).total_count
            end

    {
      page: object.current_page,
      size: object.size,
      total: total,
      total_pages: (total.to_f / object.limit_value).ceil,
      success: true
    }
  end

  def meta_payload_stub
    { page: 1, size: 0, total: 0, total_pages: 0, success: true }
  end
end
