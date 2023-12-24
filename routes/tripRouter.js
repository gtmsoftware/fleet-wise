const express = require('express');
const router = express.Router();

const {getGadiList} = require('../dbservice/gadi_service');
const {getDriverList} = require('../dbservice/driver_service');
const {saveVehicleTrip} = require('../dbservice/trip_service');

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

    console.log('inside the trip router');

    const veiwObject =  await populateStartPage();

     res.render('trip',veiwObject);
});


/* SAVE trip  Entry. */
router.post('/', async (req, res, next) => {

    console.log(`req==>${JSON.stringify(req.body)}`);

    const { roundTripDate, vehicleNumber, driver, tripStartAmt} = req.body;

    const rokar = 'RN12345';
    const createdBy = 'CreateUser';
 
    saveVehicleTrip(roundTripDate, vehicleNumber, driver, tripStartAmt, rokar, createdBy);

    const viewObject = await populateStartPage();
    
    viewObject.message = 'Trip Entry Saved';

    res.render('trip', viewObject);
  });



module.exports = router;