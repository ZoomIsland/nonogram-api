const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/nonogram-api';

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