# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_04_07_164946) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.string "home_team"
    t.string "away_team"
    t.integer "quarter"
    t.integer "away_score"
    t.integer "home_score"
    t.boolean "has_started"
    t.boolean "is_in_progress"
    t.boolean "is_over"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.integer "wins"
    t.integer "losses"
    t.integer "balance"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
    t.string "provider"
  end

  create_table "wagers", force: :cascade do |t|
    t.integer "amount"
    t.integer "maker"
    t.integer "taker"
    t.integer "winner"
    t.integer "loser"
    t.integer "league_id"
    t.integer "game_id"
    t.integer "team_id"
    t.integer "player_id"
    t.integer "stat_id"
    t.integer "stat_value"
    t.integer "operator"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
