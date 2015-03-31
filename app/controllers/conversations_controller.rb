class ConversationsController < ApplicationController

  def index
    @user = User.find_by :id => session[:user_id]
    # find questions from each user then render as JSON and return.
    # Create and populate question divs on the page.
    # Create answer input box and $.post to update answer in model
  end

  def create

    if !Conversation.where(:match_id => params["data"]["match_id"] ).empty?
      conversation = Conversation.where(:match_id => params["data"]["match_id"] )[0]
      render :json => { status: "This conversation has already been created.", id: conversation.id, manifest: conversation.message_manifest }
    else
      conversation = Conversation.new({ match_id: params["data"]["match_id"] })
      if conversation.save
        render :json => { status: "Conversation saved OK", id: conversation.id }
      else 
        render :json => { status: "Conversation save error" }
      end

    end
  end

  def update
    @user = User.find_by :id => session[:user_id]
    name = @user.name
    conversation = Conversation.where(:match_id => params["match_id"] )
    conversation[0].message_manifest = conversation[0].message_manifest || ""
    str = name + ': ' + params["newMessage"]
    str += "<br />" 
    str += conversation[0].message_manifest
    conversation[0].update( :message_manifest => str ) 
    render :json => { status: "OK" }
  end
end
