const mongoose = require("mongoose");

const LandSchema = new mongoose.Schema({
 
    landname: String,
    landsize: Number,
    landlocation: String,
    soiltype: String,
    fertilityrange: String,

});

const Land = mongoose.model("Land", LandSchema);

module.exports = Land;
