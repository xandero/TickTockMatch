class ConversationsController < ApplicationController

  def new
  end

  def create
    # match = Match.where( :id => params["data"]["matchId"] )
    conversation = Conversation.new({ match_id: params["data"]["matchId"] })

    if conversation.save
      render :json => { status: "Conversation saved OK" }
    else 
      render :json => { status: "Conversation save error" }
    end
  end

  def update
   # this is where we take value from conversation.js and append to the message manifest
  end
end
