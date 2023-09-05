const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const jobseekerProfileController = require("../controllers/Jobseeker/jobseeker.profile.controller");
const { upload } = require("../middleware/multer.middleware");

// Fetch all profile details
router.get("/", authenticateToken, jobseekerProfileController.fetchDetails);

router.put("/", authenticateToken, jobseekerProfileController.saveDetails);

router.post(
  "/upload-resume",
  authenticateToken,
  upload.single("jobseekerResume"),
  jobseekerProfileController.uploadResume
);
router.get(
  "/download-resume",
  authenticateToken,
  jobseekerProfileController.getResume
);
module.exports = router;
