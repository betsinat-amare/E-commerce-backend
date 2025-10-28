import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await API.post('/cart', { productId: product._id, quantity: 1 });
      setMessage('Added to cart!');
    } catch (err) {
      setMessage('Failed to add to cart');
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-12 text-lg">Loading product...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-12 text-lg">{error}</p>;
  if (!product)
    return <p className="text-center text-gray-600 mt-12 text-lg">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{product.name}</h2>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md mx-auto rounded-md object-cover mb-6"
        />
      )}
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold text-indigo-600 mb-2">
        Price: ${product.price.toFixed(2)}
      </p>
      <p className="text-gray-600 mb-6">Stock: {product.stock}</p>
      <button
        onClick={handleAddToCart}
        className="bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-colors block mx-auto"
      >
        Add to Cart
      </button>
      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.includes('failed') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ProductDetails;
