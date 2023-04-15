class User < ApplicationRecord
    has_secure_password
    has_many :wagers_taken, foreign_key: :taker_id, class_name: "Wager"
    has_many :wager_makers, through: :wagers_taken, source: :maker

    has_many :made_wagers, foreign_key: :maker_id, class_name: "Wager"
    has_many :wager_takers, through: :made_wagers, source: :taker

    validates :username, presence: true, uniqueness: true
end