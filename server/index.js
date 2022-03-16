require('dotenv').config();

const nodemailer = require('nodemailer');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

function validateToken(req, res, next) {
  const token = req.headers.authorization || req.body.token;

  console.log('checking token...', token);

  if (token && token === process.env.TOKEN) {
    console.log('token is valid. proceeding');
    next();
  } else {
    console.log('token is invalid. returning 401');
    res.status(401).json({ message: 'Unauthorized' });
  }
}

app.post('/send-mail', validateToken, (req, res) => {
  const { recipient, message } = req.body;

  console.log('req.body', req.body);

  if (!recipient || !message) {
    res.status(400).json({ message: 'Missing recipient or message' });
  }

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: recipient,
    subject: 'This is your automated email',
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(400).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent' });
    }
  });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
