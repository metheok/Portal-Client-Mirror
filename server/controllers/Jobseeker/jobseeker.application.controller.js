const { validateJobseekerApplicationData } = require("../../utils/validators");

const Application = require("../../models/application");
const Recruiter = require("../../models/recruiter");
const Job = require("../../models/job");

const { Config } = require("../../../configs/config");

class JobseekerCandidateController {
  createApplication = async (req, res, next) => {
    try {
      const { data } = req.body;
      const { applicationData } = data;

      const profile = req.user.jobseeker;
      if (!profile) {
        return res.sendStatus(403);
      }
      const jobseekerId = profile._id.toString();
      const recruiter = Recruiter.findOne({ referredId: profile.referralId });
      let recruiterId = null,
        employerId = null;
      if (recruiter) {
        recruiterId = recruiter._id.toString();
      }
      if (!applicationData.job) {
        return res.status(400).json({ message: "Job id not provided" });
      }
      const job = Job.findOne({ jobId: applicationData.job });
      if (!job) {
        return res.status(400).json({ message: "Job not found" });
      }

      if (!profile.referralId) {
        return res.sendStatus(403);
      }
      const recruiterData = await Recruiter.findOne({
        referredId: profile.referralId,
      });
      if (recruiterData) {
        recruiterId = recruiterData._id.toString();
      }
      employerId = job.employer.toString();

      const [validatedApplicationData, applErrors] =
        validateJobseekerApplicationData({
          ...applicationData,
          ...{ jobseeker: jobseekerId, recruiter: recruiterId },
          ...{
            jobseeker: jobseekerId,
            recruiter: recruiterId,
            employer: employerId,
            status: "applied",
            statusArray: ["applied"],
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

  uploadResume = async (req, res) => {
    try {
      const string = req.file.path;
      const profile = req.user.jobseeker;

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
      const profile = req.user.jobseeker;

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

module.exports = new JobseekerCandidateController();
