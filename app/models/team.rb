class Team < ApplicationRecord
    has_many :wagers
    has_many :games
end