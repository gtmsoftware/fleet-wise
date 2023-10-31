const express = require('express');
const router = express.Router();

const pageName = 'Home ';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Profile Page' , message : 'No Profile yet' });
});

module.exports = router;
