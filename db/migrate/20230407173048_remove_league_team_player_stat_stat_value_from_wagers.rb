class RemoveLeagueTeamPlayerStatStatValueFromWagers < ActiveRecord::Migration[6.1]
  def change
    remove_column :wagers, :league_id
    remove_column :wagers, :team_id
    remove_column :wagers, :stat_id
    remove_column :wagers, :stat_value
    remove_column :wagers, :operator

  end
end
