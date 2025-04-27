const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const CHANNEL_ACCESS_TOKEN = 'PASTE-TOKEN-KAMU-DISINI'; // <<< Ganti ini dengan token asli

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from WhisperBot!');
});

app.post('/webhook', (req, res) => {
  const events = req.body.events;

  if (events) {
    events.forEach(async (event) => {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      console.log('User said:', userMessage);

      let replyText = '';

      // === Logika berdasarkan keyword ===
      if (!userMessage) {
        replyText = "Sorry, I didn't catch that.";
      } else if (userMessage.toLowerCase().includes('i need a boost of self-love')) {
        replyText = `🌿 Self-care time!\n\nRemember: You are important, and today you deserve kindness — from yourself! 💙\n\nWant a self-care idea? [✨ Yes please!]`;
      } else if (userMessage.toLowerCase().includes('let me whisper my secret thoughts')) {
        replyText = `📦 Whisper away...\nI'm all ears. 💬\nTell me anything — no judgment, no rush.\n\nWhenever you're ready, just type it out.`;
      } else if (userMessage.toLowerCase().includes('hit me with a funny joke')) {
        replyText = `😂 Here’s your dose of giggles!\n\nWhy don't skeletons fight each other?\nBecause they don't have the guts!\n\nWanna hear another one?\n[😂 Another one!] [🏠 Back to menu]`;
      } else if (userMessage.toLowerCase().includes('psst... i have a secret to tell')) {
        replyText = `🕊️ Your secret space is ready.\nYou can type anything you want to let go of.\n\nI won't remember it, but I'll listen. 💙\n\nGo ahead, I'm here.`;
      } else if (userMessage.toLowerCase().includes('show me how awesome i did this week')) {
        replyText = `📚 Another week completed! 🎉\nYou handled it — good days, hard days, everything.\n\nI'm proud of you. 💙\n\nWould you like to see your mood summary for this week?\n[✨ Yes, show me!] [❌ No, thanks]`;
      } else if (userMessage.toLowerCase().includes('hey! i need a little help here')) {
        // Kalau mau personalize dengan nama user, perlu dapet profile (nanti bisa tambah)
        replyText = `📖 Here's how you can use me!\n\n📝 Share your feelings\nType: "Whisper Box" or "I want to share my thoughts"\n\n✨ Get a positive reminder\nType: "Self Care" or "I need a boost of self-love"\n\n😂 Laugh with a joke\nType: "Random Joke" or "Hit me with a funny joke"\n\n🕊️ Send a secret safely\nType: "Secret Message" or "Psst... I have a secret to tell"\n\n📚 See your weekly progress\nType: "Week Recap" or "Show me my week recap"\n\n🏠 Feel lost? Just type "Menu" to start again!`;
      } else {
        // Default: echo message biasa
        replyText = `You said: ${userMessage}`;
      }
      // === End logic ===

      // Kirim balasan ke user
      await axios.post(
        'https://api.line.me/v2/bot/message/reply',
        {
          replyToken: replyToken,
          messages: [
            {
              type: 'text',
              text: replyText
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
