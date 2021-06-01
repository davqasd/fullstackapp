# frozen_string_literal: true

class Article < ApplicationRecord
  TYPES = %w[facebook tweet blog].freeze
  belongs_to :story

  validates :atype, inclusion: { in: TYPES }
end
