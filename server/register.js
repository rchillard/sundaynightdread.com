// Environment variables
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromPhone = process.env.TWILIO_FROM_PHONE_NUMBER
const toPhone = process.env.MY_TO_PHONE_NUMBER

// Create Twilio client to talk to API
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: fromPhone,
     to: toPhone
   })
  .then(message => console.log(message.sid));