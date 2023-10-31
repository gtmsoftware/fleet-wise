const express = require('express');
const router = express.Router();

/* GET reports listing. */
router.get('/', function(req, res, next) {
  res.render('report', { title: 'Report Page', message: 'Welcome to Report Page' });
});


/* SAVE loading Entry. */
router.post('/', function(req, res, next) {
    console.log(`${JSON.stringify(req.body)}`);
    res.render('report', { title: 'Report Page', message: '' });
  });

module.exports = router;
