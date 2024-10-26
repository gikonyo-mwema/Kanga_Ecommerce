import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }, // Enforces minimum password length for security
  isAdmin: { type: Boolean, default: false },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    }
  ]
});

// Ensure unique index on email to prevent duplicates at the database level
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;

