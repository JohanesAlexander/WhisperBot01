// ───── IMPORTS ─────
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

// ───── APP SETUP ─────
const app = express();
const PORT = process.env.PORT || 3000;
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
const MONGO_URL = process.env.MONGO_URL;

// ───── MONGODB CONNECTION ─────
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ───── BOOKING MODEL ─────
const bookingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  service: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// ───── MIDDLEWARE ─────
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ───── TEST ROUTE ─────
app.get('/', (req, res) => {
  res.send('Hello from WhisperBot!');
});

// ───── LINE WEBHOOK ─────
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  res.status(200).send('OK'); // Early response to LINE

  if (!events) return;

  events.forEach((event) => {
    const replyToken = event.replyToken;
    const userMessage = event.message?.text || '';
    const message = userMessage.toLowerCase();

    console.log('User said:', userMessage);

    let replyText = 'You said: ' + userMessage;

    if (message.includes('i need a boost of self-love')) {
      replyText = `🌿 Self-care time!\n\nRemember: You are important, and today you deserve kindness — from yourself! 💙\n\nWant a self-care idea? [✨ Yes please!]`;
    } else if (message.includes('let me whisper my secret thoughts')) {
      replyText = `📦 Whisper away...\nI'm all ears. 💬\nTell me anything — no judgment, no rush.\n\nWhenever you're ready, just type it out.`;
    } else if (message.includes('hit me with a funny joke')) {
      replyText = `😂 Here’s your dose of giggles!\n\nWhy don't skeletons fight each other?\nBecause they don't have the guts!\n\nWanna hear another one?\n[😂 Another one!] [🏠 Back to menu]`;
    } else if (message.includes('psst... i have a secret to tell')) {
      replyText = `🕊️ Your secret space is ready.\nYou can type anything you want to let go of.\n\nI won't remember it, but I'll listen. 💙\n\nGo ahead, I'm here.`;
    } else if (message.includes('show me how awesome i did this week')) {
      replyText = `📚 Another week completed! 🎉\nYou handled it — good days, hard days, everything.\n\nI'm proud of you. 💙\n\nWould you like to see your mood summary for this week?\n[✨ Yes, show me!] [❌ No, thanks]`;
    } else if (message.includes('hey! i need a little help here')) {
      replyText = `📖 Here's how you can use me!\n\n📝 Share your feelings\nType: "Whisper Box" or "I want to share my thoughts"\n\n✨ Get a positive reminder\nType: "Self Care" or "I need a boost of self-love"\n\n😂 Laugh with a joke\nType: "Random Joke" or "Hit me with a funny joke"\n\n🕊️ Send a secret safely\nType: "Secret Message" or "Psst... I have a secret to tell"\n\n📚 See your weekly progress\nType: "Week Recap" or "Show me my week recap"\n\n🏠 Feel lost? Just type "Menu" to start again!`;
    }

    // Kirim balasan ke LINE
    axios.post('https://api.line.me/v2/bot/message/reply', {
      replyToken: replyToken,
      messages: [{ type: 'text', text: replyText }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
      }
    }).catch(err => console.error('❌ LINE reply error:', err.message));
  });
});

// ───── BOOKING FORM ENDPOINT ─────
app.post('/api/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).send('✅ Booking saved');
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).send('❌ Failed to save booking');
  }
});

// ───── START SERVER ─────
app.listen(PORT, () => {
  console.log(`🚀 WhisperBot is running on port ${PORT}`);
});
