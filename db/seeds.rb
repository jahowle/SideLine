# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'rest-client'

def sports_data_key
    ENV["SPORTSDATA_API_KEY"]
end

puts "🌱 Seeding spices..."

Wager.destroy_all
Game.destroy_all

def sports_dataset
    api_data = { key: sports_data_key}
    data = RestClient.get("https://api.sportsdata.io/v3/nfl/stats/json/SimulatedBoxScoresV3/0?key=#{api_data[:key]}")
    data_array = JSON.parse(data)[0]["Score"]

    Game.create(
        home_team: data_array["HomeTeam"],
        away_team: data_array["AwayTeam"],
        quarter: data_array["Quarter"].to_i,
        away_score: data_array["AwayScore"].to_i,
        home_score: data_array["HomeScore"].to_i,
        has_started: data_array["HasStarted"],
        is_in_progress: data_array["IsInProgress"],
        is_over: data_array["IsOver"]
    )

end

sports_dataset()




30.times do
    maker = User.pluck(:id).sample
    taker = User.pluck(:id).sample
    game = Game.all.sample


    
    Wager.create(
      amount: rand(500),
      maker_id: maker,
      taker_id: taker,
      game_id: game.id,
      pick: [game.away_team, game.home_team].sample,
      status: 0
    )
  end

puts "✅ Done seeding!"