// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const [sortType, setSortType] = useState('none');

  const itemsPerPage = 1000;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products?limit=10000');
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

let sortedProducts = [...filteredProducts];
if (sortType === 'price-asc') {
  sortedProducts.sort((a, b) => a.price - b.price);
} else if (sortType === 'price-desc') {
  sortedProducts.sort((a, b) => b.price - a.price);
} else if (sortType === 'rating-desc') {
  sortedProducts.sort((a, b) => b.rating - a.rating);
}

const paginatedProducts = sortedProducts.slice(start, end);


  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
{/* Sort Dropdown */}
<div className="mb-3">
  <label htmlFor="sort" className="form-label">Sort by:</label>
  <select
    id="sort"
    className="form-select"
    value={sortType}
    onChange={(e) => setSortType(e.target.value)}
  >
    <option value="none">None</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="rating-desc">Rating: High to Low</option>
  </select>
</div>

      {/* Product Grid */}
      <div className="row">
        {paginatedProducts.length === 0 ? (
          <div className="text-center">No matching products found</div>
        ) : (
          paginatedProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </>
  );
};

export default ProductList;
