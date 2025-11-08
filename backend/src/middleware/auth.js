const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.'
      });
    }

    // Extract token
    const token = authHeader.replace('Bearer ', '');

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired. Please login again.'
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    // Find user by ID from token
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token is invalid.'
      });
    }

    // Attach user info to request
    req.user = user;
    req.userId = user._id;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed.',
      error: error.message
    });
  }
};

// Middleware to check premium status
const requirePremium = async (req, res, next) => {
  try {
    if (!req.user.checkPremiumStatus()) {
      return res.status(403).json({
        success: false,
        message: 'This feature requires a premium subscription.',
        premiumRequired: true
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying premium status.',
      error: error.message
    });
  }
};

module.exports = { auth, requirePremium };