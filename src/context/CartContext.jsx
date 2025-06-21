// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create context
const CartContext = createContext();

// Custom hook for easier usage
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
const [favorites, setFavorites] = useState([]);
const toggleFavorite = (product) => {
  setFavorites((prev) => {
    const exists = prev.find((item) => item.id === product.id);
    if (exists) {
      return prev.filter((item) => item.id !== product.id);
    } else {
      return [...prev, product];
    }
  });
};

const isFavorite = (id) => {
  return favorites.some((item) => item.id === id);
};

  // Add product to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
   <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, favorites, toggleFavorite, isFavorite }}>

      {children}
    </CartContext.Provider>
  );
};
