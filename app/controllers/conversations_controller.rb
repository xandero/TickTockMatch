class ConversationsController < ApplicationController

  def create
    @user = User.find_by :id => session[:user_id]    
    match = Match.find params["data"]["match_id"]

    if match.user1_id != @user.id
      theirQuestion, myQuestion = match.u2_question, match.u1_question
      theirAnswer, myAnswer = match.u1_answer, match.u2_answer
    else
      theirQuestion, myQuestion = match.u1_question, match.u2_question
      theirAnswer, myAnswer = match.u2_answer, match.u1_answer
    end

    if !Conversation.where(:match_id => params["data"]["match_id"] ).empty?
      conversation = Conversation.where(:match_id => params["data"]["match_id"] )[0]
      id = conversation.id
      manifest = conversation.message_manifest
      status = "This conversation has already been created"
    else
      conversation = Conversation.new({ match_id: params["data"]["match_id"] })
      if conversation.save
        status = "Conversation saved OK"
        id = conversation.id
      else 
        status = "Conversation save error"
      end
    end

    to_return = {}
    to_return['id'] = id if id
    to_return['manifest'] = manifest if manifest
    to_return['status'] = status if status
    to_return['myQuestion'] = myQuestion
    to_return['theirQuestion'] = theirQuestion
    to_return['myAnswer'] = myAnswer if myAnswer
    to_return['theirAnswer'] = theirAnswer if theirAnswer

    render :json => to_return
  end

  def update
    @user = User.find_by :id => session[:user_id]
    name = @user.name
    conversation = Conversation.where( match )
    conversation[0].message_manifest = conversation[0].message_manifest || ""
    str = name + ': ' + params["newMessage"]
    str += "<br />" 
    str += conversation[0].message_manifest
    conversation[0].update( :message_manifest => str ) 
    render :json => { status: "OK" }
  end
end
