const Crop = require('../models/board/crop');
const EsCrop = require('../models/board/escrop');
const PreHarvest = require('../models/farmer/preharvest');

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
}); 
    return res.redirect('/viewmycrop')
}

exports.viewmycrop=(req,res)=>{
    PreHarvest.find({userid:req.user}).populate({ path: 'escropid',select:'cropid',populate: {path: 'cropid'} }).exec( function(err, preharvest) {
        if(err){return res.send("404")}
        if(!preharvest){return res.send("Nothing was found")}
   

   res.render('viewmycrop',{preharvest})
   // res.send(preharvest)
    })
    
}


// User.
//   findOne({ name: 'Val' }).
//   populate({
//     path: 'friends',
//     // Get friends of friends - populate the 'friends' array for every friend
//     populate: { path: 'friends' }
//   });









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
        res.render('viewcrop',{crop})
        // res.send(storage)
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





exports.dashboard=(req,res)=>{
    return res.render("sucessdash",{name:"Farmer",firstname:req.profile.firstname})
}