class ConversationsController < ApplicationController

  def new
  end

  def create
    # match = Match.where( :id => params["data"]["matchId"] )
    binding.pry
    conversation = Conversation.new({ match_id: params["data"]["match_id"] })

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
