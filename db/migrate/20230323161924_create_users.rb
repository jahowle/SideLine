class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :wins
      t.integer :losses
      t.integer :balance



      t.timestamps
    end
  end
end
