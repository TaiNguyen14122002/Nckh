const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name_admin: {
    type: String,
    required: true,
  },
  email_admin: {
    type: String,
    required: true,
    unique: true,
  },
  password_admin: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: [
    {
      name: String,
      mobileNo: String,
      houseNo: String,
      street: String,
      landmark: String,
      city: String,
      country: String,
      postalCode: String,
    },
  ],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Admin",userSchema);

module.exports = User