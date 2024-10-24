import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import multer from 'multer';

const router = express.Router();

// Multer setup for file upload handling
const upload = multer({ dest: 'uploads/' });  // Temporary storage

// Public route to get all products
router.get('/', getProducts);

// Admin routes for managing products
router.post('/', protect, admin, upload.single('image'), createProduct);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;


