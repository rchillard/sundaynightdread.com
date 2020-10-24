// Description
// Send an SMS inviting the user to opt-in to receiving an inspirational phone call

exports.handler = function (context, event, callback) {
  const twilioClient = context.getTwilioClient();

  // Pass in From, To, and Body as query parameters
  // Example: https://x.x.x.x/<path>?From=%2b15095550100&To=%2b15105550100&Body=Hello%20World
  // Note URL encoding above
  let from = event.From || context.PHONE_FROM;
  // If passing in To, make sure to validate, to avoid sending SMS to unexpected locations
  // Need to add validation of TO phone number here
  let to = event.To || context.PHONE_TO;
  let body = event.Body || context.MSG_OPTIN;

  twilioClient.messages
    .create({
      body: body,
      to: to,
      from: from,
    })
    .then((message) => {
      console.log('SMS successfully sent');
      console.log(message.sid);
      return callback(null, 'success');
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
};
