class ProfilesController < ApplicationController
respond_to :html, :js

  def index
    locate
    @user = User.find_by :id => session[:user_id]
  end

  def filter_profiles
    @user = User.find_by :id => session[:user_id]
    age_min = @user.age_min
    age_max = @user.age_max
    sexual_preference = @user.sexual_preference

    User.where(:gender => 'Male').where("age_min >= ?", age_min).where("age_max <= ?", age_max)
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
