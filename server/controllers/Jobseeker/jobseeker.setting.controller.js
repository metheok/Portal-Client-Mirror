const { validateJobseekerSetting } = require("../../utils/validators");
const Jobseeker = require("../../models/jobseeker");
const User = require("../../models/user");

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

  saveDetails = async (req, res, next) => {
    const { data } = req.body;
    const profile = req.user.jobseeker;

    if (!profile) {
      return res.sendStatus(403);
    }
    const { _id, __v, ...rest } = profile.toJSON();
    const [validatedData, err] = validateJobseekerSetting(data);
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
}

module.exports = new JobseekerController();
