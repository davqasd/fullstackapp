class CreateStories < ActiveRecord::Migration[6.1]
  def change
    create_table :stories do |t|
      t.string :name

      t.timestamps

      t.index :name
    end
  end
end
