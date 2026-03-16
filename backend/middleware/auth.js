

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET || "your_jwt_secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.user = decoded; // Now decoded contains role, userId, etc.
    next(); // Move to next middleware/controller AFTER verification
  });
};

module.exports = verifyToken;
