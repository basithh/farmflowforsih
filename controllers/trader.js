const { query } = require('express');
const Trader = require('../models/trader');

exports.addtraderget=(req,res)=>{
    res.render('addtrader');
}


exports.addtraderpost=(req,res)=>{
    console.log(req.body);
    var query = req.body;
    query["userid"]=req.user;
    var trader = new Trader(query);
    
    trader.save((err,trader)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to add storage in DB"
            })
        }
        console.log(trader)
        res.redirect('/mytradingprofile')
    });
}


exports.dashboard=(req,res)=>{
        return res.render("sucessdash",{name:"Admin",firstname:req.profile.firstname})
  }


