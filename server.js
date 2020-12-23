const express = require('express');
const app = express();
const PORT = 3000;

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
app.use(express.urlencoded({extended: false}));


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