var mongoose = require("mongoose");
const crypto = require("crypto");

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    userinfo: {
      type: String,
    },
    encry_password: {
      type: String,
    },
    salt: String,
    role: {
      type: String,
    },
    address: {
      type: String,
    },
    lang:{
      type:Number,
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = "ABC";
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods.authenicate= function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  };

userSchema.methods.securePassword= function (plainpassword) {
  if (!plainpassword) return "";
  try {
    return crypto
      .createHmac("sha256", this.salt)
      .update(plainpassword)
      .digest("hex");
  } catch (err) {
    return "";
  }}


module.exports = mongoose.model("User", userSchema);
