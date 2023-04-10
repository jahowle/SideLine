class Wager < ApplicationRecord
    belongs_to :game
    belongs_to :maker, foreign_key: :maker_id, class_name: "User"
    belongs_to :taker, foreign_key: :taker_id, class_name: "User", optional: true

    enum status: [:open, :taken, :in_progress, :expired, :finished]
end