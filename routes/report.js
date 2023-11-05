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


/* GET reports listing. */
router.get('/', function (req, res, next) {
  const viewObject = populateViewObject();
  res.render('report', viewObject);
});


/**
 * Return Report
 */
router.get('/:reportid', async (req, res, next) => {
  console.log(`${JSON.stringify(req.body)}`);

  const viewObject = populateViewObject();

  if (!req.params.reportid) {
    const errorMsg = 'Request with valid reportid';
    viewObject.message = errorMsg;
    console.error('Error:', errorMsg);
    res.render('report', viewObject);
  }

  //TODO Generate Report Data List and return
  const loadingReport = await getLoadingReport();
  //console.log(typeof(loadingReport));
  //console.log(loadingReport.length);
  //console.log(JSON.stringify(loadingReport));
  viewObject.reportData = JSON.stringify(loadingReport);
  res.render('report', viewObject);

});

module.exports = router;
