class AddPickAndStatusToWagers < ActiveRecord::Migration[6.1]
  def change
    add_column :wagers, :pick, :string
    add_column :wagers, :status, :integer
  end
end
