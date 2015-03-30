class ProfilesController < ApplicationController
respond_to :html, :js

  def index
    @user = User.find_by :id => session[:user_id]
    age_min = @user.age_min
    age_max = @user.age_max
    sexual_preference = @user.sexual_preference
    @potential_matches = User.all.where('age > ?', age_min).where('age < ?', age_max).where(:gender => sexual_preference )
  end

  def filter_profiles

  end

  def create
    @user = User.find_by :id => session[:user_id]
  end

  def show
    @user = User.find_by :id => session[:user_id] 
  end

  def locate
    @user = User.find_by :id => session[:user_id]    
    @ip_address = request.remote_ip
    @list = Geocoder.search @ip_address
    @city = @list.first.city
    @user.update(:latitude => @list[0].latitude, :longitude => @list[0].longitude, :location => @city)  
  end

end
