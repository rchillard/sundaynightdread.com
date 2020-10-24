// Description
// Make a call and play an inspirational MP3 from Arnold Schwarzenegger

exports.handler = function (context, event, callback) {
  const twilioClient = context.getTwilioClient();

  // Pass in From, To, and Url as query parameters
  // Example: https://x.x.x.x/<path>?From=%2b15108675310&To=%2b15108675310&Url=http%3A%2F%2Fdemo.twilio.com%2Fdocs%2Fvoice.xml
  // Note URL encoding above
  let from = event.From || context.PHONE_FROM;
  // If passing in To, make sure to validate, to avoid placing calls to unexpected locations
  let to = event.To || context.PHONE_TO;
  let url = event.Url || context.MP3_URL;

  twilioClient.calls
    .create({
      url: url,
      from: from,
      to: to,
    })
    .then((result) => {
      console.log('Call successfully placed');
      console.log(result.sid);
      return callback(null, 'success');
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
};
