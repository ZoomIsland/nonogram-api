const mongoose = require('mongoose');

function nonogramLengthVal (val) {
  return val === this.length * this.width;
}

const NonogramSchema = new mongoose.Schema({
  length: {
    type: Number,
    required: true,
    min: 5,
    max: 25
  },
  width: {
    type: Number,
    required: true,
    min: 5,
    max: 25
  },

  // add validation:
  // length === this.length * this.width.
  // values have RegEx of 0-7
  nonogramString: {
    type: String,
    required: true,
    min: 25,
    max: 625
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
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Nonogram', NonogramSchema);