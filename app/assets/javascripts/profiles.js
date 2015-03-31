var conversations = {

  loadConversation: function () {
    clearPage();
    matchId = $(this).data('match');
    var conversation_id = null;
    $.post('/conversations', {
      data: { match_id: matchId }
    }, function (response) {
      // debugger;
      conversation_id = response.id;
      $('<div>', { id: 'conversation' }).append($('<input>', { id: 'my-message' })).appendTo('#potential');
      $('#conversation').append('<p><button id="post-message" data-id="' + conversation_id + '" data-match="' + matchId + '">Send message</button></p>');
      $('#post-message').on('click', conversations.postMessage);
    });
  },

  postMessage: function () {
    var self = this;
    newMessage = $('#my-message').val();
    $.ajax({
      url: '/conversations/' + $(self).data('id'),
      type: 'PUT',
      data: { 
        match_id: $(self).data('match'),
        newMessage: newMessage 
      }
    });
  }
};

var listMatches = function () {
  clearPage();
  $.get('/matches', function(response) {
    var template_first_user = _.template("<div class='matched' data-match='<%= id %>'><p>I initiated this match with <%= match_name %>.</p></div>");
    var template_second_user = _.template("<div class='matched' data-match='<%= id %>'><p><%= match_name %> initiated this match with me.</p></div>");
    var current_user_id = response.current_user;
    var matches = JSON.parse(response.matches);
    
    _.each( matches, function (match) {
      var html;
      if ( current_user_id === match.initiator.id ) {
        html = template_first_user( { match_name: match.recipricator.name, id: match.id } );
      } else {
        html = template_second_user( { match_name: match.initiator.name, id: match.id } );
      }
      $("#potential").append(html);
    });

    $('.matched').on('click', conversations.loadConversation);
  });
};

var templates = {

    viewProfiles: function() {
       _.template("<div class='visible-profile' data-profile='<%= id %>'><p>The profile photo of User <%= user_id %> goes here.</p></div>");
      browseProfiles.loadProfiles();
    },

    viewSettings: function() {
      _.template("<div class='my-settings'></div>");
    },

    viewMatches: function() {
      // var template = _.template("<div class='matched' data-match='<%= id %>'><p>The profile photo of User <%= user_id %> goes here.</p></div>");
      listMatches();
    }
};

var browseProfiles = {

    acceptProfile: function(event) {
        clearPage();
        matchedUserID = $('#potential-details').data('potentialId');
        // debugger;
        $.post('/matches', {
            data: { user2_id: matchedUserID }
        });
        clearPage();
        browseProfiles.loadProfiles();
    },

    rejectProfile: function(event) {
        clearPage();
        browseProfiles.loadProfiles();
    },

    loadProfiles: function() {
        clearPage();
        $('.matched').empty();
        $.getJSON('/profiles', function(response) {
            var thumb = response[0].thumbnail;
            var potentialId = response[0].id;
            var potentialName = response[0].name;
        $('<div>', { id: 'potential' }).append($('<div>', {
            id: 'potential-details'
        })).appendTo('#container');

        $('#potential-details').data('potentialId', potentialId);
        $('#potential').append("<img src=" + thumb + ">");
        $('#potential-details').append("<p>" + potentialName + "</p>");
        $('#potential-details').append('<button id="accept">Accept</button>');
        $('#potential-details').append('<button id="reject">Reject</button>');
        $('#accept').on('click', browseProfiles.acceptProfile);
        $('#reject').on('click', browseProfiles.rejectProfile);
        });
    }
};

var clearPage = function() {
  $('#potential').empty();
  $('#potential-details').empty();
};

$(document).ready(function() {
  browseProfiles.loadProfiles();

  $("nav a").on("click", function(event) {
    var $currentEl = $(this);
    if ($currentEl.hasClass("sign-out")) {
        return false;
    }
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function(response) {
        // console.log(response);
        var template = null;
        switch ($currentEl.text()) {
            case "Browse":
                templates.viewProfiles();
                console.log("Browse clicked");
                break;
            case "Settings":
                templates.viewSettings();
                console.log("Settings clicked");
                break;
            case "Matches":
                templates.viewMatches();
                console.log("Matches clicked");
                break;
        }
      $("body").append(template);
    });
    return false;
  });
});


// var browse = load any random user profile (be sure to go through all profiles before randomly picking again)
//   check if browse == @current_user
//   also check if any matches have @current_user && browse as user1_id and user2_id
//   if either of the above are true, discard browse and loop back to beginning

// once a valid profile has been found,
// display the profile photo in '#potential'
// display potentialUser.name and potentialUser.location in '#potential-details'

// add event handler
//   on 'click' '#accept'
//     check if an instance of match exists with browse.id and potentialUser.id
//     if true
//       There is a match. Popup message "It's a match!"
//       move on to load next profile
//     else if false
//       Match.new
//       Populate all fields with relevant data
//     end

//   on 'click' '#reject'
//     load next profile
