// seedProducts.js
import mongoose from 'mongoose';
import Product from './models/product.js'; 

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    stock: 25,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    name: "Smart Watch",
    description: "Waterproof smart watch with heart rate monitor.",
    price: 59.99,
    stock: 40,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass.",
    price: 29.99,
    stock: 50,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  },
  {
    name: "Fitness Tracker",
    description: "Track your steps, calories, and sleep.",
    price: 39.99,
    stock: 35,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca"
  }
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/ecommerce'); 
  await Product.deleteMany({});
     try {
    await Product.insertMany(products);
    console.log('Products inserted!');
  } catch (err) {
    console.error('Insert error:', err);
  }
  console.log('Products inserted!');
  mongoose.disconnect();
}

seed();
