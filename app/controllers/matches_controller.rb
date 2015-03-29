class MatchesController < ApplicationController

  def determine_user
    find id of current_user
    need to figure out whether @current_user is user1 or user2 in each match

    find each match with @current_user in either user1 or user2 position
  end

  def create
    match = Match.new 
  end

end
