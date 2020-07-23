const express = require("express");
const router = express.Router();
const{
    addmycropget, viewmycrop, dashboard,
}= require("../controllers/farmer");

const{
  sUpload
}=require("../controllers/image");
const{
    viewescrop
}= require("../controllers/admin");

const {
  checkNotAuthenticated,
   getuserby,
   isStorage,
   checkAuthenticated,
  
 } = require("../controllers/user");
 

router.get("/farmerdashboard",checkAuthenticated,getuserby,dashboard); 
router.get("/estimatedcrop",checkAuthenticated,getuserby,viewescrop);
router.get("/addmycrop/:escropid",checkAuthenticated,getuserby,addmycropget);
router.get('/viewmycrop',checkAuthenticated,getuserby,viewmycrop);

module.exports = router;
