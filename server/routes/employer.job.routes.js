const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const employerJobController = require("../controllers/Employer/employer.job.controller");

router.get("/", authenticateToken, employerJobController.fetchAllJobs);

router.get("/:id", authenticateToken, employerJobController.fetchById);

router.put("/", authenticateToken, employerJobController.updateDetails);

router.post("/", authenticateToken, employerJobController.saveDetails);

router.put("/update-status", authenticateToken, employerJobController.updateJobStatus);

module.exports = router;
