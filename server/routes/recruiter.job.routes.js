const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const recruiterJobController = require("../controllers/Recruiter/recruiter.job.controller");

router.get("/", authenticateToken, recruiterJobController.fetchAllJobs);

router.get("/fetch/:id", authenticateToken, recruiterJobController.fetchById);

router.post("/", authenticateToken, recruiterJobController.markJob);

router.delete("/:id", authenticateToken, recruiterJobController.unmarkJob);

module.exports = router;
