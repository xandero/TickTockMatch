class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :match_id
      t.text :message_manifest
      t.date :message_date
    end
  end
end
