const express = require('express');
const router = express.Router();

const pageName = 'Home ';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: `${pageName}` , message: `${pageName}` });
});

module.exports = router;
