create three buttons at the top of page "#my-question", "#their-question", "#back-to-matches"

create a div #question, within which the question text will be placed.
create a div #answer, in which answers will be placed (if they exist)

create an event handler:
  
  on 'click' #my-question
  load the current user question into #question
    if the reciprocator has answered
      load reciprocator answer into #answer
      create 2 buttons '#accept-answer', '#reject-answer' 
      create event handler:
        on 'click' #accept-answer
          if match.reciprocated == true 
            there is a match!!!
          else if match.reciprocated == nil
            set match.reciprocated to true
          else
            match.reciprocated must be false, so inform user that match has been rejected.
          end
        
        on 'click' #reject-answer
          if match.reciprocated == nil
            set match.reciprocated to false
          else if match.reciprocated != nil
            there is no match!
          (does this handle all situations?)

    else
      display "they haven't answered yet!" in #answer
    end

  on 'click' #their-question
  load the reciprocator question in #their-question
  check if there is a value for the answer in the match model.
  
  if the current user has not answered question (value in match model is nil)
    create text input box in #answer
    create submit button
    create timer visualisation (or just digits counting down?)
    start timer - value to be set as (@otheruser.question_time) and count down

    once timer is finished, take value in #answer and update field in match model.
    If text field is empty, place "oops, looks like they didn't answer" in the match model.
  else
    display the current user answer, but do not allow to be edited
  end

  on 'click' #back-to-matches
    send user back to the matches.js page