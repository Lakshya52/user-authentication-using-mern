
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate token
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", success: false });
  }
};


module.exports = ensureAuthenticated;