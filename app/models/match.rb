# == Schema Information
#
# Table name: matches
#
#  id           :integer          not null, primary key
#  user1_id     :integer
#  user2_id     :integer
#  u1_question  :string
#  u1_answer    :string
#  u2_question  :string
#  u2_answer    :string
#  u1_approval  :boolean
#  u2_approval  :boolean
#  reciprocated :boolean          default(FALSE)
#

class Match < ActiveRecord::Base

  belongs_to :conversation

  belongs_to :initiator, :foreign_key => :user1_id, class_name: 'User'
  belongs_to :recipricator, :foreign_key => :user2_id, class_name: 'User'

  validates_uniqueness_of :user1_id, :scope => :user2_id

  scope :involving, -> (user) do
    where("matches.user1_id = ? OR matches.user2_id = ?", user.id, user.id)    
  end

  scope :between, -> (user1_id, user2_id) do
    where("(matches.user1_id = ? AND matches.user2_id = ?) OR (matches.user1_id = ? AND matches.user2_id = ?)", user1_id, user2_id, user1_id, user2_id )
  end
end
