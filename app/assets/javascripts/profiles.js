// var getStatus = function () {
//   var matchId = $(this).data('match');

// debugger;
//   return $.get('/matches/' + matchId + '/status', matchId).done(function (status) {
//     //window.status = status;
//   });
// }

// getStatus('foo').done(function (status) {
//   if (status.rejected) {
//     conversation.reviewAnswer();
//   }
// })

var conversations = {

  acceptAnswer: function (match) {

  },

  rejectAnswer: function (match) {
    debugger;
    $.post('/matches/approve_reject', {
      data: { match_id: match,
        questionStatus: rejected }
    })

  },

  reviewAnswer: function (match) {
    clearPage();
    var myQuestion = null;
    var theirAnswer = null; 
    conversations.approval = null;
    $.post('/matches/review', {
      data: { match_id: match }
    }, function (response) {
      myQuestion = response.myQuestion;
      theirAnswer = response.theirAnswer;
      el = $('#potential');
      el.append('<div id="my-question">My Question: ' + myQuestion + '</div><br />');
      el.append('<div id="their-answer">Their Answer: ' + theirAnswer + '</div><br />');
      el.append('<p><button class="button-primary" id="approve-answer" data-match="' + match + '">Approve Answer</button>');
      el.append('<p><button class="button-primary" id="reject-answer" data-match="' + match + '">Reject Answer</button>');
      $('#approve-answer').on('click', function() { conversations.acceptAnswer(match)} );
      $('#reject-answer').on('click', function() {conversations.rejectAnswer(match)} );
    });
  },

  loadConversation: function (event) {
    clearPage();

    // if conversation exists, render message manifest
    // if conversation does not exist, render reviewAnswer

    var matchId = $(event.currentTarget).data('match');

    // conversations.reviewAnswer(matchId);

    clearPage();

    var conversation_id = null;

    $.post('/conversations', {
      data: { match_id: matchId }
    }, function (response) {
      el = $('#potential');
      manifest = response.manifest;
      conversation_id = response.id;
      myQuestion = response.myQuestion;
      theirQuestion = response.theirQuestion;
      myAnswer = response.myAnswer;
      theirAnswer = response.theirAnswer;
      el.append('<div id="my-question">My Question: ' + myQuestion + '</div><br />');
      el.append('<div id="their-answer">Their Answer: ' + theirAnswer + '</div><br />');
      el.append('<div id="their-question">Their Question: ' + theirQuestion + '</div><br />');
      el.append('<div id="my-answer">My Answer: ' + myAnswer + '</div>');
      $('<div>', { id: 'conversation' }).append($('<input>', { id: 'my-message' })).appendTo('#potential');
      $('#conversation').append('<p><button class="button-primary" id="post-message" data-id="' + conversation_id + '" data-match="' + matchId + '">Send message</button><div id="past-messages"></div></p>');
      $('#past-messages').html(manifest);
      $('#post-message').on('click', conversations.postMessage);
    });
  },

  postMessage: function () {
    self = this;
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
    var template_first_user = _.template("<div class='matched' data-match='<%= id %>'>I initiated this match with <%= match_name %>.<br />");
    var template_second_user = _.template("<div class='matched' data-match='<%= id %>'><%= match_name %> initiated this match with me.<br />");
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

    },

    viewMatches: function() {
      listMatches();
    }
};

var browseProfiles = {

    acceptProfile: function(event) {
        clearPage();
        matchedUserID = $('#potential-details').data('potentialId');
        $.post('/matches', {
            data: { user2_id: matchedUserID }
        });
        clearPage();
        browseProfiles.loadProfiles();
    },

    rejectProfile: function(event) {
          browseProfiles.loadProfiles();  
    },

    loadProfiles: function() {
        clearPage();
        $('.matched').empty();
        $.getJSON('/profiles', function(response) {
            var thumb = response[0].thumbnail;
            var potentialId = response[0].id;
            var Name = response[0].name;
            var Age = response[0].age;
            var City = response[0].location;
        $('<div>', { id: 'potential' }).append($('<div>', {
            id: 'potential-details'
        })).appendTo('#container');

        $('#potential-details').data('potentialId', potentialId);
        $('#potential').append("<img src=" + thumb + ">");
        $('#potential-details').append(Name + ", " + Age + "<br />" + City + "<br />");
        $('#potential').append('<br /><button class="button-primary" id="accept">Accept</button>');
        $('#potential').append('<button class="button-primary" id="reject">Reject</button>');
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
        var template = null;
        switch ($currentEl.text()) {
            case "Browse Profiles":
                templates.viewProfiles();
                break;
            case "Settings":
                templates.viewSettings();
                break;
            case "My Matches":
                templates.viewMatches();
                break;
        }
      $("body").append(template);
    });
    return false;
  });
});

