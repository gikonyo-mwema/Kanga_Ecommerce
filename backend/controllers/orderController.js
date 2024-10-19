import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  const order = new Order({
    orderItems,
    totalPrice,
    user: req.user._id,
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

