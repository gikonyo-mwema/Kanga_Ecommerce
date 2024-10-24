import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import ImageUpload from '../components/ImageUpload';  // Import your image upload component

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [imageUrl, setImageUrl] = useState('');  // New state to store the uploaded image URL

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCreate = () => {
    // Pass image URL from the upload component into the new product
    dispatch(createProduct({ ...newProduct, image: imageUrl }));
    setNewProduct({ name: '', price: '', image: '' });
    setImageUrl('');  // Clear the image URL after creating the product
  };

  const handleUpdate = (id, updatedProduct) => {
    dispatch(updateProduct(id, updatedProduct));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Manage Products</h1>
      <div>
        <h2 className="text-xl">Add a new product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        
        {/* Image upload section */}
        <ImageUpload setUploadedUrl={setImageUrl} />  {/* This allows the image URL to be set when uploaded */}
        
        <button onClick={handleCreate} className="bg-green-500 text-white py-2 px-4 mt-4">
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onUpdate={(updatedProduct) => handleUpdate(product._id, updatedProduct)}
            onDelete={() => handleDelete(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;

