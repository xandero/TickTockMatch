create div '#potential' to display profile images
create thin div '#potential-details'
create two buttons, '#reject' '#accept'

var browse = load any random user profile
  check if browse == @current_user
  also check if any matches have @current_user && browse as user1_id and user2_id
  if either of the above are true, discard browse and loop back to beginning

once a valid profile has been found,
display the profile photo in '#potential'
display potentialUser.name and potentialUser.location in '#potential-details'

add event handler
  on 'click' '#accept'
    check if an instance of match exists with browse.id and potentialUser.id
    if true
      There is a match. Popup message "It's a match!"
      move on to load next profile
    else if false
      Match.new
      Populate all fields with relevant data
    end

  on 'click' '#reject'
    