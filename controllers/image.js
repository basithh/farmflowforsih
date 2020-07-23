require("dotenv").config();
let multer  = require("multer");
const  mongoose                  = require('mongoose')
var Grid                      = require('gridfs-stream');
var GridFsStorage = require('multer-gridfs-storage');

var storage = new GridFsStorage({
    url: process.env.DATABASE,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-farm-${file.originalname}`;
        return filename;
      }
  
      return {
        bucketName: "photos",
        filename: `${Date.now()}-farm-${file.originalname}`
      };
    }
  });
  
var uploadFile = multer({ storage: storage });
exports.sUpload = uploadFile.single('avatar'); 
// exports.im=(req, res, next) => { 
//     console.log(req.file);

//     Image.create(req.file, function(err, addedImage) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("SUCCESSFULLY ADDED NEW IMAGE! " + addedImage);
//             req.ima=addedImage;
//             console.log(addedImage);
//             next();
//         }
//     })

// };

exports.imagefetch=(req,res,next)=>{
    Sto.find({})
}




const conn = mongoose.connection;
const mongoURI = process.env.DATABASE;

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('photos'); //collection name
});

exports.getFile= (req, res) => {
    gfs.files.findOne({filename: req.params.imageid}, (err, file) => {
        if(!file || file.length === 0){
            return res.status(404).json({err: 'No File Exists'});
        } else {
            // Check if is image
            if(file.contentType === "image/jpeg" || file.contentType === "image/png"){
                // Read output to broswer
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({err: 'Not and image'});
            }
        }
    })};
