class ProfilesController < ApplicationController
respond_to :html, :js

  def index
    locate
    @profiles = User.all
    @user = User.find_by :id => session[:user_id] 
    render :json => @user
    render :json => @profiles
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
