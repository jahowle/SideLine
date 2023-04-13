class Wager < ApplicationRecord
    belongs_to :game
    belongs_to :maker, foreign_key: :maker_id, class_name: "User"
    belongs_to :taker, foreign_key: :taker_id, class_name: "User", optional: true

    enum status: [:open, :taken, :in_progress, :expired, :finished]

    validate :check_maker_balance, on: :create
    # validate :check_taker_balance
    validate :cant_take_own_wager, on: :update

    def check_maker_balance
        if self.amount > self.maker.balance
            self.errors.add(:amount, "You don't have enough money to make this wager")
        end
    end

    def check_taker_balance
        if self.amount > self.taker.balance
            self.errors.add(:amount, "You don't have enough money to take this wager")
        end
    end


    def cant_take_own_wager
        if self.maker_id == self.taker_id
            self.errors.add(:taker_id, "You can't take your own wager")
        end
    end

end