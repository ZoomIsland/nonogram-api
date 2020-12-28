const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

// Controllers
const nonogramCtrl = require('./controllers/nonogramController');
const authCtrl = require('./controllers/authController');

// For Middleware
// Maybe Method Override?

// Route, URL info Middleware
// (for debugging)
app.use(function (req, res, next) {
  console.log("Request URL: ", req.originalUrl);
  console.log("Request Method: ", req.method);
  next();
})

// BodyParser
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
// DON'T FORGET TO UPDATE corsOptions with whitelist when launching
app.use(cors())


// Main route...
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Login/Register routes
app.use('/', authCtrl);

// Nonograms Routes
app.use('/nonogram', nonogramCtrl);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})