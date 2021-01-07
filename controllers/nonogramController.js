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
      const limit = 10;
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
      .limit(limit)
      .skip(req.params.id * limit)
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
  // remove any initial or ending rows that are all Xs
  let nonogram = [...req.body.nonogramArray];
  let nothingYet = true;
  let index = 0;
  // testing/splicing first rows
  for (let i = 0; i < nonogram.length; i++) {
    if (nothingYet) {
      index = i;
      for (let j = 0; j < nonogram[i].length; j++) {
        if (nonogram[i][j] !== "X") {
          nothingYet = false;
        }
      }
    }
  }
  nonogram = nonogram.splice(index, nonogram.length);
  // testing/splicing last rows
  nothingYet = true;
  for (let i = nonogram.length - 1; i > 0; i--) {
    if (nothingYet) {
      index = i;
      for (let j = 0; j < nonogram[i].length; j++) {
        if (nonogram[i][j] !== "X") {
          nothingYet = false;
        }
      }
    }
  }
  nonogram = nonogram.splice(0, index +1);

  // testing/splice first columns
  nothingYet = true;
  for (let i = 0; i < nonogram[0].length; i++) {
    if (nothingYet) {
      index = i;
      for (let j = 0; j < nonogram.length; j++) {
        if (nonogram[j][i] !== "X") {
          nothingYet = false;
        }
      }
    }
  }
  for (let i = 0; i < nonogram.length; i++) {
    nonogram[i] = nonogram[i].splice(index, nonogram[i].length);
  }

  // testing/splicing last columns
  nothingYet = true;
  for (let i = nonogram[0].length - 1; i > 0; i--) {
    if (nothingYet) {
      index = i;
      for (let j = 0; j < nonogram.length; j++) {
        if (nonogram[j][i] !== "X") {
          nothingYet = false;
        }
      }
    }
  }
  for (let i = 0; i < nonogram.length; i++) {
    nonogram[i] = nonogram[i].splice(0, index + 1);
  }

  //double check that all color indexes are in us
  console.log(nonogram)
  let nonoString = nonogram.flat().join("");
  let colors = [...req.body.colorArray];
  console.log(colors)
  for (let i = 0; i < colors.length; i++) {
    console.log(i)
    console.log(colors[i])
    if (nonoString.indexOf(i) === -1) {
      colors.splice(i, 1);
      i--;
      for (let j = 0; j < nonogram.length; j++) {
        for (let k = 0; k < nonogram[j].length; k++) {
          let currentValue = nonogram[j][k];
          if (currentValue > i) {
            nonogram[j][k] = currentValue - 1;
          }
        }
      }
      nonoString = nonogram.flat().join("")
    }
  }
  console.log(colors)
  console.log(nonogram)
  // if one isn't, 
    // remove from colors array
    // revise all numbers down by one (if greater than index)
  
  // update req.body
  let updatesToNonoObj = {};
  //update height
  updatesToNonoObj.height = nonogram.length;
  //update width
  updatesToNonoObj.width = nonogram[0].length;
  //update nonogram
  updatesToNonoObj.nonogramArray = nonogram;
  //update colors
  updatesToNonoObj.colorArray = colors;

  Object.assign(req.body, updatesToNonoObj);


  // res.send("okay!")
  
  
  //create object with updated req.body
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