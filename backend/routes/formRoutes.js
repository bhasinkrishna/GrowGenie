const express = require("express");
const router = express.Router();
const authMiddleware = require("../middelware/authMiddleware");
const Form = require("../models/Form");
const User = require("../models/User"); // Import the User model

// POST: Create a new form entry
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const formData = req.body;

    const newForm = new Form({ ...formData, user: userId });
    await newForm.save();

    res.status(201).json({ message: "Form submitted successfully", form: newForm });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: Fetch the form data and user name for the authenticated user
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     // Fetch form data for the authenticated user and populate the user field with user data (name)
//     const form = await Form.findOne({ user: req.user._id }).populate("user", "name"); // Populate only the name field
//     if (!form) return res.status(404).json({ message: "Form not found" });

//     // Check if the user was populated and send user details along with form
//     const userName = form.user ? form.user.name : 'No name available';

//     res.json({
//       ...form.toObject(),
//       userName, // Include the user's name in the response
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// PUT: Update form data (including extra fields only present on profile page)
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const updates = req.body; // Accept all incoming fields

    const updatedForm = await Form.findOneAndUpdate(
      { user: req.user._id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedForm) return res.status(404).json({ message: "Form not found" });

    res.json(updatedForm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const form = await Form.findOne({ user: req.user._id });
    if (!form) return res.status(404).json({ message: "Form not found" });

    res.json({
      ...form._doc,
      name: req.user.name  // ✅ Send user's name from req.user (from middleware)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
