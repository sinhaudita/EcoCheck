
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Check if user exists
    console.log('Checking if user exists:', email);
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('User already exists');
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    console.log('Creating new user');
    const user = await User.create({
      email,
      password,
    });

    if (user) {
      console.log('User created successfully:', user._id);
      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      console.log('Failed to create user');
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(`Error in registerUser: ${error.message}`);
    console.error(error.stack);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(`Error in loginUser: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`Error in getMe: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
