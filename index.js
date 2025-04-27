const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route untuk pengecekan server
app.get('/', (req, res) => {
  res.send('Hello from WhisperBot!');
});

// **Route WAJIB ini untuk LINE Webhook**
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  
  if (events) {
    events.forEach(event => {
      console.log('User said:', event.message.text); // Untuk debug di console
    });
  }

  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
