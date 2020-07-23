const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PostharvestSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
    },
    mycropid: {
      type: ObjectId,
      ref: "farmer",
    },
    quantity: {
      type: Number,
    },
    description: {
      type: String,
    },
    quality: {
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

module.exports = mongoose.model("PostHarvest", PostharvestSchema);
