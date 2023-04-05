class Wager < ApplicationRecord
    enum :league, [ :nfl, :nba ]
end