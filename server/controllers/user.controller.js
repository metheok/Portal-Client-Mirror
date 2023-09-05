// controllers/user.js
const fs = require("fs");
const path = require("path");
const { generateToken } = require("../utils/util");
const { Config } = require("../../configs/config");
const User = require("../models/user");
const uploadProfilePicture = async (req, res) => {
  try {
    const string = req.file.path;
    const userId = req.user._id;

    await User.updateOne({ _id: userId }, { profilePicture: string });
    res
      .status(200)
      .json({ userId, message: "Profile picture uploaded successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;
    fs.unlinkSync(path.join("uploads/image/", `${userId}.jpg`));
    // Update the user profile picture in the database (e.g., set the 'profilePicture' field to null)
    // For example:
    await User.updateOne({ _id: userId }, { profilePicture: null });
    res.status(200).json({ message: "Profile picture deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
const fetchUser = async (req, res, next) => {
  try {
    const employer = req.user.employer;

    const jobseeker = req.user.jobseeker;
    const recruiter = req.user.recruiter;
    if (!(employer || jobseeker || recruiter)) {
      return res.sendStatus(403);
    }
    const { _id: eid, __v: ev, ...restEmployer } = employer?.toJSON() || {};
    const { _id: jid, __v: jv, ...restJobseeker } = jobseeker?.toJSON() || {};
    const { _id: rid, __v: rv, ...restRecruiter } = recruiter?.toJSON() || {};
    const profile = { ...restEmployer, ...restJobseeker, ...restRecruiter };
    const userToken = generateToken({ _id: req.user._id });

    return res.status(200).json({
      userToken,
      user: {
        email: req.user.email,
        userType: Object.keys(Config.USERTYPES).find(
          (key) => Config.USERTYPES[key] === req.user.userType
        ),
        id: req.user._id,
        profilePicture: req.user.profilePicture,
      },
      profile,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  uploadProfilePicture,
  deleteProfilePicture,
  fetchUser,
};
