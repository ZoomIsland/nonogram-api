const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/test';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB connected successfuly'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  Nonogram: require('./Nonogram')
}