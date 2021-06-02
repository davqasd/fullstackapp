# frozen_string_literal: true

# config valid only for current version of Capistrano
# lock '3.4.1'

set :application, 'fullstackapp'
set :repo_url, 'git@github.com:davqasd/fullstackapp.git'
set :deploy_to, "#{ENV['HOST_APP_REPO']}/#{fetch(:application)}"
set :linked_files, %w[database.env secret.env]
set :linked_dirs, %w[bundle]
set :keep_releases, 3

set :docker_role, :app
set :docker_compose, true
set :docker_compose_project_name, fetch(:application)

namespace :docker do
  namespace :compose do
    task :bundle do
      on roles(:app) do
        within release_path do
          execute :"docker-compose", compose_run_command(:app, 'gem install bundler -v 2.1.4')
          execute :"docker-compose", compose_run_command(:app, 'bundle config --delete without')
          execute :"docker-compose", compose_run_command(:app, 'bundle config --delete with')
          execute :"docker-compose", compose_run_command(:app, 'bundle install --jobs $(nproc) --path=/usr/local/bundle')
        end
      end
    end
    task :assets do
      on roles(:app) do
        within release_path do
          execute :"docker-compose", compose_run_command(:app, 'yarn install')
          execute :"docker-compose", compose_run_command(:app, 'bundle exec rake assets:precompile')
        end
      end
    end
    task :restart do
      on roles(:app) do
        within release_path do
          execute :docker, ['restart', "`docker ps | grep #{fetch(:application)}_app | awk '{print $1;}'`"].join(' ')
        end
      end
    end
  end

  def compose_run_command(service, command)
    ['run', '--rm', '--no-deps', service, command].join(' ')
  end
end

namespace :deploy do
  before :cleanup, :cleanup_permissions

  task :cleanup_permissions do
    on roles(:app) do
      releases = capture(:ls, '-x', releases_path).split
      if releases.count >= fetch(:keep_releases)
        directories = (releases - releases.last(1))
        if directories.any?
          directories.each do |release|
            within releases_path.join(release) do
              execute :sudo, :chown, '-R', '`logname`', 'public'
              execute :sudo, :chown, '-R', '`logname`', 'tmp'
            end
          end
        else
          info t(:no_old_releases, host: host.to_s, keep_releases: fetch(:keep_releases))
        end
      end
    end
  end
end

before 'docker:deploy:compose:start', 'docker:compose:assets'
before 'docker:compose:assets', 'docker:compose:bundle'
