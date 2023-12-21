const express = require('express');
const router = express.Router();

const {getGadiList} = require('../dbservice/gadi_service');
const {getDriverList} = require('../dbservice/driver_service');

const pageName = 'Round Trip Start Page (राउंड ट्रिप एंट्री पेज)';

const populateStartPage = async() =>{
    
    const viewObject = {};

    viewObject.title = pageName;
    viewObject.message = pageName;
    
    const gadiList = await getGadiList();
    viewObject.gadiList = gadiList;

    const driverList = await getDriverList();
    viewObject.driverList = driverList;
    console.log(driverList)
     return viewObject;
 };


/* GET Start Form . */
router.get('/',async function(req,res,next){

    console.log('inside the start router');

    const veiwObject =  await populateStartPage();

     res.render('start',veiwObject);
});



module.exports = router;