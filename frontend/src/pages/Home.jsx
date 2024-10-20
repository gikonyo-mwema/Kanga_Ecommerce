import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Product 1', price: 29.99, image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: 49.99, image: '/images/product2.jpg' },
    { id: 3, name: 'Product 3', price: 19.99, image: '/images/product3.jpg' },
  ];

  return (
    <div className="home-container">
      <h1 className="text-3xl font-bold text-center mt-6">Welcome to Kanga E-commerce</h1>
      <p className="text-center text-gray-600 mb-10">Discover our latest collections</p>

      <div className="featured-products grid grid-cols-3 gap-6">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/products" className="bg-blue-500 text-white py-2 px-4 rounded">View All Products</Link>
      </div>
    </div>
  );
};

export default Home;

