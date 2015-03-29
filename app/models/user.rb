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
#  password_digest   :string
#  location          :string
#  age_min           :integer
#  age_max           :integer
#  distance_max      :integer
#  sexual_preference :string
#  age               :integer
#

class User < ActiveRecord::Base

  # attr_accessible :photo
  mount_uploader :photo, PhotoUploader

  has_many :matches
  has_many :conversations, through: :matches

  validates :name, :uniqueness => true, :presence => true
  validates :email, :presence => true, :uniqueness => true
  validates :password, :presence => true,
                       :confirmation => true,
                       :length => {:within => 6..30},
                       :on => :create
  has_secure_password

  def age
    (Date.today - dob).to_i / 365 unless dob.nil?
  end

end
