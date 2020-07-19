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
} = require("../controllers/user");

//Register
router.get("/signup", signupget);
router.post("/signup", signuppost);

router.get("/signin", checkNotAuthenticated, signinget);
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/dash",
    failureRedirect: "/signin",
  })
);
router.get("/dash", getuserby, dashboard);
router.get("/signout",logoutget)
module.exports = router;
