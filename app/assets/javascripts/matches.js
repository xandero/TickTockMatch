// For each match do:
//   create div across page with 'match-id' as the div ID or a data field?
//   (is it possible to sort these divs by descending order of @match.last_updated ?)

// Determine whether @current_user id user1 or user2 in the match model.
//   then set var thisUser = user1_id/user2_id
//   also set var matchedUser = user1_id/user2_id

// Create small div on LHS with thumbnail photo of the matchedUser.
// Display matchedUser name at top of div.
// if both questions have been answered 
//    display the last message of the conversation within the div
//   else 
//     there are no messages, display "No messages...yet"
//   end
// else if one or more questions not answered
//   if thisUser has not answered the question
//     show "your question awaits!" (also show this message if neither have answered)
//   else
//     the matchedUser has not answered, show "awaiting answer from your match"
//   end 
// end

// Create event handler

// On 'click' of each match div, 
//   if conversation with match_id (for this div, which will be either its ID or in its data field) exists
//     load conversation.js
//   else
//     load questions.js
//   end


