const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = (req.cookies && req.cookies.authToken) || req.header("Authorization")?.replace("Bearer ", "");

  // const token = req.cookies.authToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user; // Attach the user to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};



module.exports = authMiddleware;
