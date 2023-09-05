const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const employProfileController = require("../controllers/Employer/employer.profile.controller");

router.get("/", authenticateToken, employProfileController.fetchDetails);

router.put("/", authenticateToken, employProfileController.saveDetails);

module.exports = router;
