const mongoose = require('mongoose');

function nonogramLengthVal (val) {
  return val === this.height * this.width;
}

const NonogramSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "untitled"
  },
  height: {
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
  // length === this.height * this.width.
  // Currently testing array of arrays instead (not sure about validation there...)
  // nonogramString: {
  //   type: String,
  //   required: true,
  //   minLength: 25,
  //   maxLength: 625,
  //   match: [/^[0-7X]+$/, 'Provided solution includes more than digits 0-7 or character X'],
  // },

  nonogramArray: {
    type: [[]],
    required: true,
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