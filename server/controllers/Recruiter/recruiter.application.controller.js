const {
  validateJobseekerProfile,
  validateCandidateUserData,
  validateRecruiterApplicationData,
} = require("../../utils/validators");
const Jobseeker = require("../../models/jobseeker");
const Job = require("../../models/job");

const User = require("../../models/user");
const Application = require("../../models/application");

const { Config } = require("../../../configs/config");

class RecruiterCandidateController {
  createApplication = async (req, res, next) => {
    try {
      const { data } = req.body;

      const profile = req.user.recruiter;
      if (!profile) {
        return res.sendStatus(403);
      }
      let jobseekerId;
      const recruiterId = profile._id.toString();

      const { candidateData, applicationData } = data;
      let employerId = null;

      if (!applicationData.job) {
        return res.status(400).json({ message: "Job id not provided" });
      }
      const job = Job.findOne({ jobId: applicationData.job });
      if (!job) {
        return res.status(400).json({ message: "Job not found" });
      }

      employerId = job.employer.toString();
      const {
        profile: candidateProfile,
        user: userData,
        newUser: createNewUser,
      } = candidateData;

      if (createNewUser) {
        const [validatedUserData, errUser] = await validateCandidateUserData(
          userData
        );
        const [validatedCandidateData, err] =
          validateJobseekerProfile(candidateProfile);

        if (errUser && errUser.length > 0) {
          return res.status(400).json({ error: errUser });
        }
        if (err && err.length > 0) {
          return res.status(400).json({ error: err });
        }
        if (!validatedUserData.email) {
          return res.status(400).json({ error: "No email present" });
        }
        const userPresent = await User.findOne({
          email: validatedUserData.email,
        });

        if (userPresent) {
          return res
            .status(400)
            .json({ error: "Account with email ID already exists" });
        }
        const { _id, __v, referredId, ...rest } = profile.toJSON();

        const newProfileData = await new Jobseeker({
          ...validatedCandidateData,
          referralId: referredId,
        }).save();
        jobseekerId = newProfileData._id.toString();
        await new User({
          createdAt: new Date(),
          ...validatedUserData,
          ...{ employer: null, recruiter: null, jobseeker: jobseekerId },
        }).save();
      } else {
        jobseekerId = candidateProfile._id;
      }
      const [validatedApplicationData, applErrors] =
        validateRecruiterApplicationData({
          ...applicationData,
          ...{
            jobseeker: jobseekerId,
            status: "referred",
            statusArray: ["referred"],

            employer: employerId,
            recruiter: recruiterId,
          },
        });

      if (applErrors && applErrors.length > 0) {
        return res.status(400).json({ error: applErrors });
      }
      const newApplication = await new Application({
        ...validatedApplicationData,
        createdAt: new Date(),
      }).save();
      res.status(201).json({
        createdApplication: newApplication,
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
  fetchAJobseekerByEmail = async (req, res, next) => {
    try {
      const email = req.params.email;
      const profile = req.user.recruiter;

      if (!profile || !profile.referredId) {
        return res.status(403).json({ message: "not authourized" });
      }
      const selfReferredId = profile.referredId;
      const candidate = await User.findOne(
        { email: email },
        { _id: false, __v: false }
      ).populate("jobseeker");
      if (!candidate) {
        return res.status(200).json({
          message: "User of the email address does not exist",
          code: 100,
        });
      }
      if (candidate.userType !== 3) {
        return res.status(400).json({
          message: "Email already exists for user other than a jobseeker",
          code: 200,
        });
      }
      if (!(candidate?.jobseeker?.referralId == selfReferredId)) {
        return res.status(400).json({
          message:
            "Jobseeker of email with different referral ID that yours is already present",
          code: 201,
        });
      }
      const { __v, ...rest } = candidate.jobseeker.toJSON();
      return res.status(200).json({
        message: "Jobseeker with given email id and referred by you exists",
        code: 101,
        applicant: {
          user: {
            id: candidate._id,
            email: candidate.email,
            userType: Object.keys(Config.USERTYPES).find(
              (key) => Config.USERTYPES[key] === candidate.userType
            ),
          },
          profile: { ...rest },
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
  uploadCoverLetter = async (req, res) => {
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
        message: "Cover Letter uploaded successfully.",
        file: string,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };
}

module.exports = new RecruiterCandidateController();
