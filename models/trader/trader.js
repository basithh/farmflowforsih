const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TraderSchema = new mongoose.Schema(
  {
    crop: {
      cropid: {
        type: ObjectId,
        ref: "PreHarvest",
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
    userid:{
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trader", TraderSchema);
