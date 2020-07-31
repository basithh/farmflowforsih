const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PreharvestSchema = new mongoose.Schema(
  {
    userid: {
      type: ObjectId,
      ref: "User",
    },
    escropid: {
      type: ObjectId,
      ref: "EsCrop",
    },
    harvestarea: {
      type: String,
    },
    harvestlocation: {
      type: String,
    },
    trader : {traderid: {
      type: ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    }}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PreHarvest", PreharvestSchema);
