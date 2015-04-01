class MatchesController < ApplicationController

  def determine_user( match )
    if @user == match.user1_id
      @matchedUser = match.user2_id
    else
      @matchedUser = match.user1_id
    end
  end

  def status
    binding.pry
  end

  def review
    @user = User.find_by :id => session[:user_id]
    match = Match.find params["data"]["match_id"]

    if match.user1_id != @user.id
      myQuestion = match.u2_question
      theirAnswer = match.u2_answer
    else
      myQuestion = match.u1_question
      theirAnswer = match.u1_answer
    end

    to_return = {}
    to_return['status'] = status if status
    to_return['myQuestion'] = myQuestion
    to_return['theirAnswer'] = theirAnswer if theirAnswer

    render :json => to_return
  end

  def index

    @user = User.find_by :id => session[:user_id]
    @matches = Match.where("user1_id = ? OR user2_id = ?", @user.id, @user.id)

    render :json => { matches: @matches.to_json(:include => [:initiator, :recipricator]), current_user: @user.id }
  end

  def new
    @match = Match.new 
  end

  def create
    @user = User.find_by :id => session[:user_id]
    matchedUser = User.where( :id => params["data"]["user2_id"])

    if Match.where("user1_id = ? AND user2_id = ?", @user.id, matchedUser.id) || Match.where("user2_id = ? AND user1_id = ?", @user.id, matchedUser.id)  
      return
    else
      match = Match.new({
        user2_id:  params["data"]["user2_id"],
        user1_id: @user.id,
        u1_question: @user.question,
        u2_question: matchedUser[0].question
      })
      if match.save
        render :json => { status: "200 OK" }
      else 
        render :json => { status: "ERROR!" }
      end
    end
  end

  def approve_reject

binding.pry

  end

  def update
  end

  def find_match
    @matchedUser = params["data"]["matched_user"]
    determine_user(@matchedUser)
    render :json => { matchedUserName: @matchedUser }
  end
end
