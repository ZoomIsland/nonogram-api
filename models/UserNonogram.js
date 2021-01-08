const mongoose = require('mongoose');

const userNonogramSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  nonogram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nonogram'
  },
  solved: {
    type: Boolean
  },
  attemptArray: {
    type: [[]]
  }
})

module.exports = mongoose.model('UserNonogram', userNonogramSchema);