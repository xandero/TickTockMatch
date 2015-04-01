module ApplicationHelper
  def nav_menu
    links = "<nav><li>#{ link_to('Home', root_path) }</li>"
    if @current_user.present?
      links += 
      "<li data-user-id='#{@current_user.id}'>#{ link_to('Browse', profiles_path(@current_user)) }</li>
      <li data-user-id='#{@current_user.id}'>#{ link_to('Settings', edit_user_path(@current_user)) }</li>
      <li data-user-id='#{@current_user.id}'>#{ link_to('Matches', matches_path(@current_user)) }</li>
      <li>#{ link_to('Sign Out', login_path, :method => :delete, :class => 'sign-out') }</li>"
    else
      links += "<li>#{ link_to('Sign up', new_user_path) }</li>
      <li>#{ link_to('Log in', login_path, :method => :get ) }</li></nav>"
    end
    links
  end
end
