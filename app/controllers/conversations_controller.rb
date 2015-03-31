class ConversationsController < ApplicationController

  def new
  end

  def create
    if Conversation.where("match_id ?", params["data"]["match_id"] )
      render :json => { status: "This conversation has already been created." }
    else
      conversation = Conversation.new({ match_id: params["data"]["match_id"] })
      if conversation.save
        render :json => { status: "Conversation saved OK" }
      else 
        render :json => { status: "Conversation save error" }
      end
    end
  end

  def update
    conversation = Conversation.where("match_id ?", params["data"]["match_id"] )
    conversation.message_manifest += params["data"]["newMessage"]
    conversation.save
    binding.pry
  end
end
