// src/pages/FavoritesPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const FavoritesPage = () => {
  const { favorites } = useCart();

  if (favorites.length === 0) {
    return <div className="text-center mt-5">❤️ No favorites yet</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Favorite Products</h2>
      <div className="row">
        {favorites.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
