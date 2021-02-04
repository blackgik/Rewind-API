const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('https://rewind.netlify.app/');
});

module.exports = router;