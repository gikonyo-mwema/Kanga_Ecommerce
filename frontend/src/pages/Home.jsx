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
    <div className="home-container mx-auto w-full max-w-7xl p-6">
      {/* Hero Section */}
      <section className="hero bg-cover bg-center h-[500px]" style={{ backgroundImage: `url('/images/hero-image.jpg')` }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to Kanga E-commerce</h1>
            <p className="mb-6 text-lg">Discover our latest collections and exclusive offers.</p>
            <Link to="/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-signup bg-gray-100 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest updates and discounts</p>
          <form className="flex flex-col md:flex-row items-center justify-center">
            <input type="email" placeholder="Your email" className="p-3 border rounded-l-md w-full md:w-auto mb-4 md:mb-0 md:mr-2" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-md transition duration-300 ease-in-out">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promotional-banner text-center py-8 bg-yellow-100 my-12">
        <h2 className="text-2xl font-bold">Limited Time Offer!</h2>
        <p className="text-lg mb-4">Get 20% off on your first purchase</p>
        <Link to="/products" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Shop Now
        </Link>
      </section>

      {/* View All Products Button */}
      <div className="text-center mt-12">
        <Link to="/products" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Home;

