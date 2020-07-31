const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const StorageSchema = new mongoose.Schema(
  {
    storageName: {
      type: String,
    },
    userid: {
      type: ObjectId,
      ref: "User",
    },
    storageSize: {
      type: String,
    },
    location: {
      type: String,
    },
    rent:{
      type: Number,
    },
    order: 
      {
        userid: {
          type: ObjectId,
          ref: "User",
        },
      },
    image: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TankerSchema = new mongoose.Schema(
  {
    tankname: {
      type: String,
      maxlength: 32,
      required: true,
    },
    madefor: {
      type: String,
      maxlength: 32,
    },
    tankfcp: {
      type: Number,
      required: true,
    },
    tankava: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Tanker", TankerSchema);

module.exports = mongoose.model("Storage", StorageSchema);
