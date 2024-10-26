import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper to verify JWT_SECRET is loaded
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined in .env file");
  process.exit(1); // Exit process with failure
}

// Register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check required fields with password length validation
  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ message: 'Please provide name, email, and a password of at least 6 characters.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: { name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin }
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error occurred during registration' });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

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

    // Generate JWT with additional error handling
    try {
      const token = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        token,
        user: { name: user.name, email: user.email, isAdmin: user.isAdmin }
      });
    } catch (tokenError) {
      console.error('Error generating JWT:', tokenError.message);
      return res.status(500).json({ message: 'Error generating authentication token' });
    }

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error occurred during login' });
  }
};

// Export functions for route integration
export default { register, login };

