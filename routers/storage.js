 const express = require("express");
const router = express.Router();
const {
  addStorageget,
  addStoragepost,
  viewmystorage,
  getbyStorageid,
  storageview

} = require("../controllers/storage");

const {
  checkNotAuthenticated,
   getuserby,
   isStorage,
   checkAuthenticated,
 } = require("../controllers/user");



router.get("/addstorage",checkAuthenticated,getuserby,addStorageget);
router.post("/addstorage",checkAuthenticated,getuserby,addStoragepost);
router.get('/viewmystorage',checkAuthenticated,getuserby,viewmystorage);
// router.get("/Storage", addStorage);
router.get('/viewmystorage/:storageid',checkAuthenticated,getuserby,storageview);

module.exports = router;
