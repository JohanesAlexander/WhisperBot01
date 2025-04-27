const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // <- Penting pakai process.env.PORT untuk Render!

app.use(bodyParser.json());

// Simple route untuk testing
app.get('/', (req, res) => {
  res.send('Hello from WhisperBot!');
});

// Webhook route untuk Line
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  
  if (events) {
    events.forEach(event => {
      console.log('User said:', event.message.text);
    });
  }

  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
