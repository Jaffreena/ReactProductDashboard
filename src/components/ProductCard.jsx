// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { toggleFavorite, isFavorite } = useCart();

  return (
    <div className="card h-100 shadow-sm">
      {/* Product Image */}
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column">
        {/* Title + Favorite Button Row */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{product.title}</h5>
          <button
            className="btn btn-link p-0 text-danger"
            onClick={() => toggleFavorite(product)}
            title="Toggle Favorite"
          >
            {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        {/* Product Price */}
        <p className="card-text text-success fw-bold">₹ {product.price}</p>

        {/* View More Button */}
        <Link
          to={`/product/${product.id}`}
          className="btn btn-primary btn-sm mt-auto"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
