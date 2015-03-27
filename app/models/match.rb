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
end
