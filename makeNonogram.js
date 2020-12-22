const mongoose = require('mongoose');
require('./server');
const db = require('./models');

db.Nonogram.create({
  length: 2,
  width: 2,
  nonogramString: '0100',
  colorArray: ["#067D6B", "#AE3465"],
  approved: false

}, (err, nonogram) => {
  if (err) {
    console.log(err);
  } else {
    console.log(nonogram);
  }
})