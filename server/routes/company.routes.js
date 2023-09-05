const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const companyController = require("../controllers/company.controller");

// Fetch all company details
router.get("/", authenticateToken, companyController.fetchDetails);

// Save new company details
// router.put("/", authenticateToken, companyController.saveDetails);

/// update company details

// router.patch("/", authenticateToken, companyController.updateDetails);

module.exports = router;
