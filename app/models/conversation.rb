# == Schema Information
#
# Table name: conversations
#
#  id               :integer          not null, primary key
#  match_id         :integer
#  message_manifest :text
#  message_date     :date
#

class Conversation < ActiveRecord::Base
  belongs_to :match
  
end
