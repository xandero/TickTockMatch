
class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  before_action :authenticate

  private
  def authenticate
    if session[:user_id].present?
      @current_user = User.find_by :id =>session[:user_id]
    end
    session[:user_id] = nil unless @current_user.present?
  end
end
