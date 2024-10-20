import axios from 'axios';

const API_URL = '/api/auth/'; // Adjust based on your backend route

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    // Save user data (e.g., JWT token) in localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Register new user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;

