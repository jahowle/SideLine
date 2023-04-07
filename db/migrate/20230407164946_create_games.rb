class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :home_team
      t.string :away_team
      t.integer :quarter
      t.integer :away_score
      t.integer :home_score
      t.boolean :has_started
      t.boolean :is_in_progress
      t.boolean :is_over
      

      t.timestamps
    end
  end
end
