//Modules Import
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");

// Module On refactoring

const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    proxy: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected with FarmFlow MongoDB");
  });

const authenticateUser = async (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }

    if (user.authenicate(password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  });
};

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  User.findById(user, function (err, user) {
    done(err, user);
  });
});

//Module imported from Routes
const userRoute = require("./routers/user");
const storageRoute = require("./routers/storage");

//Route via use in app
app.use("/", userRoute);
app.use("/",storageRoute);

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(" server strated at 3000");
});
