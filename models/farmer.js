const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  landsize: {
    type: Number,
  },
  address: {
    type: String,
  },



});


const Farmer = mongoose.model("Farmer", FarmerSchema);


module.exports = Farmer;