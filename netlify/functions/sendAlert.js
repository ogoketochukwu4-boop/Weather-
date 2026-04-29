exports.handler = async (event) => {
  const { phone, city, weather } = JSON.parse(event.body);

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  const message = `⛈️ Weather Alert for ${city}: ${weather}. Stay safe!`;

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `To=${encodeURIComponent(phone)}&From=${encodeURIComponent(from)}&Body=${encodeURIComponent(message)}`
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
