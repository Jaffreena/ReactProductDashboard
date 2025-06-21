import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#c0392b', '#8e44ad'];

const AnalyticsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100').then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  // All available categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Filtered based on dropdown
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Bar chart: top 10 by price
  const barData = filteredProducts
    .slice(0, 10)
    .map((p) => ({
      name: p.title.length > 12 ? p.title.slice(0, 12) + '...' : p.title,
      price: p.price,
    }));

  // Pie chart: category count (unchanged)
  const categoryCount = {};
  products.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  const pieData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Analytics</h2>

      {/* Category Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="category" className="form-label">
          Filter by Category:
        </label>
        <select
          id="category"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Bar Chart for selected category */}
      <div className="mb-5">
        <h5>Top 10 Products (Filtered by Category)</h5>
        {barData.length === 0 ? (
          <div className="text-muted">No products in selected category</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie Chart for all categories */}
      <div>
        <h5>Category Distribution</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
