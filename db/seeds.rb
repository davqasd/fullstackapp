# frozen_string_literal: true

5.times do |i|
  Story.create(name: "name #{i}")
end

100.times do |i|
  Article.create(
    name: "name #{i % 20}",
    body: "body: #{i % 10}",
    atype: Article::TYPES[i % Article::TYPES.size],
    story_id: Story.all[i * 2 % Story.count].id
  )
end
