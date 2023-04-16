class CreatePlays < ActiveRecord::Migration[6.1]
  def change
    create_table :plays do |t|
      t.integer :play_number
      t.integer :game_id
      t.integer :away_score
      t.integer :home_score
      t.string :down
      t.string :quarter

      t.timestamps
    end
  end
end
