// Middleware to check if user has admin role
const adminMiddleware = (req, res, next) => {
  try {
    // Check if user exists and has admin role
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    // If user is admin, proceed
    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    res.status(500).json({ message: 'Server error during admin authorization.' });
  }
};

module.exports = adminMiddleware;