// Description
// Make a call and play an inspirational MP3 from Arnold Schwarzenegger

exports.handler = function (context, event, callback) {
  const twilioClient = context.getTwilioClient();

  // Pass in From, To, and Url as query parameters
  // Example: https://x.x.x.x/<path>?From=%2b15108675310&To=%2b15108675310&Url=http%3A%2F%2Fdemo.twilio.com%2Fdocs%2Fvoice.xml
  // Note URL encoding above
  // event.From is the phone number that sent a message to this function, since we are responding, we want to set to = event.From
  let to = event.From;
  // from is our registered Twilio phone number, which we have stored as an environment variable
  let from = context.PHONE_TWILIO;
  let url = event.Url || context.MP3_URL;

  if(event.Body.toLowerCase() == 'yes') {
    twilioClient.calls
    .create({
      url: url,
      from: from,
      to: to,
    })
    .then((result) => {
      console.log('Call successfully placed');
      console.log(result.sid);
      return callback(null, context.MSG_CONFIRM);
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
  } else {
    let body = context.MSG_REJECT;
    twilioClient.messages
    .create({
      body: body,
      to: to,
      from: from,
    })
    .then((message) => {
      console.log('SMS successfully sent');
      console.log(message.sid);
      return callback(null, context.MSG_REMINDER);
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
  }
};
