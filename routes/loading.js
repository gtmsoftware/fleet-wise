const express = require('express');
const router = express.Router();

const loading_service = require('../dbservice/loading_service');

const pageName = 'Loading Entry Page';

/* GET users listing. */
router.get('/', function(req, res, next) {
  const rokar = '2023/NOV/028';
  const record = '';

  // const viewData = {rokar : `${[loading_service.getRokarList()]}`};

  res.render('loading', { title: `${pageName}`, message: `${pageName}`, record: `${record}` , viewData: ['2023/NOV/028', '2023/NOV/029', '2023/NOV/030', '2023/NOV/031', '2023/NOV/032', '2023/NOV/033','2023/NOV/034'] });
});


/* GET users listing. */
router.get('/:rokar', async function(req, res, next) {  
  
  console.log(`Getting Loading Entry Record Using Rokar : ${req.params.rokar}`);
  //const rokar = '2023-NOV-028';
  if(!req.params.rokar){
    const errorMsg = 'Request with valid Rokar number';
    console.error('Error:', errorMsg);
    res.render('loading', { title: `${pageName}`, message: `${errorMsg}`, record: `{}` });
  }

  const recordList = await loading_service.getLoading(req.params.rokar);

  console.log(recordList[0]);

  res.render('loading', { title: `${pageName}`, message: `${pageName}`, record: `${recordList[0].vehiclenumber}` });
});


/* SAVE loading Entry. */
router.post('/', function(req, res, next) {

    console.log(`req==>${JSON.stringify(req.body)}`);
    
    const vehicaleNum = 'UP77 N 1234';
    const rokar = '2023-NOV-028';

    const { loadingDate, ponitSale, buyer, weight, rate, total, cr_dr } = req.body;
    
    loading_service.saveLoading(loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, vehicaleNum, rokar);

    res.render('loading', { title: `${pageName}`, message: 'Loading Entry Saved', record: '' });
  });


module.exports = router;
