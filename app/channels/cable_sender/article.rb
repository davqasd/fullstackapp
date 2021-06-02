# frozen_string_literal: true

class CableSender::Article < CableSender::Base
  class << self
    def send_data(method:, data:)
      send_to_stream(stream_name: 'articles', method: method, data: data)
    end
  end
end
