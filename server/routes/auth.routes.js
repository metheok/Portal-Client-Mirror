const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Signup user and return token
router.post("/signup", authController.signup);

// Login user and return token
router.post("/login", authController.login);

router.put("/update-password", authController.updatePassword);

module.exports = router;
