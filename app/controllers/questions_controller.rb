class QuestionsController < ApplicationController

  def index
    # @user = User.find_by :id => session[:user_id]
    # @match = Match.find params[:id] (need to pass data-ID from clicked div)
    
    # if @user == @match.user1_id
    #   @matchedUser = @match.user2_id
    # else
    #   @matchedUser = @match.user1_id
    # end

    # my_question = match.u1_question
    # their_question = match.u2_question
    # my_question_answer = match.u1_question_answer
    # their_question_answer = match.u2_question_answer
  end

  def update
    # receive accept or reject data from question.js
    # update match 
    # mutual_match
  end

  def mutual_match
    # when u1_approval == true && u2_approval == true
    #   redirect_to new_conversation_path
  end


end
