class Game < ApplicationRecord
    has_many :plays
    has_many :wagers
end