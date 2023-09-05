const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const recruiterApplicationController = require("../controllers/Recruiter/recruiter.application.controller");
const { upload } = require("../middleware/multer.middleware");

router.post(
  "/",
  authenticateToken,
  recruiterApplicationController.createApplication
);

router.get(
  "/get-applicant-by-email/:email",
  authenticateToken,
  recruiterApplicationController.fetchAJobseekerByEmail
);
router.post(
  "/upload-resume",
  authenticateToken,
  upload.single("recruiterApplicantResume"),
  recruiterApplicationController.uploadResume
);
router.post(
  "/upload-cover-letter",
  authenticateToken,
  upload.single("recruiterApplicantCover"),
  recruiterApplicationController.uploadCoverLetter
);

module.exports = router;
