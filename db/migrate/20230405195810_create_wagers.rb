class CreateWagers < ActiveRecord::Migration[6.1]
  def change
    create_table :wagers do |t|
      t.integer :amount
      t.integer :maker
      t.integer :taker
      t.integer :winner
      t.integer :loser
      t.integer :league_id
      t.integer :game_id
      t.integer :team_id
      t.integer :player_id
      t.integer :stat_id
      t.integer :stat_value
      t.integer :operator
      


      t.timestamps
    end
  end
end
