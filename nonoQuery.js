const mongoose = require('mongoose');
require('./server');
const db = require('./models');

db.Nonogram.find({}, (err, allNonograms) => {
  if (err) return console.log(err);
  console.log(allNonograms);
})