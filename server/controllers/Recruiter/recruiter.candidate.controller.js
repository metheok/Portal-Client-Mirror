const {
  validateJobseekerProfile,
  validateCandidateUserData,
} = require("../../utils/validators");
const Jobseeker = require("../../models/jobseeker");
const User = require("../../models/user");

const { Config } = require("../../../configs/config");

class RecruiterCandidateController {
  createACandidate = async (req, res, next) => {
    const { data } = req.body;

    const profile = req.user.recruiter;
    const { user: userData, candidateProfile } = data;
    if (!profile) {
      return res.sendStatus(403);
    }
    const { _id, __v, referredId, ...rest } = profile.toJSON();
    const [validatedCandidateData, err] =
      validateJobseekerProfile(candidateProfile);
    if (err && err.length > 0) {
      return res.status(400).json({ error: err });
    }
    const [validatedUserData, errUser] = await validateCandidateUserData(
      userData
    );
    if (!validatedUserData.email) {
      return res.status(400).json({ error: "No email present" });
    }
    const userPresent = User.findOne({ email: validatedUserData.email });
    if (userPresent) {
      return res
        .status(400)
        .json({ error: "Account with email ID already exists" });
    }
    if (errUser && errUser.length > 0) {
      return res.status(400).json({ error: errUser });
    }
    try {
      let newProfileData = await new Jobseeker({
        ...validatedCandidateData,
        referralId: referredId,
      }).save();
      const jobseekerId = newProfileData._id.toString();
      const newUser = new User({
        createdAt: new Date(),
        ...validatedUserData,
        ...{ employer: null, recruiter: null, jobseeker: jobseekerId },
      });

      const userNew = await newUser.save();
      delete newProfileData._id;
      delete newProfileData.__v;
      res.status(201).json({
        createdCandicate: {
          user: {
            email: userNew.email,
            _id: userNew._id.toString(),
            userType: Object.keys(Config.USERTYPES).find(
              (key) => Config.USERTYPES[key] === userNew.userType
            ),
          },
          profile: { ...newProfileData },
        },
        user: {
          id: req.user._id,
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
  fetchACandidate = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const profile = req.user.recruiter;

      const candidate = await Jobseeker.findById(
        { _id: _id },
        { _id: false, __v: false }
      );

      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      if(profile.referredId!==candidate.referralId) {
        return res.status(404).json({ message: "Candidate not referred by recruiter" });
      }

      res.status(200).json({
        candidate,
        user: {
          userType: req.user.userType,
          _id: req.user._id,
          email: req.user.email,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  getEmailValidity = async (req, res, next) => {
    try {
      const email = req.params.email;
      if (!email) {
        return res.status(400).json({ message: "no email given" });
      }
      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res
          .status(404)
          .json({ message: "User with email already exists", isValid: false });
      }

      res.status(200).json({
        user: {
          _id: req.user._id,
          email: req.user.email,
        },
        isValid: true,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  uploadResume = async (req, res) => {
    try {
      const string = req.file.path;
      const profile = req.user.recruiter;

      if (!profile) {
        return res.sendStatus(403);
      }
      if (!string) {
        throw "failed to upload";
      }

      res.status(200).json({
        userId: req.user._id,
        message: "Resume uploaded successfully.",
        file: string,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };

  fetchReferredCandidates = async (req, res, next) => {
    try {
      const profile = req.user.recruiter;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const searchQuery = req.query.search || '';
      const cityFilter = req.query.city || '';
      const sortType = req.query.sort || '';
  
      const query = {
        referralId: profile.referredId
      }
  
      if (searchQuery) {
        query.name = { $regex: searchQuery, $options: 'i' };
      }
  
      if (cityFilter) {
        query.currentCity = { $regex: cityFilter, $options: 'i' };
      }
  
      const candidatesCountQuery = Jobseeker.countDocuments({ referralId: profile.referredId });
  
      const totalCandidatesCount = await candidatesCountQuery;
  
      const totalPages = Math.ceil(totalCandidatesCount / limit);
  
      const candidatesQuery = Jobseeker.find(
        query,
        { __v: false }
      );
  
      if (sortType === 'time') {
        candidatesQuery.sort({ createdAt: -1 });
      } else if (sortType === 'experience') {
        candidatesQuery.sort({ totalExperience: -1 });
      }
  
      candidatesQuery.skip((page - 1) * limit).limit(limit);
  
      const candidates = await candidatesQuery;
  
      if (candidates.length === 0) {
        return res.status(404).json({ message: "No candidates found." });
      }
  
      res.status(200).json({
        candidates,
        user: {
          userType: req.user.userType,
          _id: req.user._id,
          email: req.user.email,
        },
        pagination: {
          totalCandidates: totalCandidatesCount,
          totalPages,
          currentPage: page,
          candidatesPerPage: limit,
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
}

module.exports = new RecruiterCandidateController();
