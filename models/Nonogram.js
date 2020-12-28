const mongoose = require('mongoose');

function nonogramLengthVal (val) {
  return val === this.length * this.width;
}

const NonogramSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "untitled"
  },
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
  nonogramString: {
    type: String,
    required: true,
    minLength: 25,
    maxLength: 625,
    match: [/^[0-7]+$/, 'Provided solution includes more than digits 0-7'],
  },
  colorArray: {
    type: [String],
    required: true,
  },
  // user id to be referenced, too. Putting it HERE (and not on array on the user)
  // because if a user deletes, I just want the ref gone, not the puzzle

  approved: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Nonogram', NonogramSchema);