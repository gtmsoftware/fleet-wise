const express = require('express');
const router = express.Router();

const { getRokarList } = require('../dbservice/common/common_service');
const { getGadiList, getGadiByRokar, getGadiRokarList } = require('../dbservice/gadi_service');
const { getBuyerNameList } = require('../dbservice/buyer_service');
const { getSellerNameList } = require('../dbservice/seller_service');

const { saveUnLoading} = require('../dbservice/unloading_service');

const pageName = 'Unloading Entry Page (अनलोडिंग एंट्री पेज)';



const populateViewObject = async () => {

  const viewObject = {};

  viewObject.title = pageName;
  viewObject.message = pageName;

  const rokerList = await getRokarList();
  viewObject.rokerList = rokerList;

  const buyerNameList = await getBuyerNameList();
  viewObject.buyerNameList = buyerNameList;

  const sellerNameList = await getSellerNameList();
  viewObject.sellerNameList = sellerNameList;

  return viewObject;
}

/* GET UnLoading Entry Form */
router.get('/', async (req, res, next) => {

  const viewObject = await populateViewObject();

  res.locals.gadiList = await getGadiRokarList();

  viewObject.record = '';
  res.render('unloading', viewObject);

  return viewObject;
});


/* SAVE unloading Entry. */
router.post('/', async (req, res, next) => {
  
  const viewObject = await populateViewObject();


  
  console.log(`req==>${JSON.stringify(req.body)}`);

    const { unloadingDate, ponitSale, buyer, weight, rate, total, cr_dr, rokar, vehicleNumber  } = req.body;
    
    saveUnLoading(unloadingDate, ponitSale, buyer, weight, rate, total, cr_dr, vehicleNumber, rokar);

    viewObject.message = 'Unloading Entry Saved';

    res.locals.gadiList = await getGadiRokarList();

  res.render('unloading', viewObject);
});


module.exports = router;
