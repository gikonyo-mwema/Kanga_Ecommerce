import express from 'express';
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get cart, add item to cart
router.route('/')
  .get(protect, getCart)        // Fetch user's cart
  .post(protect, addToCart);    // Add an item to the cart

// Route to remove item from cart
router.route('/remove').post(protect, removeFromCart);

// Route to clear the cart
router.route('/clear').post(protect, clearCart);

export default router;

