const express = require('express');
const router = express.Router();

const { getLoadingReport } = require('../dbservice/loading_service');
const { getUnLoadingReport } = require('../dbservice/unloading_service');

const pageName = 'Report Page (रिपोर्ट  पेज)';

const populateViewObject = () => {
  const viewObject = {};
  viewObject.title = pageName;
  viewObject.message = pageName;
  return viewObject;
};


const getTotalCollection = (dataList) => {
  let sum = 0.0;
  for(let i = 0; i < dataList.length; i++) {
    sum = sum + dataList[i].total;
  }
  return sum;
};


/* GET reports listing. */
router.get('/', function (req, res, next) {
  const viewObject = populateViewObject();

  viewObject.nonce =  res.locals.nonce; // add CSP policy for this page

  viewObject.reportData = '';
  res.render('report', viewObject);
});


/**
 * Return Report
 */
router.get('/:reportid', async (req, res, next) => {
  console.log(`${JSON.stringify(req.body)}`);

  const viewObject = populateViewObject();

  viewObject.nonce =  res.locals.nonce; // add CSP policy for this page

  if (!req.params.reportid) {
    const errorMsg = 'Request with invalid reportid';
    viewObject.message = errorMsg;
    console.error('Error:', errorMsg);
    res.render('report', viewObject);
  }

  if (req.params.reportid === 'Loading_Reports') {

    viewObject.message = 'Loading Report (लोडिंग रिपोर्ट)';

    const dataList = await getLoadingReport();
    res.locals.totalCollection = getTotalCollection(dataList);
    res.locals.dataList = dataList;
    res.render('report_loading', viewObject);
  } else

    if (req.params.reportid === 'Unoading_Reports') {

      viewObject.message = 'Unloading Report (अनलोडिंग रिपोर्ट)';

      const dataList = await getUnLoadingReport();
      res.locals.totalCollection = getTotalCollection(dataList);
      res.locals.dataList = dataList;
      res.render('report_unloading', viewObject);
    }

    else {
      viewObject.message = "No Such Report Available";
      res.render('error_404', viewObject);
    }

});



//report_unloading

module.exports = router;
