import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },  // New field to track status
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;

