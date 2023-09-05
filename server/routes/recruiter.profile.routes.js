const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const recruiterProfileController = require("../controllers/Recruiter/recruiter.profile.controller");

// Fetch all profile details
router.get("/", authenticateToken, recruiterProfileController.fetchDetails);

router.put("/", authenticateToken, recruiterProfileController.saveDetails);

module.exports = router;
