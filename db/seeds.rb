# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding spices..."

Wager.destroy_all


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