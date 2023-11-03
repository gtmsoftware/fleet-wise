const express = require('express');
const router = express.Router();

const { getLoading, saveLoading} = require('../dbservice/loading_service');
const { newRokarNumber } = require('../dbservice/common/rokar_generator');

const pageName = 'Loading Entry Page (लोडिंग एंट्री पेज)';

const viewObject = { 
  title: `${pageName}`,
  message: `${pageName}`,
};



/* GET Loading Entry Form . */
router.get('/', async function(req, res, next) {

  const record = '';

  viewObject.record = record;

  viewObject.newroker = await newRokarNumber();
  
  res.render('loading',viewObject);
});


/* GET users listing. */
router.get('/:rokar', async function(req, res, next) {  
  
  console.log(`Getting Loading Entry Record Using Rokar : ${req.params.rokar}`);
  
  if(!req.params.rokar){
    const errorMsg = 'Request with valid Rokar number';
    console.error('Error:', errorMsg);
    viewObject.message = errorMsg;
    res.render('loading', viewObject);
  }

  const recordList = await getLoading(req.params.rokar);

  console.log(recordList[0]);

  viewObject.message = 'Record Found';
  viewObject.record = recordList[0].vehiclenumber;

  res.render('loading', viewObject);
});


/* SAVE loading Entry. */
router.post('/', function(req, res, next) {

    console.log(`req==>${JSON.stringify(req.body)}`);

    const { loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, rokar, vehicleNumber  } = req.body;
    
    saveLoading(loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, vehicleNumber, rokar);

    viewObject.message = 'Loading Entry Saved';

    res.render('loading', viewObject);
  });


module.exports = router;
