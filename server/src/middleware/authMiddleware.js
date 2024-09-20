const jwt = require('jsonwebtoken');
const { User } = require('../models/userSchema.Model');

// Middleware to check for valid JWT token and authenticate user
const requireSignIn = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        req.user = decoded; 
        next(); 
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({ message: 'Token is not valid' }); 
    }
};

const verifyLogin = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
      } catch (error) {
        console.log('Invalid token, proceeding without user.');
      }
    }
    next(); 
    
  };

// Middleware to check if the authenticated user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); 
        }

        if (user.role !== 1) {
            return res.status(403).json({ message: 'Access denied. Admins only' }); 
        }
        next(); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message }); 
    }
};

module.exports = { requireSignIn, isAdmin, verifyLogin };
