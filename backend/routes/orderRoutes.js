import express from 'express';
import {
  getOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getOrders);

router.route('/:id')
  .put(protect, admin, updateOrderStatus);

export default router;

