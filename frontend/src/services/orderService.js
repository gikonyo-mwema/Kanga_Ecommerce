import axios from 'axios';

const API_URL = '/api/orders/';

// Fetch all orders
const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update order status
const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(API_URL + orderId, { status });
  return response.data;
};

const orderService = {
  getAllOrders,
  updateOrderStatus,
};

export default orderService;

