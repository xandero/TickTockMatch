class UsersController < ApplicationController
    before_action :check_if_logged_in, :only => [:index]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.create user_params
    if @user.save
      # logs user in automatically upon signup
      session[:user_id] = @user.id
      redirect_to settings_user_path(@user)
    else
      render :new
    end
  end

  def show
    @user = User.find params[:id]   
  end

  def settings
    @user = User.find params[:id]
  end

  def update
    user = User.find params[:id]
    user.update user_params
    redirect_to user_path
  end

  def destroy
    user = User.find params[:id]
    user.destroy
    redirect_to users_path
  end

  def locate
    @user = User.find_by :id => session[:user_id]    
    @ip_address = request.remote_ip
    @list = Geocoder.search @ip_address
    @city = @list.first.city
    @user.update(:lat => @list[0].latitude, :long => @list[0].longitude, :location => @city)  
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :dob, :gender, :password, :password_confirmation)
  end

  def check_if_logged_in
    redirect_to(root_path) unless @current_user.present?
  end

end
