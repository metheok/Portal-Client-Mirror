const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const employerApplicationController = require("../controllers/Employer/employer.application.controller");

router.get(
  "/",
  authenticateToken,
  employerApplicationController.fetchApplications
);
router.get(
  "/:id",
  authenticateToken,
  employerApplicationController.fetchAnApplication
);

router.patch(
  "/:id",
  authenticateToken,
  employerApplicationController.updateApplication
);

module.exports = router;
