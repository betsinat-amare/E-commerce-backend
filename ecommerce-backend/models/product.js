import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: String
});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
