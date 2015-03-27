module ApplicationHelper
  def nav_menu
    links = "<li>#{ link_to('Home', root_path) }</li>"
    if @current_user.present?
      links += "<li>Hi #{ @current_user.try(:name) }</li><li>#{ link_to('Update Profile', edit_user_path(@current_user.id)) }</li><li>#{ link_to('Sign Out ', login_path, :method => :delete) }</li>"
    else
      links += "<li>#{ link_to('Sign up', new_user_path) }</li><li>#{ link_to('Log in', login_path, :method => :get ) }</li>"
    end
    links
  end
end