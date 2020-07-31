
//Models
const Crop = require('../models/board/crop');
const EsCrop = require('../models/board/escrop');
const preharvest = require('../models/farmer/preharvest');
const PreHarvest = require('../models/farmer/preharvest');
const Storage = require('../models/storage');



//DashBoard for Farmer
exports.dashboard=(req,res)=>{
    return res.render("farmer/dashboard",{name:"Farmer",firstname:req.profile.firstname})
}


exports.addmycropget=(req,res)=>{
    var query = {
        userid:req.user,
        escropid:req.params.escropid,
    }
    var post = PreHarvest(query);
    post.save();
   var esid = req.params.escropid;
   var useri = {userid:req.user};
    EsCrop.findByIdAndUpdate(esid, { $push: useri }, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
    console.log("Updated User : ", docs); 
    } 
    res.redirect('/viewmycrop');
    }); 
    
}


exports.viewmycrop=(req,res)=>{
    PreHarvest.find({userid:req.user}).populate({ path: 'escropid',select:'cropid',populate: {path: 'cropid'} }).exec( function(err, preharvest) {
        if(err){return res.send("404")}
        if(!preharvest){return res.send("Nothing was found")}
        res.render('farmer/viewmycrop',{preharvest})
        // res.send(preharvest)
    })
    
}


exports.viewmypreharvest=(req,res)=>{
    PreHarvest.find({userid:req.user}).populate({ path: 'escropid',select:'cropid',populate: {path: 'cropid'} }).exec((err,preharvest)=>{
        if(err){
            return res.send("FAilure");
        }
        if(!preharvest){
            return res.send("Empty Prehaverat")
        }
        // res.send(preharvest)
     res.render('farmer/viewmypreharvest',{preharvest});
    })
}




exports.addcroppost=(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    var query = req.body;
    query["climate"]={
        wind: req.body["climate["][0],
        tempertature: req.body["climate["][1],
        humidity:req.body["climate["][2],
    },
    delete query["climate["];
    query["image"]=req.file.filename;
    console.log(query);
    var crop = new Crop(query);
    
    crop.save((err,crop)=>{
      if(err){
         return res.status(400).json({
                 err:"Not able to add crop in DB"
             })
         }
       res.redirect("/viewcrop")
     });
}


exports.viewcrop=(req,res)=>{
    Crop.find({},(err,crop)=>{
        if(err){return res.send("404")}
        if(!crop){return res.send("Nothing was found")}
        res.render('farmer/viewcropf',{crop})
        // res.send(storage)
    })
}

exports.viewescropf=(req,res)=>{
    EsCrop.find({}).populate('cropid')
    .populate({ path: 'userid', select: 'firstname' })
    .exec( function(err, escrop) {
        if(err){return res.send("404")}
        if(!escrop){return res.send("Nothing was found")}
      res.render('farmer/viewescropf',{escrop})
//    res.send(escrop)
    })
    
}


exports.addescropget= (req,res)=>{
    var id = req.params.cropid;
    res.render('addescrop',{id})
}

exports.addescroppost=(req,res)=>{
    var query = req.body;
    query["cropid"]=req.params.cropid;

    var escrop = new EsCrop(query);
    escrop.save((err,escrop)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to add storage in DB"
            })
        }
        console.log(escrop);
        res.send(escrop);
    });
}

exports.addlandget=(req,res)=>{
    res.render('farmer/addland')
}

exports.addlandpost=(req,res)=>{
    var query = req.body;
    query["image"]=req.file.filename;
    query["userid"]=req.user;

    var land = new land(query);
    land.save((err,land)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to add storage in DB"
            })
        }
        console.log(land)
        res.redirect('/viewmyland')
   
 });
}


exports.storageonboard=(req,res)=>{
    var query1={};
    query1["order"]={
            userid:req.user._id   
    }
    console.log(query1);
    Storage.find(query1,(err,f)=>{
        if(err){
            console.log("Wwe");
        }
        if(!f){
            console.log("Belive me nothing was found")
        }
      res.render('farmer/viewstoragef',{f})
      //  res.send(f)
    })
}

exports.marketplace=(req,res)=>{
    res.render('farmer/marketplace');
}

exports.transportreq=(req,res)=>{
    res.render('farmer/transportreq')
}

exports.sellland=(req,res)=>{
    res.render('farmer/sellland')
}
exports.buyland=(req,res)=>{
    res.render('farmer/buyland')
}

exports.rentland=(req,res)=>{
    res.render('farmer/rentland')
}


