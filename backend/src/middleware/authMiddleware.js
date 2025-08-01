const jwt = require('jsonwebtoken');
const JWT_SECRET = '112@428-b'; 

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied....No token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
