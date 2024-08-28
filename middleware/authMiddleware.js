const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.headers['authorization'];

  // Check if Authorization header is present and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token by removing 'Bearer ' prefix
  const token = authHeader.slice(7);

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Log the error for debugging
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
