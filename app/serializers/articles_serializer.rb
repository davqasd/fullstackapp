# frozen_string_literal: true

class ArticlesSerializer
  include JSONAPI::Serializer

  attributes(
    :id,
    :name,
    :body,
    :atype,
    :story_id
  )

  include SharedAttributes::TimeAttributes
end
