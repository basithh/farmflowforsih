
// const Trader = require('../models/trader');

const PreHarvest = require('../models/farmer/preharvest');
const Trader = require('../models/trader/trader');



exports.viewpreharvest=(req,res)=>{
    PreHarvest.find({})
    .populate({ path: 'escropid',select:'cropid',populate: {path: 'cropid',select:'cropName variety priceOnAvervage priceMax description image'} })
    .populate({path:'userid',select:'firstname email'})
    .exec((err,preharvest)=>{
        if(err){
            return res.send("Error");
        }
        res.render('trader/viewpreharvest',{preharvest});
    //  res.send(preharvest);
    })
    
}

exports.croptradeprocess=(req,res)=>{
    query={
        trader:{
            traderid : req.user,
            price : req.body.price,
        }
    }
    PreHarvest.findByIdAndUpdate(req.params.cropid,query,(err,d)=>{if(err){console.log(err)}console.log(d)}) 
    query1={
        crop :{
            cropid : req.params.cropid,
            price : req.body.price,
        },
        userid:req.user
    }
    var trader = Trader(query1);
    trader.save();
    res.redirect('/addtocart')
}






exports.addtocart=(req,res)=>{
    query={
        userid:req.user}
    Trader.find(query)

    .populate({path:'crop' ,select:'cropid',populate:{ path: 'cropid',select:'escropid userid',populate:{path: 'escropid userid',select:'cropid firstname ',populate:{path: 'cropid',select:'cropName variety description image'}}}})
    .exec((err,addtocart)=>{
        if(err){
            return res.send("Error");
        }
         res.render('trader/addtocart',{addtocart});
  //res.send(preharvest);
    })
    
}

exports.viewtrade=(req,res)=>{
    res.send("on prosss");
}

// 