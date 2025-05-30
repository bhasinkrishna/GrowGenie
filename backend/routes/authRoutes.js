const express = require("express");
const router = express.Router();

const { registerUser, loginUser, verifyUser } = require("../controllers/authController");

router.post("/register", registerUser);


router.post("/login", loginUser);

router.post("/verifyUser", verifyUser);  

module.exports = router;
