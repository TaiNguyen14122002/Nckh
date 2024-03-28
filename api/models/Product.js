const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  product_Name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_information: {
    type: String,
    required: true,
  },
  product_createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', userSchema);

module.exports = Product;
