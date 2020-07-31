 const express = require("express");
const router = express.Router();
const {
  addStorageget,
  addStoragepost,
  viewmystorage,
  getbyStorageid,
  storageview,dashboard,
  processStorage,viewstorage

} = require("../controllers/storage");

const{
  sUpload
}=require("../controllers/image");

const {
  checkNotAuthenticated,
   getuserby,
   isStorage,
   checkAuthenticated,
  
 } = require("../controllers/user");




router.get("/storage/dashboard",checkAuthenticated,getuserby,dashboard); 
router.get("/addstorage",checkAuthenticated,getuserby,addStorageget);
router.post("/addstorage",sUpload,addStoragepost);
router.get('/viewmystorage',checkAuthenticated,getuserby,viewmystorage);
// router.get("/Storage", addStorage);
router.get('/viewmystorage/:storageid',checkAuthenticated,getuserby,storageview);
router.get('/viewstorage',checkAuthenticated,getuserby,viewstorage)
router.get('/viewstorage/:storageid',checkAuthenticated,getuserby,processStorage);

module.exports = router;
