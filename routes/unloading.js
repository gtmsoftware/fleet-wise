const express = require('express');
const router = express.Router();

const pageName = 'Unloading Entry Page';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('unloading', { title: `${pageName}`, message: `${pageName}` });
});


/* SAVE loading Entry. */
router.post('/', function(req, res, next) {
    console.log(`${JSON.stringify(req.body)}`);
    res.render('unloading', { title: `${pageName}`, message: 'Unloading Entry Saved' });
  });
module.exports = router;
