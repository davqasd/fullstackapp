# frozen_string_literal: true

server ENV['HOST_IP'], user: ENV['HOST_USER'], roles: %w[app db], port: ENV['SSH_PORT']

set :branch, ENV['branch'] || 'develop'
set :default_env, RAILS_ENV: 'production'
