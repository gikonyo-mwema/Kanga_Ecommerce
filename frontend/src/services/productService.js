import axios from 'axios';

const API_URL = '/api/products/'; // Adjust based on your backend route

// Fetch all products
const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch product details by ID
const getProductById = async (productId) => {
  const response = await axios.get(API_URL + productId);
  return response.data;
};


// Create a new product (for admin)
const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);  // Ensure productData contains image URL
  return response.data;
};

// Update an existing product (for admin)
const updateProduct = async (productId, productData) => {
  const response = await axios.put(API_URL + productId, productData);  // Ensure productData contains image URL
  return response.data;
};




// Delete a product (for admin)
const deleteProduct = async (productId) => {
  const response = await axios.delete(API_URL + productId);
  return response.data;
};

const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;

