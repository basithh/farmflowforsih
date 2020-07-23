const Crop = require('../models/board/crop');
const EsCrop = require('../models/board/escrop');

exports.addcropget=(req,res)=>{
    return res.render('addcrop');
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


exports.viewescrop=(req,res)=>{
    EsCrop.find({}).populate('cropid')
    .populate({ path: 'userid', select: 'firstname' })
    .exec( function(err, escrop) {
        if(err){return res.send("404")}
        if(!escrop){return res.send("Nothing was found")}
      res.render('viewescrop',{escrop})
//    res.send(escrop)
    })
    
}

