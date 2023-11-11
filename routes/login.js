const express = require('express');
const router = express.Router();

const { login } = require('../auth_service/auth_service');

const pageName = 'Login Page (लॉगिन पेज)';

const populateViewObject = async () => {

  const viewObject = {};

  viewObject.title = pageName;
  viewObject.message = pageName;

  return viewObject;
};

/* GET Login Form . */
router.get('/', async function(req, res, next) {

  const viewObject = await populateViewObject();
  
  res.render('login',viewObject);
});


/* GET users listing. */
router.get('/:username', async (req, res, next) => {
  res.render('login', viewObject);
});


/* SAVE loading Entry. */
router.post('/', async (req, res, next) => {

    console.log(`req==>${JSON.stringify(req.body)}`);

    const { loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, rokar, vehicleNumber  } = req.body;
    
    // saveLoading(loadingDate, ponitSale, buyer, weight, rate, total, cr_dr, vehicleNumber, rokar);

    const viewObject = await populateViewObject();
    
    viewObject.message = 'SingnUp Entry Saved';

    res.render('login', viewObject);
  });


module.exports = router;
