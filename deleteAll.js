const mongoose = require('mongoose');
require('./server');
const db = require('./models');

db.Nonogram.deleteMany({}, (err, deletedNonograms) => {
  if (err) return console.log(err);
  console.log(deletedNonograms);
})