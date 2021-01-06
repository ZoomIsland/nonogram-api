const express = require('express');
const router = express.Router();
const db = require('../models/');

// Index route
router.get('/index/:filter/:id', (req, res) => {
  console.log(req.params)
  db.Nonogram.find({}).lean()
    .exec((err,foundNonograms) => {
      if (err) return console.log(err)
      const length = foundNonograms.length;
      const limit = 2;
      let filter;
      switch (req.params.filter) {
        case "newest":
          filter = {dateCreated: 'desc'};
          break;
        case "oldest":
          filter = {dateCreated: 'asc'};
          break;
        case "smallest":
          filter = {gridSize: 'asc'};
          break;
        case "biggest":
          filter = {gridSize: 'desc'};
          break;
        default: 
          filter = {};
      }
      console.log(filter)
      db.Nonogram.find({})
      .sort(filter)
      // .limit(limit)
      // .skip(req.params.id * limit)
      .exec((err, foundNonograms) => {
        if (err) return console.log(err)
        res.send({
          nonograms: foundNonograms,
          length: length
        });
      })
    })
  })

// Random route
router.get('/random/', (req, res) => {
  db.Nonogram.find({}, (err, foundNonograms) => {
    if (err) return console.log(err);
    let randomIndex = Math.floor(Math.random() * foundNonograms.length);
    res.send(foundNonograms[randomIndex]);
  })
})

// Show route
router.get('/:id/', (req, res) => {
  db.Nonogram.findById((req.params.id), (err, foundNonogram) => {
    if (err) return console.log(err);
    res.send(foundNonogram)
  });
});

// Create route
router.post('/', (req, res) => {
  console.log("post route")
  console.log(req.body);
  // does anything need to happen prior to post?
  db.Nonogram.create(req.body, (err, newNonogram) => {
    if (err) return console.log(err);
    console.log(newNonogram);
    res.send(newNonogram);
    // will likely want a redirect instead
    // back to home? Or to the page itself?
    // res.redirect('/:id/');
  })
})

// Update route (should only be for the user or admin)
router.put('/:id/', (req, res) => {
  console.log(req.body)
  db.Nonogram.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedNonogram) => {
      if (err) return console.log(err);
      res.send(updatedNonogram);
      // probably should redirect to the page itself
      // res.redirect('/:id/');
    }
  )
})

// Destroy route (only for Admin)
router.delete('/:id/', (req, res) => {
  db.Nonogram.findByIdAndDelete(req.params.id, (err, deletedNonogram) => {
    if (err) return console.log(err);
    res.send(deletedNonogram);
    // should likely redirect somewhere. Home?
    // res.redirect('/');
  })
})

module.exports = router;