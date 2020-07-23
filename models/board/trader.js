const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TraderSchema = new mongoose.Schema(
  {
    tradername: {
      type: String,
    },
    userObjectID: {
      type: ObjectId,
      ref: "User",
    },
    location: {
      type: String,
    },
    storageObjectId: {
      type: ObjectId,
      ref: "Storage",
    },
    description: {
      type: string,
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
