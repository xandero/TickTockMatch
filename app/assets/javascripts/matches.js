// sort divs according to last modified

$(document).ready(function() {

  var listMatches = function () {
    $('.matched').on('click', this.loadConversation);
    $.get('/matches', function(response) {
      // debugger;
      var template_first_user = _.template("<div class='matched we-initiated' data-match='<%= id %>'><p>We initiated with: <%= user_id %></p></div>");
      var template_second_user = _.template("<div class='matched' data-match='<%= id %>'><p>They (<%= user_id %>) initiated with us</p></div>");
      var current_user_id = response.current_user;

      _.each( response.matches, function (match) {
        // console.log(match);
        var html;
        if ( current_user_id === match.user1_id ) {
          html = template_first_user( { user_id: match.user2_id, id: match.id } );
        } else {
          html = template_second_user( { user_id: match.user1_id, id: match.id } )
        }
        $("body").append(html)
      });

// var template = _.template("<b><%- value %></b>");
// template({value: '<script>'});

    });
  };
  
  listMatches();
});


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


