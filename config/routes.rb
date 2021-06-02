# frozen_string_literal: true

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root 'static#index'

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :articles, only: %w[index destroy] do
        collection do
          post :create_random
        end
      end
    end
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
