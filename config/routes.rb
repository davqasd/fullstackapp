# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :articles, only: %w[index]
    end
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
