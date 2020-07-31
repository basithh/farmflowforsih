const express = require("express");
const router = express.Router();
const{
    addmycropget, viewmycrop, dashboard,addlandget,addlandpost, viewmypreharvest, storageonboard, marketplace,
     transportreq, sellland, rentland, buyland, viewcrop, viewescropf
}= require("../controllers/farmer");

const{
  sUpload
}=require("../controllers/image");
// const{
//     viewescrop
// }= require("../controllers/admin");

const {
  checkNotAuthenticated,
   getuserby,
   isStorage,
   checkAuthenticated,
  
 } = require("../controllers/user");
 

router.get("/farmerdashboard",checkAuthenticated,getuserby,dashboard); 
// router.get("/estimatedcrop",checkAuthenticated,getuserby,viewescrop);
router.get("/addmycrop/:escropid",checkAuthenticated,getuserby,addmycropget);
router.get('/viewmycrop',checkAuthenticated,getuserby,viewmypreharvest);
router.get('/storageonboard',checkAuthenticated,getuserby,storageonboard);

router.get('/marketplace',marketplace);

router.get('/transportreq',transportreq);
router.get('/viewstoragef',checkAuthenticated,getuserby,storageonboard);


router.get('/sellland',sellland);
router.get('/buyland',buyland);
router.get('/rentland',rentland);


router.get('/viewcropf',viewcrop);
router.get('/viewescropf',viewescropf);



router.get('/addland',addlandget);
router.post('/addland',sUpload,addlandpost);


module.exports = router;
