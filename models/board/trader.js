const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TraderSchema = new mongoose.Schema(
  {
    cropid: {
      type: ObjectId,
      ref: "Crop",
    },
    price: {
      type: String,
      required: true,
      maxlength: 32,
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

module.exports = mongoose.model("Tanker", TraderSchema);
