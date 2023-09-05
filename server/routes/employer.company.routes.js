const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const employerCompanyController = require("../controllers/Employer/employer.company.controller");

// Fetch all company details
router.get("/", authenticateToken, employerCompanyController.fetchDetails);

// Save new company details
router.post("/", authenticateToken, employerCompanyController.saveDetails);

/// update company details

router.put("/", authenticateToken, employerCompanyController.updateDetails);

module.exports = router;
