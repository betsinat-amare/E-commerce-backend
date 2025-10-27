// src/pages/Home.js
import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-6">
      <h2 className="text-6xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
        Welcome to Your Shop
      </h2>
      <p className="max-w-3xl text-center text-white text-lg font-medium mb-12 shadow-lg bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md">
        Discover the best deals and a wide selection of products with ease and security.  
        Shop confidently with fast shipping and trusted services.
      </p>
      <button
        onClick={() => window.location.href = '/products'}
        className="px-12 py-4 font-semibold rounded-full bg-white text-purple-700 hover:bg-purple-700 hover:text-white transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Browse Products"
      >
        Start Shopping
      </button>
    </div>
  );
}

export default Home;
