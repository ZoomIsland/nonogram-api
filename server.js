const express = require('express');
const app = express();
const PORT = 3000;

// Controllers
const nonogramCtrl = require('./controllers/nonogramController');

// For Middleware
// BodyParser? Maybe Method Override?


// Main route... maybe returns a message?
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Nonograms Routes
app.use('/nonogram', nonogramCtrl);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})