import User from '../models/User.js'; // Ensure .js extension is included
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register user
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

    const newUser = new User({
      email,
      password: hashedPassword, // Use hashed password
      isAdmin: false // Default role set to user
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: { email: newUser.email, role: newUser.role } // Optionally include user info
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.isAdmin ? 'admin' : 'user' }, // Use user.isAdmin for role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: { email: user.email, role: user.isAdmin ? 'admin' : 'user' } // Include user info
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Exporting the functions for use in other modules
export default { register, login }; // Default export as an object containing both functions
