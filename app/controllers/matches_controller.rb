class MatchesController < ApplicationController

  def determine_user
    if @user == @match[0].user1_id
      @matchedUser = @match[0].user2_id
    else
      @matchedUser = @match[0].user1_id
    end
  end

  def index
    @user = User.find_by :id => session[:user_id]
    #@match = [] Create array of matches and then loop through to create divs and relevant IDs?
    @match = Match.all.where(:user1_id || :user2_id => @user)
   
    determine_user
  end

  def load_conversation
    # redirect_to conversation_path(conversation_id)
  end

  def edit
    # match.u1_question_answer = params[:myAnswer]
    # match.u2_question_answer = params[:initiator_answer]
  end

  def create
    determine_user
    @user = User.find_by :id => session[:user_id]
    match = Match.new 
    match.user1_id = @user.id
    match.user2_id = @matchedUser.id
    match.u1_question = @user.question
    match.u2_question = @matchedUser.question
    match.save
  end

  def locate_match
    match = Match.find params[:id]
  end

end
