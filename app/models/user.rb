# == Schema Information
#
# Table name: users
#
#  id                :integer          not null, primary key
#  name              :string
#  dob               :date
#  gender            :string
#  ip_address        :string
#  latitude          :string
#  longitude         :string
#  email             :string
#  photo             :text
#  thumbnail         :text
#  question          :string
#  question_time     :integer
#  oauth_token       :string
#  oauth_expires_at  :datetime
#  provider          :string
#  password_digest   :string
#  location          :string
#  uid               :string
#  age_min           :integer
#  age_max           :integer
#  distance_max      :integer
#  sexual_preference :string
#

class User < ActiveRecord::Base
end
