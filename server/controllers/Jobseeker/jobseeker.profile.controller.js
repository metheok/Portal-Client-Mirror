const { validateJobseekerProfile } = require("../../utils/validators");
const Jobseeker = require("../../models/jobseeker");
const fs = require("fs");
const { Config } = require("../../../configs/config");
class JobseekerController {
  fetchDetails = async (req, res, next) => {
    try {
      const profile = req.user.jobseeker;
      const { _id, __v, ...rest } = profile.toJSON();
      res.json({
        profile: rest,
        user: {
          name: req.user.name,
          id: req.user._id,
          profilePicture: req.user.profilePicture,
          email: req.user.email,
          userType: Object.keys(Config.USERTYPES).find(
            (key) => Config.USERTYPES[key] === req.user.userType
          ),
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  getResume = async (req, res, next) => {
    try {
      const profile = req.user.jobseeker;
      const { _id, resume, __v, ...rest } = profile.toJSON();

      if (!resume) {
        return res.status(404).json({ message: "No resume Found." });
      }
      if (fs.existsSync(resume)) {
        res.download(resume, "resume.pdf", (err) => {
          if (err) {
            console.error("Error downloading the file:", err);
            res.status(500).json({ error: "Internal server error" });
          }
        });
      } else {
        res.status(404).json({ error: "No resume Found." });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  saveDetails = async (req, res, next) => {
    const { data } = req.body;
    const profile = req.user.jobseeker;

    if (!profile) {
      return res.sendStatus(403);
    }
    const { _id, __v, ...rest } = profile.toJSON();
    const [validatedData, err] = validateJobseekerProfile(data);

    if (err && err.length > 0) {
      return res.status(400).json({ error: err });
    }
    try {
      let result = await Jobseeker.findByIdAndUpdate(
        { _id: _id },
        { $set: validatedData },
        { new: true }
      ).lean();
      delete result._id;
      delete result.__v;
      res.status(201).json({
        profile: {
          ...result,
        },
        user: {
          name: req.user.name,
          id: req.user._id,
          email: req.user.email,
          profilePicture: req.user.profilePicture,
          userType: Object.keys(Config.USERTYPES).find(
            (key) => Config.USERTYPES[key] === req.user.userType
          ),
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  uploadResume = async (req, res) => {
    try {
      const string = req.file.path;
      const profile = req.user.jobseeker;

      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, __v, ...rest } = profile.toJSON();
      await Jobseeker.updateOne({ _id: _id }, { resume: string });
      res.status(200).json({
        userId: req.user._id,
        message: "Resume uploaded successfully.",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };
}

module.exports = new JobseekerController();
