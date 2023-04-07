class ChangeMakersAndTakers < ActiveRecord::Migration[6.1]
  def change
    rename_column :wagers, :maker, :maker_id
    rename_column :wagers, :taker, :taker_id
  end
end
