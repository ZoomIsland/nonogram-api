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
    max: 40
  },
  width: {
    type: Number,
    required: true,
    min: 5,
    max: 40
  },
  gridSize: {
    type: Number,
    required: true,
    default: function() {
      return this.height * this.width
    }
  },
  nonogramArray: {
    type: [[]],
    required: true,
  },
  colorArray: {
    type: [String],
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
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