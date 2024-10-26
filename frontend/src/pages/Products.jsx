import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();

  // Accessing products and loading/error states from Redux store
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Debugging: Check the value of products
  console.log("Products from Redux:", products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products-page">
      <h1 className="text-2xl font-bold text-center mt-6">Our Products</h1>

      <div className="grid grid-cols-4 gap-6 mt-8">
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;

