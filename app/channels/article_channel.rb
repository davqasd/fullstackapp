# frozen_string_literal: true

class ArticleChannel < ApplicationCable::Channel
  def subscribed
    stream_from :articles
  end
end
