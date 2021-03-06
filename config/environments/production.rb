# frozen_string_literal: true

require 'active_support/core_ext/integer/time'

Rails.application.configure do
  config.cache_classes = true
  config.eager_load = true
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = false
  config.require_master_key = true
  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?
  config.assets.compile = false
  config.log_level = :info
  config.log_tags = [:request_id]
  config.i18n.fallbacks = true
  config.active_support.deprecation = :notify
  config.log_formatter = ::Logger::Formatter.new
  if ENV['RAILS_LOG_TO_STDOUT'].present?
    logger           = ActiveSupport::Logger.new($stdout)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end
  config.active_record.dump_schema_after_migration = false

  config.action_cable.url = "wss://#{ENV['DOMAIN']}:#{ENV['WEBSOCKETS_PORT'] || 8080}/cable"
end
