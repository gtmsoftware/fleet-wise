const express = require('express');
const router = express.Router();

const pageName = 'Home ';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: `${pageName}` , message: `${pageName}` });
});

/* GET home page. */
router.get('/health', (req, res) => {
  res.status(200).json('Everything is Good');
});

module.exports = router;
