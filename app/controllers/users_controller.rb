class UsersController < ApplicationController
    before_action :check_if_logged_in, :only => [:index]

  def index
    @users = User.all
    render :json => index
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
    @user = User.find_by :id => session[:user_id]
  end

  def edit
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

  private
  def user_params
    params.require(:user).permit(:name, :email, :dob, :gender, :password, :password_confirmation, :photo, :question, :question_time, :age_min, :age_max, :distance_max, :sexual_preference )
  end

  def check_if_logged_in
    redirect_to(root_path) unless @current_user.present?
  end

end
