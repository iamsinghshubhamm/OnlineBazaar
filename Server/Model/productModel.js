const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  totalStock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imagePublicId : {
    type : String
  }
}, {
  timestamps: true, 
});

module.exports  = mongoose.model('Product', ProductSchema);

