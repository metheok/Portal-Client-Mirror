const Employer = require("../../models/employer");
const User = require("../../models/user");

const { handleIncluded } = require("./helpers");
const { validateEmployerProfile } = require("../../utils/validators");
const { Config } = require("../../../configs/config");
class EmployerController {
  fetchDetails = async (req, res, next) => {
    try {
      const profile = req.user.employer;
      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, __v, ...rest } = profile.toJSON();
      const { include } = req.query || {};
      const includedData = await handleIncluded(include, req, res);
      res.json({
        profile: rest,
        include: includedData,
        user: {
          name: req.user.name,
          id: req.user._id,
          email: req.user.email,
          userType: Object.keys(Config.USERTYPES).find(
            (key) => Config.USERTYPES[key] === req.user.userType
          ),
          profilePicture: req.user.profilePicture,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  saveDetails = async (req, res, next) => {
    const { data } = req.body;
    const profile = req.user.employer;
    if (!profile) {
      return res.sendStatus(403);
    }
    const { _id, __v, ...rest } = profile.toJSON();

    const [validatedData, err] = validateEmployerProfile(data);
    if (err && err.length > 0) {
      return res.status(400).json({ error: err });
    }

    try {
      let result = await Employer.findByIdAndUpdate(
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
      if (e?.code == 11000 && e?.keyPattern.email) {
        res.status(409).json({ message: "Email Already exists" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new EmployerController();
