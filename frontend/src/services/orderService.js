import axios from 'axios';

const API_URL = '/api/orders/';

// Place a new order
const placeOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

// Get the order history for a user
const getOrderHistory = async () => {
  const response = await axios.get(`${API_URL}history`);
  return response.data;
};

// Update order status (for admins)
const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(`${API_URL}${orderId}/status`, { status });
  return response.data;
};

const orderService = {
  placeOrder,
  getOrderHistory,
  updateOrderStatus,
};

export default orderService;


