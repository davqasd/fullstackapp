# frozen_string_literal: true

module CrmLevel
  class CableSender::Base
    ALLOWED_METHODS = %i[create update delete show info].freeze
    class << self
      # send_create, send_update, ...
      ALLOWED_METHODS.each do |method|
        define_method("send_#{method}") do |data|
          send(:send_data, method: method, data: data)
        end
      end

      def send_to_stream(stream_name:, method:, data:)
        ActionCable.server.broadcast(
          stream_name,
          method: method,
          data: data
        )
      end
    end
  end
end
