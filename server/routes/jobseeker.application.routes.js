const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const jobseekerApplicationController = require("../controllers/Jobseeker/jobseeker.application.controller");
const { upload } = require("../middleware/multer.middleware");

router.post(
  "/",
  authenticateToken,
  jobseekerApplicationController.createApplication
);

router.post(
  "/upload-resume",
  authenticateToken,
  upload.single("jobseekerApplicantResume"),
  jobseekerApplicationController.uploadResume
);
router.post(
  "/upload-cover-letter",
  authenticateToken,
  upload.single("jobseekerApplicantCover"),
  jobseekerApplicationController.uploadCoverLetter
);

module.exports = router;
