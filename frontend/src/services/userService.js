import axios from 'axios';

const API_URL = '/api/users/';

// Fetch all users
const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update user role
const updateUserRole = async (userId, role) => {
  const response = await axios.put(API_URL + userId, { role });
  return response.data;
};

const userService = {
  getAllUsers,
  updateUserRole,
};

export default userService;

