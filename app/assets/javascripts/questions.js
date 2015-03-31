var viewQuestions = {

  getQuestions: function () {
    $.get('/questions', function(response) {
      
      $('#my-question').val(response.u1_question)
      $('#my-answer').val(response.u1_answer)
      $('#their-question').val(response.u2_question)
      $('#their-answer').val(response.u2_answer)
    })
  },
  acceptAnswer: function () {
    $.post('/questions/update', {
      data: {
      // 1/u2_approval: true
      }
    })
  },
  rejectAnswer: function () {
    $.post('/questions/update', {
      data: {
        // u1/u2_approval: false
      }
    })
  },
  updateMatch: function () {
    var myAnswer = $('#my-answer').val();
    $.post('matches/edit', {
      data: {
        // u1/u2_question_answer: myAnswer;
        // problem in determining whether the current user is user1 or user2
      }
    })
  }
};

$(document).ready(function () {
  $('#accept-answer').on('click', 'button', viewQuestions.acceptAnswer);
  $('#reject-answer').on('click', 'button', viewQuestions.rejectAnswer);
  $('#submit-answer').on('click', 'button', viewQuestions.updateMatch);
  viewQuestions.getQuestions();
});




// create an event handler:
  
//   on 'click' #my-question
//   load the current user question into #question

//     if the reciprocator has answered
      
//       load reciprocator answer into #answer
//       create 2 buttons '#accept-answer', '#reject-answer' 
      
//       create event handler:
//         on 'click' #accept-answer
//           set match.current_user.approval to true
//           if match.other_user.approval == true
//             popup - there is a match!! with continue button
//             conversation = Conversation.new date = current_timestamp
//           else if match.other_user.approval == nil
//             'we have not heard back from your match yet etc'
//           else
//             match.other_user.approval must be false 'sorry, looks like you did not match'
//           end
        
//         on 'click' #reject-answer
//           if match.reciprocated == nil
//             set match.reciprocated to false
//           else if match.reciprocated != nil
//             there is no match!
//             (does this handle all situations?)
//           end
//     else
//       display "they haven't answered yet!" in #answer
//     end

//   on 'click' #their-question
//   load the reciprocator question in #their-question
//   check if there is a value for the answer in the match model.
  
//   if the current user has not answered question (value in match model is nil)
//     create text input box in #answer
//     create submit button
//     create timer visualisation (or just digits counting down?)
//     start timer - value to be set as (@otheruser.question_time) and count down

//     once timer is finished, take value in #answer and update field in match model.
//     If text field is empty, place "oops, looks like they didn't answer" in the match model.
//   else
//     display the current user answer, but do not allow to be edited
//     change class, and hence colour, if the answer has been accepted/rejected.
//     if match.other_user.approval is true
//       change class to accepted (blue)
//     else if match.other_user.approval is false
//       change class to rejected (grey)
//     else match.other_user.approval must be nil
//       do not change class
//     end
//   end

//   on 'click' #back-to-matches
//     send user back to the matches.js page
