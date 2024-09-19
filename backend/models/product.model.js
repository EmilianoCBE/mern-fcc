import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
}, {
  timestamps: true // Add created_at and updated_at fields
});

const Product = mongoose.model("Product", productSchema); 
// Create a model from the schema, collection name will be Product, mongoose will convert it to plural products

export default Product;