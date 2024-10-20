import axios from 'axios';

const API_URL = '/api/orders/'; // Adjust based on your backend route

// Create a new order
const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

// Fetch all orders for admin
const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch order details by ID
const getOrderDetails = async (orderId) => {
  const response = await axios.get(API_URL + orderId);
  return response.data;
};

// Update order status (for admin)
const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(API_URL + orderId, { status });
  return response.data;
};

const orderService = {
  createOrder,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
};

export default orderService;

