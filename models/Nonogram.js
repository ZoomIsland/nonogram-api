const mongoose = require('mongoose');

const NonogramSchema = new mongoose.Schema({
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  // can I introduce logic here that forces the string to be length * width in length?
  nonogramString: {
    type: String,
    required: true,
  },
  colorArray: {
    type: Array,
    required: true,
  },
  // user id to be referenced, too. Putting it HERE (and not on array on the user)
  // because if a user deletes, I just want the ref gone, not the puzzle

  // can this default to False?
  approved: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Nonogram', NonogramSchema);