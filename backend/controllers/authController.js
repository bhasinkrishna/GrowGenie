const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      msg: "Registered successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      message: "Login successful",
      user: userData,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify JWT Token (User Auth Check)
const verifyUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode token
    const user = await User.findById(decoded._id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token", error: err.message });
  }
};


// Logout (client should delete token)
const logoutUser = (req, res) => {
  // No server-side action for JWT logout
  res.status(200).json({ msg: "Logout successful (client should delete token)" });
};

module.exports = { registerUser, loginUser, verifyUser, logoutUser };
