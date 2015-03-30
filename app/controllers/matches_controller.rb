class MatchesController < ApplicationController

  def index
    find_matches
    load_questions
  end

  def load_conversation
    redirect_to conversation_path(conversation_id)
  end

  def edit

    match.u1_question_answer = params[:myAnswer]
    match.u2_question_answer = params[:initiator_answer]
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
