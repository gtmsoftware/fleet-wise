const express = require('express');
const router = express.Router();

const { getLoading, saveLoading} = require('../dbservice/loading_service');
const { newRokarNumber } = require('../dbservice/common/rokar_generator');
const { getGadiList } = require('../dbservice/gadi_service');
const { getBuyerNameList } = require('../dbservice/buyer_service');
const { getSellerNameList } = require('../dbservice/seller_service');

const pageName = 'Loading Entry Page (लोडिंग एंट्री पेज)';

const populateViewObject = async () => {

  const viewObject = {};

  viewObject.title = pageName;
  viewObject.message = pageName;

  viewObject.newroker = await newRokarNumber();

  const gadiList = await getGadiList();
  viewObject.gadiList = gadiList;

  const buyerNameList = await getBuyerNameList();
  viewObject.buyerNameList = buyerNameList;

  const sellerNameList = await getSellerNameList();
  viewObject.sellerNameList = sellerNameList;

  return viewObject;
};

/* GET Loading Entry Form . */
router.get('/', async function(req, res, next) {

  const viewObject = await populateViewObject();
  
  const record = '';
  viewObject.record = record;
  
  res.render('loading',viewObject);
});


/* GET users listing. */
router.get('/:rokar', async (req, res, next) => {

  const viewObject = await populateViewObject();

  if(!req.params.rokar){
    const errorMsg = 'Request with valid Rokar number';
    viewObject.message = errorMsg;
    console.error('Error:', errorMsg);
    res.render('loading', viewObject);
  }

  const recordList = await getLoading(req.params.rokar);
  
  if(recordList && recordList.length > 0){
    viewObject.message = 'Record Found';
    viewObject.record = recordList[0].vehiclenumber;
  } 
  else {

    viewObject.message = 'Record Not Found';
    viewObject.record = 'Not Available';

  }
  

  res.render('loading', viewObject);
});


/* SAVE loading Entry. */
router.post('/', async (req, res, next) => {

    console.log(`req==>${JSON.stringify(req.body)}`);

    const { loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, rokar, vehicleNumber  } = req.body;
    
    saveLoading(loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, vehicleNumber, rokar);

    const viewObject = await populateViewObject();
    
    viewObject.message = 'Loading Entry Saved';

    res.render('loading', viewObject);
  });


module.exports = router;
