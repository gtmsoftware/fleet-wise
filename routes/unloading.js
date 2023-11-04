const express = require('express');
const router = express.Router();

const { getRokarList } = require('../dbservice/common/common_service');
const { getGadiList } = require('../dbservice/gadi_service');
const { getUnLoading, saveUnLoading} = require('../dbservice/unloading_service');

const pageName = 'Unloading Entry Page (अनलोडिंग एंट्री पेज)';

const viewObject = {
  title: `${pageName}`,
  message: `${pageName}`,
};

/* GET users listing. */
router.get('/', async function (req, res, next) {

  const rokerList = await getRokarList();
  viewObject.rokerList = rokerList;

  const gadiList = await getGadiList();
  viewObject.gadiList = gadiList;

  const record = '';
  viewObject.record = record;
  res.render('unloading', viewObject);
});


/* SAVE unloading Entry. */
router.post('/', async function (req, res, next) {
  
  const rokerList = await getRokarList();
  viewObject.rokerList = rokerList;

  const gadiList = await getGadiList();
  viewObject.gadiList = gadiList;

  console.log(`req==>${JSON.stringify(req.body)}`);

    const { unloadingDate, ponitSale, buyer, weight, rate, total, cr_dr, rokar, vehicleNumber  } = req.body;
    
    saveLoading(unloadingDate, ponitSale, buyer, weight, rate, total, cr_dr, vehicleNumber, rokar);

    viewObject.message = 'Unloading Entry Saved';

  res.render('unloading', viewObject);
});


module.exports = router;
