import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Public route to get all products
router.get('/', getProducts);

// Admin routes for managing products
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;

