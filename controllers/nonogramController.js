const express = require('express');
const router = express.Router();
const db = require('../models/');

// Index route
router.get('/', (req, res) => {
  db.Nonogram.find({}, (err, foundNonogram) => {
    if (err) return console.log(err);
    res.send(foundNonogram);
  })
})

// Show route
router.get('/:id', (req, res) => {
  db.Nonogram.findById((req.params.id), (err, foundNonogram) => {
    if (err) return console.log(err);
    res.send(foundNonogram)
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // does anything need to happen prior to post?
  // maybe add Approval === false?
  // though I'm hoping to make that default
  db.Nonogram.create(req.body, (err, newNonogram) => {
    if (err) return console.log(err);
    console.log(newNonogram);
    res.send(newNonogram);
    // will likely want a redirect instead
    // res.redirect('/');
  })
})

module.exports = router;