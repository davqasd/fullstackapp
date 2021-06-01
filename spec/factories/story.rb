# frozen_string_literal: true

FactoryBot.define do
  factory :story do
    sequence :name do |n|
      "name #{n}"
    end
  end
end
