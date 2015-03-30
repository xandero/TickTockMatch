$(document).ready(function() {

  var currentUser = $.get('/users/show');

  var browseProfiles = {
    loadProfile: function() {
      $('#accept').on('click', 'button', this.acceptProfile);
      $('#reject').on('click', 'button', this.rejectProfile);
      $.get('/profiles/index', function(response) {
        browseProfiles.loadProfile = response;
      });
    },
    showProfile: function() {
      $('#potential').html(response.photo);
      $('#potential-details').html(response.name, response.age);
      },
    };

    var acceptProfile = function (event) {

      $.post('/matches/create', {
        data: {
          user2_id: $('#potentialID').val(),
          u2_question: u2_question.val()
        }
      });
      $('potential').empty();
      $('potential-details').empty();
      loadProfile();
    };
      });

    var rejectProfile = function (event) {
      $('potential').empty();
      $('potential-details').empty();
      loadProfile();
      // create instance of match and set reciprocal to false
    };
 
  browseProfiles.loadProfile();
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
