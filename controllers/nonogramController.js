const express = require('express');
const router = express.Router();
// may need this to be just models for Auth
const db = require('../models/Nonogram');

router.get('/', (req, res) => {
  res.send('This is the Nonogram route')
})

module.exports = router;