const { query } = require('express');
const Storage = require('../models/storage');
const Tanker = require('../models/storage');

exports.addStorageget=(req,res)=>{
    res.render('addstorage');
}

exports.addTankerget=(req,res)=>{
    res.render('addtanker');
}



exports.addStoragepost=(req,res)=>{
    var query = req.body;
    query["image"]=req.file.filename;
    query["userid"]=req.user;

    var storage = new Storage(query);
    storage.save((err,storage)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to add storage in DB"
            })
        }
        console.log(storage)
        res.redirect('/viewmystorage')
   
 });
}





exports.addTankerpost=(req,res)=>{
    var tanker = new Tanker(req.body);
    tanker.tankerid= req.user;
    tanker.save((err,tanker)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to add tanker in DB"
            })
        }
        res.redirect('/previewstorage',{tanker})
    });
}

exports.getbyStorageid=(req,res,next,id)=>{
    Storage.findById(id,(err,storage)=>{
        if(err){return res.send("404")}
        if(!storage){return res.send("ouytgdf")}
        req.storage=storage;
    })
    next();
}

exports.storageview=(req,res)=>{
    var id =req.params.storageid;
    console.log(id);
    Storage.findById(id,(err,storage)=>{
        if(err){return res.send("404")}
        res.send(storage);
    })
   
}




exports.modifyStorageget=(req,res)=>{

    
}



exports.deleteStorageget=(req,res)=>{

    
}
exports.viewmystorage=(req,res)=>{
    user=req.user;
    Storage.find({userid:user},(err,storage)=>{
        if(err){return res.send("404")}
        if(!storage){return res.send("ouytgdf")}
        res.render('viewmystorage',{storage});
        // res.send(storage)
    })
}



exports.dashboard=(req,res)=>{
    return res.render("sucessdash",{name:"Admin",firstname:req.profile.firstname})
}