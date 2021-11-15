const Joi = require('joi');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())

// "Database"

const mail_list1 = [
  { from: '', message: 'Markus\' first mail'},
  { from: 'Raul', message: 'another sample!'},

];

const mail_list2 = [
  { from: '', message: 'Clara\'s first mail' },
  { from: 'Josie', message: 'just another sample'},
]

const user_inboxes = [
  { name: 'Markus', inbox: mail_list1}, 
  { name: 'Clara', inbox: mail_list2}
]

// ===================
// ======= GET =======
// ===================

app.get('/', (req, res) => {
  res.send('Home Page');
});

// -- Get all user inboxes --
app.get('/api/mail/inbox/all', (req, res) => {
  
  res.send(user_inboxes)
})

// -- Get inbox of user --
app.get('/api/mail/inbox/:name', (req, res) => {
  
  res.send((user_inboxes.find(n => n.name === req.params.name)).inbox)
})

// ====================
// ======= POST =======
// ====================

app.post('/api/mail/send', (req, res) => {

  // -- Validation --
  /*
  const schema = {
    to: Joi.string().required(),
    from: Joi.string().required(),
    message: Joi.string().required()
  };

  const result = Joi.valid(req.body, schema);

  // send error
  if(result.error) {
    // 400 Bad Request
    res.status(400) ; //.send(result.error);
    return;
  }*/

  // -- Handle Req --
  // -  build mail from body
  const temp_mail = {
    from: req.body.from,
    message: req.body.message
  };

  // -  send to proper inbox using req.body.to
  user_inboxes.find(n => n.name === req.body.to).inbox.push(temp_mail)

  // -- Res --
  // -  mail_list.push(temp_mail);
  res.send(temp_mail);
});

// ======= PORT =======
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));