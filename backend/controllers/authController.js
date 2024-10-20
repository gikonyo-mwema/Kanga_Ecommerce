const User = requir('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const exitstingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

 // Hash password
  const newUser = new User({
    email,
    password: hashedPassword,
    role: 'user'
  });

  // Save user to the database
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Login user
exports.login = async (req, res) => {
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
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
  } catch (error) {
  res.status(500).json({ message: 'Server error' });
}
};
