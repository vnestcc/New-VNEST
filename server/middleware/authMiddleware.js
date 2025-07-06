const jwt = require('jsonwebtoken');
const db = require('../db');

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      // Check if user exists in database
      const userResult = await db.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
      
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Add user info to request object
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
      
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

module.exports = authenticateToken;