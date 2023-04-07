class RemovePlayerFromWagers < ActiveRecord::Migration[6.1]
  def change
    remove_column :wagers, :player_id
  end
end
