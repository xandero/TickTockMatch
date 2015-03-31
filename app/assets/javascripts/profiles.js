
var templates = {

    browseProfiles: function() {
        return _.template("<div class='visible-profile' data-profile='<%= id %>'><p>The profile photo of User <%= user_id %> goes here.</p></div>");
    },

    viewSettings: function() {
        return _.template("<div class='matched we-initiated' data-match='<%= id %>'><p>The profile photo of User <%= user_id %> goes here.</p></div>");
    },

    viewMatches: function() {

    }
};

var browseProfiles = {

    acceptProfile: function(event) {
        matchedUserID = $('#potential-details').data('potentialId');
        // debugger;
        $.post('/matches', {
            data: { user2_id: matchedUserID }
        });
        $('#potential').empty();
        $('#potential-details').empty();
        browseProfiles.loadProfiles();
    },

    rejectProfile: function(event) {
        $('#potential').empty();
        $('#potential-details').empty();
        browseProfiles.loadProfiles();
        // create instance of match and set reciprocal to false
    },

    loadProfiles: function() {
        $('.matched').empty();
        $.getJSON('/profiles', function(response) {

            var thumb = response[0].thumbnail;
            var potentialId = response[0].id;
            var potentialName = response[0].name;

        $('<div>', { id: 'potential' }).append($('<div>', {
            id: 'potential-details'
        })).appendTo('#container');
        // debugger;  
        $('#potential-details').data('potentialId', potentialId);
        // debugger;
        $('#potential').append("<img src=" + thumb + ">");
        $('#potential-details').append("<p>" + potentialName + "</p>");
        $('#potential-details').append('<button id="accept">Accept</button>');
        $('#potential-details').append('<button id="reject">Reject</button>');
        $('#accept').on('click', browseProfiles.acceptProfile);
        $('#reject').on('click', browseProfiles.rejectProfile);

        });
    }
};

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
                console.log("Browse clicked");
                templates.browseProfiles();
                break;
            case "Settings":
                // template =
                console.log("Settings clicked");
                break;
            case "Matches":
                // template =
                console.log("Matches clicked");
                break;
        }
        $("body").append(template);

    });
});

$(document).ready(function() {
  browseProfiles.loadProfiles();

  var listMatches = function () {
    $('.matched').on('click', this.loadConversation);
    $.get('/matches', function(response) {
      // debugger;
      var template_first_user = _.template("<div class='matched we-initiated' data-match='<%= id %>'><p>I initiated this match with user <%= user_id %>.</p></div>");
      var template_second_user = _.template("<div class='matched' data-match='<%= id %>'><p>User <%= user_id %> initiated this match with me.</p></div>");
      var current_user_id = response.current_user;

      _.each( response.matches, function (match) {
        // console.log(match);
        var html;
        if ( current_user_id === match.user1_id ) {
          html = template_first_user( { user_id: match.user2_id, id: match.id } );
        } else {
          html = template_second_user( { user_id: match.user1_id, id: match.id } );
        }
        $("body").append(html);
      });
// var template = _.template("<b><%- value %></b>");
// template({value: '<script>'});
    });
  };
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
