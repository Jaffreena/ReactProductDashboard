// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // ⬅️ Add this
const ProductDetail = () => {
  const { id } = useParams(); // extract product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
// Inside ProductDetail component
const { addToCart } = useCart(); // ⬅️ Use the context
  useEffect(() => {
    // Fetch single product based on id
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading product details...</div>;

  return (
    <div className="row mt-4">
      {/* Product Image */}
      <div className="col-md-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="img-fluid rounded shadow"
        />
      </div>

      {/* Product Info */}
      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p className="text-muted">{product.brand}</p>
        <p>{product.description}</p>
        <h4 className="text-success fw-bold">₹ {product.price}</h4>
        <p>Rating: ⭐ {product.rating} / 5</p>
        <p>Stock Available: {product.stock}</p>
        <p>Category: <span className="badge bg-secondary">{product.category}</span></p>
        <button className="btn btn-warning mt-3"   onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
