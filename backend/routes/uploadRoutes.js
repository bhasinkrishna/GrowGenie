const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middelware/authMiddleware"); // Adjust the path

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const userName = req.user?.name || Date.now(); // Fallback if no user
    const ext = path.extname(file.originalname);
    cb(null, `${userName}${ext}`);
  },
});

const upload = multer({ storage });

// POST /upload/image (with auth)
router.post("/image", authMiddleware, upload.single("image"), (req, res) => {
  console.log("File received:", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ message: "Upload successful", path: req.file.path });
});


module.exports = router;
