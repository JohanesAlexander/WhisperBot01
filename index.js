<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Untuk parsing JSON
app.use(bodyParser.json());

// Route Webhook
app.post('/webhook', (req, res) => {
    const events = req.body.events;
    
    events.forEach((event) => {
        if (event.type === 'message' && event.message.type === 'text') {
            console.log('User said:', event.message.text);
            // DI SINI kamu bisa buat balasan
        }
    });

    res.status(200).send('OK');
});

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Hello World! Line Bot Webhook is working.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
=======
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Untuk parsing JSON
app.use(bodyParser.json());

// Route Webhook
app.post('/webhook', (req, res) => {
    const events = req.body.events;
    
    events.forEach((event) => {
        if (event.type === 'message' && event.message.type === 'text') {
            console.log('User said:', event.message.text);
            // DI SINI kamu bisa buat balasan
        }
    });

    res.status(200).send('OK');
});

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Hello World! Line Bot Webhook is working.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
>>>>>>> 805ebfac4142904b8efbb409561b7223758a2f9f
