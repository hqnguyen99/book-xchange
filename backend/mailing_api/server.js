const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

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

// send email outwards
const myEmail = 'donotreplybookxchange474@gmail.com'

var transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 587,
  auth: {
    user: myEmail,
    pass: '!@cmpt474'
  }
});

transporter.verify().then(console.log).catch(console.error);

app.post('/api/email', (req, res) => {


  // build mail
  var mailOptions = {
    from: '"Book Xchange" <donotreplybookxchange474@gmail.com>',
    to: req.body.email,
    subject: 'Message from BookXchange',
    text: req.body.message,
    html: "<p>" + req.body.message + "</p>",
  }

  transporter.sendMail(mailOptions).then(info => {
      console.log({info});
    }).catch(console.error);


  res.send('Email Sent to ' + req.body.email);

});



// local handling
app.post('/api/mail/send', (req, res) => {

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
