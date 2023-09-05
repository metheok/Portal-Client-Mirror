const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const jobseekerSettingController = require("../controllers/Jobseeker/jobseeker.setting.controller");


router.get("/", authenticateToken, jobseekerSettingController.fetchDetails);

router.put("/", authenticateToken, jobseekerSettingController.saveDetails);


module.exports = router; 