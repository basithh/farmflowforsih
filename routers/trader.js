const express = require("express");
const router = express.Router();


  const{
    sUpload
  }=require("../controllers/image");

  const {
    checkNotAuthenticated,
     getuserby,
     isStorage,
     checkAuthenticated,
    
   } = require("../controllers/user");
const { viewpreharvest, viewtrade, croptradeprocess, addtocart } = require("../controllers/trader");
const { json } = require("body-parser");

// router.get("/addtrader",checkAuthenticated,getuserby,addtraderget);
// router.post("/addtrader",checkAuthenticated,getuserby,sUpload,addtraderpost);
// router.get('/mytradingprofile',checkAuthenticated,getuserby,mytradingprofile);

router.get("/viewpreharvest",checkAuthenticated,getuserby,viewpreharvest);
router.get("/addtocart",checkAuthenticated,getuserby,addtocart);
router.post("/viewpreharvest/:cropid",checkAuthenticated,croptradeprocess);


module.exports = router;
