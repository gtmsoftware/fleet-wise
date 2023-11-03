const express = require('express');
const router = express.Router();

const { getRokarList } = require('../dbservice/common/common_service');

const pageName = 'Unloading Entry Page (अनलोडिंग एंट्री पेज)';

const viewObject = { 
  title: `${pageName}`,
  message: `${pageName}`,
};

viewObject.rokerList = getRokarList();


/* GET users listing. */
router.get('/', function(req, res, next) {
  const record = '';
  viewObject.record = record;
  res.render('loading',viewObject);
});


/* SAVE loading Entry. */
router.post('/', function(req, res, next) {
    console.log(`${JSON.stringify(req.body)}`);
    res.render('unloading', { title: `${pageName}`, message: 'Unloading Entry Saved' });
  });
module.exports = router;
