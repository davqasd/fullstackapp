# frozen_string_literal: true

require 'spec_helper'

ENV['RAILS_ENV'] = 'test'
require File.expand_path('../config/environment', __dir__)

abort('The Rails environment is running not in test mode!') unless Rails.env.test?
require 'rspec/rails'

require 'capybara/rails'

require 'factory_bot_rails'
Dir[Rails.root.join('spec/support/**/*.rb')].sort.each { |f| require f }

require 'database_cleaner/active_record'

require 'webmock/rspec'

require 'byebug'

require 'faker'

RSpec.configure do |config|
  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!

  config.profile_examples = true

  config.filter_rails_from_backtrace!

  config.before(:suite) do
    DatabaseCleaner.strategy = :deletion, { except: %w[spatial_ref_sys] }
    DatabaseCleaner.clean_with :truncation, { except: %w[spatial_ref_sys] }
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
  config.backtrace_inclusion_patterns = [/app|spec/]
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
