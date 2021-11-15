run using nodemon app.js

base api call:
localhost:3000/api/mail

get all user inboxes:
/api/mail/inbox/all

get a user inbox:
/api/mail/inbox/NAME

inboxes are stored as JSON file of form -
from:
message:

send a message to user:
/api/mail/send/NAME

takes JSON file of form -
to:
from:
message:


