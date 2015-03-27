class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.integer :user1_id
      t.integer :user2_id
      t.string :u1_question
      t.string :u1_answer
      t.string :u2_question
      t.string :u2_answer
      t.boolean :u1_approval
      t.boolean :u2_approval
      t.boolean :reciprocated, :default => false
    end
  end
end
