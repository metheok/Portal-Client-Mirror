const {
  hashPassword,
  generateToken,
  comparePassword,
  getTimestampBasedString,
} = require("../utils/util");
const { validateUserData, emailFormatValid } = require("../utils/validators");

const User = require("../models/user");
const Employer = require("../models/employer");
const Recruiter = require("../models/recruiter");
const Jobseeker = require("../models/jobseeker");
const { Config } = require("../../configs/config");
const { handleIncluded } = require("./Employer/helpers");
class AuthController {
  //signup user

  signup = async (req, res, next) => {
    const { email, name, password, userType, referralId } = req.body;
    // return res.status(400).json({ message: "Arguments not provided" });

    if (!email || !password || !name || !userType) {
      return res.status(400).json({ message: "Arguments not provided" });
    }
    const [validatedData, err] = validateUserData({
      email,
      password,
      name,
      userType,
    });

    if (err && err.length > 0) {
      return res
        .status(400)
        .json({ errors: err, message: "Data validation error" });
    }
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(409)
          .json({ message: "User with email already exists" });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      let userData = { employer: null, recruiter: null, jobseeker: null };
      let profileData = null;
      if (validatedData.userType === 1) {
        profileData = await new Employer({ name }).save();
        userData.employer = profileData._id;
      } else if (validatedData.userType === 2) {
        profileData = await new Recruiter({
          name,
          referredId: getTimestampBasedString(),
        }).save();
        userData.recruiter = profileData._id;
      } else if (validatedData.userType === 3) {
        let referralFound = false;
        if (referralId) {
          if (
            typeof referralId == "string" &&
            referralId.length > 0 &&
            referralId.length < 32
          ) {
            const found = await Recruiter.findOne({ referredId: referralId });
            if (!found) {
              return res
                .status(400)
                .json({ errors: err, message: "Referral ID incorrect" });
            }
            referralFound = true;
          } else {
            return res
              .status(400)
              .json({ errors: err, message: "Data validation error" });
          }
        }
        profileData = await new Jobseeker({
          name,
          referralId: referralFound ? referralId : null,
        }).save();
        userData.jobseeker = profileData._id;
      }

      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        createdAt: new Date(),
        userType: validatedData.userType,
        ...userData,
      });
      const userNew = await newUser.save();

      const userToken = generateToken({ _id: userNew._id.toString() });
      res.json({ userToken });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  //login user

  login = async (req, res, next) => {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Arguments not provided" });
    }

    if (emailFormatValid(email)) {
      return res.status(400).json({ errors: ["email format invalid"] });
    }
    try {
      // Find the provider in the database
      const user = await User.findOne({ email: email })
        .populate("employer")
        .populate("recruiter")
        .populate("jobseeker");
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // Compare the password with the stored hash
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials pass" });
      }

      let profile = user.employer || user.recruiter || user.jobseeker;

      profile = profile.toJSON();
      delete profile._id;
      const userToken = generateToken({ _id: user._id.toString() }, rememberMe);
      res.status(201).json({
        userToken,
        user: {
          email: user.email,
          _id: user._id,
          userType: Object.keys(Config.USERTYPES).find(
            (key) => Config.USERTYPES[key] === user.userType
          ),
          profilePicture: user.profilePicture,
        },
        profile,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      const { email, oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Arguments not provided" });
      }
      const [validatedData, err] = validateUserData({
        password: newPassword,
      });

      if (err && err.length > 0) {
        return res.status(400).json({ errors: err });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.sendStatus(403);
      }
      const passwordMatch = await comparePassword(oldPassword, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials pass" });
      }
      const hashedPassword = await hashPassword(newPassword);
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });

      return res.status(200).json({
        user: {
          email: user.email,
          userType: Object.keys(Config.USERTYPES).find(
            (key) => Config.USERTYPES[key] === user.userType
          ),
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
module.exports = new AuthController();
