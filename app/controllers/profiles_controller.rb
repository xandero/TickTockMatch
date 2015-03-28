class ProfilesController < ApplicationController

  def index
    locate

    #this is where we will find all user photos and allow to be swiped
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
