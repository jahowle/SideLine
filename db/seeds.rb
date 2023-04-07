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
    maker_id = User.pluck(:id).sample
    taker_id = User.pluck(:id).sample
    winner_id = [maker_id, taker_id].sample

    if winner_id == maker_id
        loser_id = taker_id
    else
        loser_id = maker_id
    end
    
    Wager.create(
      amount: 500,
      maker: maker_id,
      taker: taker_id,
      winner: winner_id,
      loser: loser_id,
    )
  end

puts "✅ Done seeding!"