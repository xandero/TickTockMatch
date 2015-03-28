create two buttons at the top of page "#my-question", "#their-question"

create a div #question, within which the question text will be placed.
create a div #answer, in which answers will be placed (if they exist)

create an event handler:
  
  on 'click' #my-question
  load the current user question into #question
    if the reciprocator has answered
      load reciprocator answer into #answer
    else
      display "they haven't answered yet!" in #answer
    end

  on 'click' #their-question
  load the reciprocator question in #their-question
  
  if the current user has not answered question
    create text input box in #answer
    create submit button
    create timer visualisation (or just digits counting down?)
    start timer - value to be set as (@otheruser.question_time) and count down

    once timer is finished, take value in #answer and update field in match model.
    If text field is empty, place "oops, looks like they didn't answer" in the match model.
  else
    display the current user answer, but do not allow to be edited
  end

