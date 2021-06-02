# frozen_string_literal: true

class Article < ApplicationRecord
  TYPES = %w[facebook tweet blog].freeze
  belongs_to :story

  validates :atype, inclusion: { in: TYPES }

  after_create :broadcast_create
  after_destroy :broadcast_destroy

  def self.create_random
    return if Story.none?

    create(
      name: "name #{((rand * 100).to_i + 1) % 100}",
      body: "body: #{((rand * 100).to_i + 1) % 100}",
      atype: Article::TYPES[((rand * 100).to_i + 1) % Article::TYPES.size],
      story_id: Story.all[((rand * 100).to_i + 1) / 5 % Story.count].id
    )
  end

  private

  def broadcast_create
    data = Api::V1::Articles.show(id).result(include_meta: false)

    CableSender::Article.send_create(data)
  end

  def broadcast_destroy
    CableSender::Article.send_delete(id: id)
  end
end
