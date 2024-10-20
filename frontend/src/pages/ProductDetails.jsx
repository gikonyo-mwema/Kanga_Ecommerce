import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService'; // For fetching product details

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await productService.getProductById(id);
      setProduct(data);
    };
    fetchProductDetails();
  }, [id]);

  return (
    <div className="product-details-page">
      {product ? (
        <div className="product-info">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
          <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-bold mt-4">${product.price}</p>

          <button className="bg-green-500 text-white py-2 px-4 mt-6">Add to Cart</button>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;

