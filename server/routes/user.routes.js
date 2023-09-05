const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");
const { upload } = require("../middleware/multer.middleware");

router.post(
  "/uploadProfilePicture",
  authenticateToken,
  upload.single("profilePicture"),
  userController.uploadProfilePicture
);

router.delete(
  "/deleteProfilePicture",
  authenticateToken,
  userController.deleteProfilePicture
);
router.get("/", authenticateToken, userController.fetchUser);

module.exports = router;
