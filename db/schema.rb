# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150327012523) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conversations", force: :cascade do |t|
    t.integer "match_id"
    t.text    "message_manifest"
    t.date    "message_date"
  end

  create_table "matches", force: :cascade do |t|
    t.integer "user1_id"
    t.integer "user2_id"
    t.string  "u1_question"
    t.string  "u1_answer"
    t.string  "u2_question"
    t.string  "u2_answer"
    t.boolean "u1_approval"
    t.boolean "u2_approval"
    t.boolean "reciprocated", default: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.date     "dob"
    t.string   "gender"
    t.string   "ip_address"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "email"
    t.text     "photo"
    t.text     "thumbnail"
    t.string   "question"
    t.integer  "question_time"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "provider"
    t.string   "password_digest"
    t.string   "location"
    t.string   "uid"
    t.integer  "age_min"
    t.integer  "age_max"
    t.integer  "distance_max"
    t.string   "sexual_preference"
  end

end
