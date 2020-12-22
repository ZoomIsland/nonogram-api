const express = require('express');
const router = express.Router();
const db = require('../models/');

router.get('/', (req, res) => {
  res.send('This is the Nonogram route')
})

module.exports = router;