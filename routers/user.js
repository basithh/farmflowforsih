const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signupget,
  signuppost,
  checkNotAuthenticated,
  getuserby,
  checkAuthenticated,
  dashboard,
  signinget,
  logoutget,
  getdetailsget,
  getdetailspost,
} = require("../controllers/user");

//Register
router.get("/signup", signupget);
router.post("/signup", signuppost);
router.get("/getdetails/:userid", getdetailsget );
router.post("/getdetails/:userid",getdetailspost);

// router.get("/viewcrop/:cropid/escropadd",addescropget);
// router.post("/addescrop/:cropid/",addescroppost);

router.get("/signin", checkNotAuthenticated, signinget);
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/dash",
    failureRedirect: "/signin",
  })
);

router.get('/chat',checkAuthenticated,getuserby,(req,res)=>{
  us=req.user.firstname;
  return res.render('chat',{us});
})





router.get("/dash", getuserby, dashboard);
router.get("/signout",logoutget);
module.exports = router;



