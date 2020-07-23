 const express = require("express");
const router = express.Router();
const {
  addStorageget,
  addStoragepost,
  viewmystorage,
  getbyStorageid,
  storageview,dashboard

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
router.post("/addstorage",checkAuthenticated,getuserby,sUpload,addStoragepost);
router.get('/viewmystorage',checkAuthenticated,getuserby,viewmystorage);
// router.get("/Storage", addStorage);
router.get('/viewmystorage/:storageid',checkAuthenticated,getuserby,storageview);

module.exports = router;
