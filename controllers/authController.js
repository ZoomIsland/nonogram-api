const express = require('express');
const router = express.Router();
const db = require('../models/');
const bcrypt = require('bcryptjs');

// Login Post Route
router.post('/login', (req, res) => {
  if (req.body) {
    db.User.findOne({username: req.body.username}, (err, foundUser) => {
      if (err) return console.log(err);
      if (!foundUser) {
        return res.send('User not found!');
      }
      bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
        if (err) return console.log(err);
        if (isMatch) {
          const currentUser = {
            _id: foundUser._id,
            username: foundUser.username,
            isLoggedIn: true
          }
          req.session.currentUser = currentUser;
          res.send("logged in!")
          // probably want to redirect here
          // to home? to profile?
        } else {
          return res.send('Login details incorrect.')
        }
      })
    })
  }
});

// Register Create Route
router.post('/register', (req, res) => {
  if (req.body) {
    db.User.findOne({username: req.body.username}, (err, foundUser) => {
      if (err) return console.log(err);
      if (foundUser) return console.log('User already exists.');

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return console.log(err);

        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) return console.log(err);
          const { username, password } = req.body;
          const newUser = {
            username,
            password: hash
          };
          db.User.create(newUser, (err, createdUser) => {
            if (err) return console.log(err);
            res.send("registration successful!")
            // probably want to log them in and redirect
            // to home? to profile?
          })
        })
      })
    })
  }
})

module.exports = router;