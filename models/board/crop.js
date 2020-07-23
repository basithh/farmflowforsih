var mongoose = require("mongoose");
var CropSchema = mongoose.Schema({
    cropName :{
        type: String,
        required: true,
        maxlength: 32,
    },
    variety :{
        type: String,
        required: true,
        maxlength: 32,
    },
    priceOnAvervage :{
        type: String,
        required: true,
        maxlength: 32,
    },
    priceMax:{
        type: String,
        required: true,
        maxlength: 32,
    },
    description:{
        type: String,
        required: true,
    },
    climate:{
        wind: Number,
        tempertature: Number,
        humidity: Number,
    },
    soil : {
        type:Number,
    }, 
    image:{
        type:String,
    }

});

module.exports = mongoose.model("Crop", CropSchema);