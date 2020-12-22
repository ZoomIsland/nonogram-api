const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 20
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8
  }
})

module.exports = mongoose.model('User', userSchema);