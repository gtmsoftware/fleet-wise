const express = require('express');
const router = express.Router();

const loading_service = require('../dbservice/loading_service');

const pageName = 'Loading Entry Page';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loading', { title: `${pageName}`, message: `${pageName}` });
});


/* SAVE loading Entry. */
router.post('/', function(req, res, next) {

    console.log(`req==>${JSON.stringify(req.body)}`);
    
    const vehicaleNum = 'UP77 N 1234';
    const rokar = '2023/NOV/028';

    const { loadingDate, ponitSale, buyer, weight, rate, total, cr_dr } = req.body;
    
    loading_service.saveLoading(loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, vehicaleNum, rokar);

    res.render('loading', { title: `${pageName}`, message: 'Loading Entry Saved' });
  });
module.exports = router;
