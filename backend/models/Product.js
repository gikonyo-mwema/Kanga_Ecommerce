import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  countInStock: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
