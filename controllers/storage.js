
const Storage = require('../models/storage');
const Tanker = require('../models/storage');

exports.addStorageget=(req,res)=>{
    res.render('storage/addstorage');
}


exports.addStoragepost=(req,res)=>{
    var query = req.body;
    console.log(req.file)
    query["image"]=req.file.filename;   //stop maddy i Got it
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


exports.viewstorage=(req,res)=>{
   // user=req.user;
    Storage.find({},(err,storage)=>{
        if(err){return res.send("404")}
        if(!storage){return res.send("ouytgdf")}
        res.render('storage/viewstorage',{storage});
        // res.send(storage)
    })
}





exports.viewmystorage=(req,res)=>{
    user=req.user;
    Storage.find({userid:user},(err,storage)=>{
        if(err){return res.send("404")}
        if(!storage){return res.send("ouytgdf")}
        res.render('farmer/viewmystorage',{storage});
        // res.send(storage)
    })
}



exports.dashboard=(req,res)=>{
    return res.render("sucessdash",{name:"Admin",firstname:req.profile.firstname})
}


exports.processStorage=(req,res)=>{
    query1={
        order:{
            userid:req.user
        }
    }
    Storage.findByIdAndUpdate(req.params.storageid,query1,(err,d)=>{if(err){console.log(err)}console.log(d)}); 
    res.redirect('/d')
}


