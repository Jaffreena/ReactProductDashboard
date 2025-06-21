// src/components/PriceChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PriceChart = ({ products }) => {
  // Use only first 10 for readability
  const chartData = products.slice(0, 10).map((p) => ({
    name: p.title.length > 15 ? p.title.slice(0, 15) + '...' : p.title,
    price: p.price,
  }));

  return (
    <div className="mt-5">
      <h4 className="mb-3">Top 10 Product Prices</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
