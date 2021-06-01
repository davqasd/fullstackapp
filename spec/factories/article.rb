# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    sequence :name do |n|
      "name #{n}"
    end
    sequence :body do |n|
      "body #{n}"
    end
    atype { Article::TYPES.first }
  end
end
