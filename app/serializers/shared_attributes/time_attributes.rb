# frozen_string_literal: true

module SharedAttributes::TimeAttributes
  extend ActiveSupport::Concern

  included do
    attribute :created_at, &:created_at

    attribute :updated_at, &:updated_at
  end
end
