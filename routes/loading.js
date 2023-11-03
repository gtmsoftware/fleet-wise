const express = require('express');
const router = express.Router();

const { getLoading, saveLoading} = require('../dbservice/loading_service');
const { newRokarNumber } = require('../dbservice/common/rokar_generator');
const { getGadiList } = require('../dbservice/common/common_service');

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

  const gadiList = await getGadiList();
  viewObject.gadiList = gadiList;
  
  res.render('loading',viewObject);
});


/* GET users listing. */
router.get('/:rokar', async function(req, res, next) {

  if(!req.params.rokar){
    const errorMsg = 'Request with valid Rokar number';
    viewObject.message = errorMsg;
    console.error('Error:', errorMsg);
    res.render('loading', viewObject);
  }

  const recordList = await getLoading(req.params.rokar);
  
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
