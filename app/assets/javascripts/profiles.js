
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

        loadProfiles: function() {

            $.getJSON('/profiles', function(response) {
             
                    var thumb = response[0].thumbnail;
                    var potentialId = response[0].id;
                    var potentialName = response[0].name;

                    $('<div>', {
                        id: 'potential'
                    }).append($('<div>', {
                        id: 'potential-details'
                    })).appendTo('#container');
                    
                    $('#potential').append("<img src=" + thumb + " id=" + potentialId + ">");
                    $('#potential-details').append("<p>" + potentialName + "</p>");
                    $('#potential-details').append('<button id="accept">Accept</button>');
                    $('#potential-details').append('<button id="reject">Reject</button>');
                    $('#accept').on('click', 'button', this.acceptProfile);
                    $('#reject').on('click', 'button', this.rejectProfile);
                },

                acceptProfile = function(event) {

                    $.post('/matches/create', {
                        data: {
                            user2_id: $('#potentialID').val(),
                            u2_question: u2_question.val()
                        }
                    });
                    $('potential').empty();
                    $('potential-details').empty();
                    loadProfile();
                },
                rejectProfile = function(event) {
                    $('potential').empty();
                    $('potential-details').empty();
                    loadProfiles();
                    // create instance of match and set reciprocal to false
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
        // debugger;
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
