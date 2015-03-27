class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.date :dob
      t.string :gender
      t.string :ip_address
      t.string :latitude
      t.string :longitude
      t.string :email
      t.text :photo
      t.text :thumbnail
      t.string :question
      t.integer :question_time
      t.string :oauth_token
      t.datetime :oauth_expires_at
      t.string :provider
      t.string :password_digest
      t.string :location
      t.string :uid
      t.integer :age_min
      t.integer :age_max
      t.integer :distance_max
      t.string :sexual_preference
    end
  end
end
