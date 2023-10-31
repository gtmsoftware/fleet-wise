const express = require('express');
const router = express.Router();

const pageName = 'Loading Entry Page';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loading', { title: `${pageName}`, message: `${pageName}` });
});


/* SAVE loading Entry. */
router.post('/', function(req, res, next) {

    console.log(`req==>`);

    console.log(`${JSON.stringify(req.body)}`);
    res.render('loading', { title: `${pageName}`, message: 'Loading Entry Saved' });
  });
module.exports = router;
