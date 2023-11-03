const express = require('express');
const router = express.Router();

const { getRokarList, getGadiList } = require('../dbservice/common/common_service');

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


/* SAVE loading Entry. */
router.post('/', async function (req, res, next) {
  const rokerList = await getRokarList();
  viewObject.rokerList = rokerList;

  console.log(`${JSON.stringify(req.body)}`);
  res.render('unloading', { title: `${pageName}`, message: 'Unloading Entry Saved' });
});


module.exports = router;
