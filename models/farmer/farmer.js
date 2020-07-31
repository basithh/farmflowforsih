const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  address: {
    type: String,
  },
  cropid: {
    type: ObjectId,
  },

  land: {
    landname: String,
    landsize: Number,
    landlocation: String,
    soiltype: String,
    fertilityrange: String,
  },
  traderid: {
    type: ObjectId,
    ref: "User",
  },
  traderprice: {
    type: Number,
  },
  
}  ,{
  timestamps: true,
});

const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = Farmer;
