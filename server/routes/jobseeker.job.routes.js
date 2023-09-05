const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const jokseekerJobController = require("../controllers/Jobseeker/jobseeker.job.controller");

router.get("/", authenticateToken, jokseekerJobController.fetchAllJobs);

router.get("/:id", authenticateToken, jokseekerJobController.fetchById);

router.post("/", authenticateToken, jokseekerJobController.favouriteJob);

router.delete("/:id", authenticateToken, jokseekerJobController.unfavouriteJob);

module.exports = router;
