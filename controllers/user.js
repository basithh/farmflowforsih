const User = require("../models/user");

var passport = require('passport');

exports.signupget=(req,res)=>{
    res.render('signup');
}

exports.signuppost = (req,res)=>{
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user in DB"
            })
        }
        res.redirect('/signin')
    })
    console.log(req.body);

};

exports.signinget = (req,res)=>{
    res.render('signin');
};
  
exports.logoutget=(req, res) => {
    req.logOut()
    res.redirect('/signin')
  }
  
exports.checkAuthenticated=(req, res, next) =>{
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
}


exports.checkNotAuthenticated=(req, res, next) =>{
    if (req.isAuthenticated()) {
      return res.redirect('/dash');
    }
    next()
}
  
exports.getuserby=async (req,res,next)=>{
  await User.findById(req.user, function (err, user) {
    console.log(user)
    req.profile=user;
  });
  next();
}

exports.loginpost=()=>{passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  })
}




// 1-Admin
// 2-Farmer
// 3-Storage
// 4-Trader
// 5-Preprocessor



exports.dashboard=(req,res)=>{
  switch(req.profile.role){
    case "1":
      return res.redirect('/farmerdashboard');
      break;
    case "2":
      return res.redirect('/farmerdashboard')
      break;
    case "3":
      return res.redirect('/farmerdashboard')
      break;
    case "4":
      return res.redirect('/farmerdashboard')
      break;
    case "5":
      return res.redirect('/farmerdashboard')
      break;
    case "6":
      return res.redirect('/farmerdashboard')
      break;
  }
}






exports.isadmin= (req,res,next)=>{
  if(req.profile.role==="1"){
    return res.send("Your admin"+req.profile.role);
   }
  res.send("sorry"+req.profile.role);
}
  

exports.isFarmer=(req,res,next)=>{
  if(req.profile.role==="2"){
    next()
   }
  res.render("404");
}

exports.isStorage =(req,res,next)=>{
  if(req.profile.role==="3"){
    next()
   }
  res.render("404");
}

exports.isTrader=(req,res,next)=>{
  if(req.profile.role==="4"){
    next()
   }
  res.render("404");
}



exports.isTransport=(req,res,next)=>{
  if(req.profile.role==="5"){
    next()
   }
  res.render("404");
}


exports.isProcessor=(req,res,next)=>{
  if(req.profile.role==="6"){
    next()
   }
  res.render("404");
}

