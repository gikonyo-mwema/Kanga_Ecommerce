import User from '../models/User.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { productId, quantity } = req.body;  // Get productId and quantity from request body
  const product = await Product.findById(productId);

  if (user && product) {
    const cartItem = user.cart.find((item) => item.product.toString() === productId);

    if (cartItem) {
      cartItem.quantity += quantity;  // Update the quantity if product is already in the cart
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } else {
    res.status(404).json({ message: 'Product or User not found' });
  }
};

export const removeFromCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { productId } = req.body;

  if (user) {
    user.cart = user.cart.filter((item) => item.product.toString() !== productId);
    await user.save();
    res.json(user.cart);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');  // Populate product details

  if (user) {
    res.json(user.cart);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const clearCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.cart = [];
    await user.save();
    res.json({ message: 'Cart cleared' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

