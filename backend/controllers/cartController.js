import User from '../models/User.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId, quantity } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: 'Invalid product ID or quantity.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = user.cart.find((item) => item.product.toString() === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Server error occurred while adding to cart.' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productExists = user.cart.some((item) => item.product.toString() === productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    user.cart = user.cart.filter((item) => item.product.toString() !== productId);
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    res.status(500).json({ message: 'Server error occurred while removing from cart.' });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error retrieving cart:', error.message);
    res.status(500).json({ message: 'Server error occurred while retrieving cart.' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = [];
    await user.save();
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({ message: 'Server error occurred while clearing cart.' });
  }
};

