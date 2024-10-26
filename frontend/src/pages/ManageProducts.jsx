import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../redux/slices/productSlice'; // Actions for product management
import ImageUpload from '../components/ImageUpload';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: '', imageUrl: '' });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleImageUpload = (url) => {
    setImageUrl(url);
    setFormData({ ...formData, imageUrl: url });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      dispatch(updateProduct({ productId: editingProduct._id, productData: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    setFormData({ name: '', price: '', category: '', imageUrl: '' });
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setImageUrl(product.imageUrl);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="manage-products">
      <h1 className="text-2xl font-bold text-center mt-6">Manage Products</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />

        <ImageUpload onUpload={handleImageUpload} />

        {imageUrl && (
          <div className="mt-4">
            <img src={imageUrl} alt="Product" className="w-32 h-auto" />
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          {editingProduct ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="products-list mt-8">
        {products.map((product) => (
          <div key={product._id} className="p-4 bg-gray-100 rounded-md mb-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <img src={product.imageUrl} alt={product.name} className="w-32 h-auto mt-2" />
            <div className="mt-4 space-x-4">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white py-1 px-3 rounded-md">
                Edit
              </button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white py-1 px-3 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;

