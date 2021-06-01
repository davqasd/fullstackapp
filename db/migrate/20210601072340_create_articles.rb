class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :name
      t.text :body
      t.references :story, foreign_key: true
      t.string :atype

      t.timestamps

      t.index :name
      t.index :atype
    end
  end
end
