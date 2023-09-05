const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const recruiterCandidateController = require("../controllers/Recruiter/recruiter.candidate.controller");
const { upload } = require("../middleware/multer.middleware");

router.get(
  "/:id",
  authenticateToken,
  recruiterCandidateController.fetchACandidate
);

router.get(
  "/",
  authenticateToken,
  recruiterCandidateController.fetchReferredCandidates
);

router.get(
  "/get-email-validity/:email",
  authenticateToken,
  recruiterCandidateController.getEmailValidity
);
router.post(
  "/upload-resume",
  authenticateToken,
  upload.single("candidateResume"),
  recruiterCandidateController.uploadResume
);
router.post(
  "/",
  authenticateToken,
  recruiterCandidateController.createACandidate
);

module.exports = router;
