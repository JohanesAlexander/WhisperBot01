const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // <= Tambah axios buat kirim balasan

const app = express();
const PORT = process.env.PORT || 3000;

const CHANNEL_ACCESS_TOKEN = 'JM+7635bcgWRCjaTwo0yxayOHZWTfKrofygJN1czg+61D8iKT49/npXzMgsFt+38sPUakvy56kRvIsQON9QRYcYOgSn36PtcApeb+5K4HRZC9ehLFnej/s8UE8jgeuwF/niGzItNIbakwfoE+cBJtwdB04t89/1O/w1cDnyilFU='; // <= Ganti token kamu disini

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from WhisperBot!');
});

// Webhook dari LINE
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  
  if (events) {
    events.forEach(async (event) => {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      console.log('User said:', userMessage);

      // Kirim balasan
      await axios.post(
        'https://api.line.me/v2/bot/message/reply',
        {
          replyToken: replyToken,
          messages: [
            {
              type: 'text',
              text: `You said: ${userMessage}`
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
          }
        }
      );
    });
  }

  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
