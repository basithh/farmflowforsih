const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const esCropSchema = new mongoose.Schema({
  cropid: {
    type: ObjectId,
    ref: "Crop",
  },
  requirement: {
    type: String,

  },
  location: {
    type: String,

  },
  finaldateofbid:{
    type: Date,
  },
  userid: [{
    type: ObjectId,
    ref: "User",
  }],
},
{
    timestamps:true
}
);

module.exports = mongoose.model("EsCrop", esCropSchema);
