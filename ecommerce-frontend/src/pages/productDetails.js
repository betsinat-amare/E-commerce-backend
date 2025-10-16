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

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      {product.image && <img src={product.image} alt={product.name} style={{ width: '300px' }} />}
      <p>{product.description}</p>
      <p><strong>Price: ${product.price.toFixed(2)}</strong></p>
      <p>Stock: {product.stock}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <p>{message}</p>
    </div>
  );
}

export default ProductDetails;
