const express = require("express");
const router = express.Router();

const {
   checkNotAuthenticated,
   getuserby,
   isadmin,
   checkAuthenticated,
 } = require("../controllers/user");
const{
  sUpload, getFile,
}=require("../controllers/image");
const{
    addcropget, addcroppost, viewcrop,addescroppost,addescropget,
    //viewescrop
}= require("../controllers/admin");

router.get("/addcrop",addcropget);
router.post("/addcrop",sUpload,addcroppost);

router.get("/viewcrop",viewcrop);

router.get("/image/:imageid",getFile);

router.get("/viewcrop/:cropid/escropadd",addescropget);
router.post("/addescrop/:cropid/",addescroppost);

//router.get("/viewescrop",viewescrop);

module.exports = router;