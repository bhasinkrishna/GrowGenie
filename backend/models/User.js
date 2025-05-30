const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name is required and must be a string
  email: { type: String, required: true, unique: true },  // Email is required and must be unique
  password: { type: String, required: true },  // Password is required
});

module.exports = mongoose.model("User", userSchema);  // Create and export the User model
