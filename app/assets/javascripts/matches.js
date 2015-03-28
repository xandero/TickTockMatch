For each match do:
  create div across page with 'match-id' as the div ID
  (is it possible to sort these divs by descending order of @match.last_updated ?)

Create small div on LHS with thumbnail photo of the person matched with.
Display matches name at top of div.
if both questions have been answered 
   display the last message of the conversation within the div
  else 
    there are no messages, display "No messages...yet"
  end
else if one or more questions not answered
  if the viewer has not answered the question
    show "your question awaits!" (also if neither have answered)
  else
    the person matched has not answered, show "awaiting answer from your match"
  end 
end

Create event handler

On click of each div, 
  if both questions have been answered
    load the relevant conversation page.
  else
    load the questions page
  end






function addConversation () {
    var NewContent = '<div class="reply"><input name="name" type="text" id="name" size="20" value="" style="height:20px; margin-top:10px; width:480px;margin-left:90px; font-size:14px;" /></div>'
    $('.').on('click', function () {
        var $this = $(this);

        if ($reply.length) {
            $reply.toggle();
        } else {
            $(NewContent).insertAfter($this);
        }
    });
};