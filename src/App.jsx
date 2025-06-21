import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import AnalyticsPage from './pages/AnalyticsPage';
import FavoritesPage from './pages/FavoritesPage';
const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
