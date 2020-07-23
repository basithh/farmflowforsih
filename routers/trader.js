const express = require("express");
const router = express.Router();

const {
    addtraderget,
    addtraderpost,
    mytradingprofile,
    getbytraderid,
    
  
  } = require("../controllers/storage");

  const{
    sUpload
  }=require("../controllers/image");










  router.get("/addtrader",checkAuthenticated,getuserby,addtraderget);
router.post("/addtrader",checkAuthenticated,getuserby,sUpload,addtraderpost);
router.get('/mytradingprofile',checkAuthenticated,getuserby,mytradingprofile);