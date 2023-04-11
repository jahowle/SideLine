class AddGameKeyToGame < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :game_key, :integer
  end
end
