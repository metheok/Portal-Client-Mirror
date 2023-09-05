const {
  validateJobData,
  validateJobStatusEmployer,
} = require("../../utils/validators");
const Job = require("../../models/job");
const Company = require("../../models/company");
const Recruiter = require("../../models/recruiter");
const Application = require("../../models/application");
class RecruiterJobController {
  fetchAllJobs = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const searchQuery = req.query.search || "";
      const cityFilter = req.query.city || "";
      const sortType = req.query.sort || "";
      const type =
        req.query.type &&
        ["referred", "marked", "referred-closed"].includes(req.query.type)
          ? req.query.type
          : "";
      const status =
        req.query.status &&
        ["under-review", "draft", "closed", "paused", "live"].includes(
          req.query.status
        )
          ? req.query.status
          : "live";
      const profile = req.user.recruiter;

      let query = {
        status,
      };
      let sortQuery = {};
      if (type === "referred") {
        let allJobsWithApplicationId = await Application.find({
          recruiter: profile._id.toString(),
        });
        allJobsWithApplicationId =
          allJobsWithApplicationId && allJobsWithApplicationId.length > 0
            ? allJobsWithApplicationId.map((each) => each.job)
            : [];

        query._id = { $in: allJobsWithApplicationId };
      }
      if (type === "marked") {
        const markedJobsArr =
          profile.markedJobs && profile.markedJobs.length > 0
            ? profile.markedJobs.map((x) => x.jobId)
            : [];
        query.jobId = { $in: markedJobsArr };
      }
      if (type === "referred-closed") {
        let allJobsWithApplicationId = await Application.find({
          recruiter: profile._id.toString(),
        });
        allJobsWithApplicationId =
          allJobsWithApplicationId && allJobsWithApplicationId.length > 0
            ? allJobsWithApplicationId.map((each) => each.job)
            : [];

        query._id = { $in: allJobsWithApplicationId };
        query.status = "closed";
      }
      if (sortType === "time") {
        sortQuery.createdAt = -1;
      }
      if (sortType === "experience") {
        sortQuery.totalExperience = -1;
      }

      if (searchQuery) {
        query.jobTitle = { $regex: searchQuery, $options: "i" };
      }

      if (cityFilter) {
        query.city = { $regex: cityFilter, $options: "i" };
      }

      const totalJobsCount = await Job.countDocuments(query);
      const totalPages = Math.ceil(totalJobsCount / limit);

      const startIndex = (page - 1) * limit;

      let detailsQuery = Job.find(query, {
        _id: false,
        user: false,
        __v: false,
      })
        .sort(sortQuery)
        .skip(startIndex)
        .limit(limit);

      const details = await detailsQuery;
      if (details.length === 0) {
        return res.status(404).json({ message: "No jobs found." });
      }

      res.json({
        jobs: details,
        pagination: {
          totalJobs: totalJobsCount,
          totalPages,
          currentPage: page,
          jobsPerPage: limit,
        },
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

  fetchById = async (req, res, next) => {
    try {
      const jobId = req.params.id;
      const profile = req.user.recruiter;

      if (!profile) {
        return res.sendStatus(403);
      }

      const job = await Job.findOne({ jobId: jobId });

      const employer = job.employer;

      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }

      const company = await Company.findOne({ employer: employer });

      res.json({ message: "Job fetched successfully.", job, company });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  markJob = async (req, res, next) => {
    try {
      const { jobId } = req.body;
      const profile = req.user.recruiter;

      if (!profile) {
        return res.sendStatus(403);
      }

      const { _id, __v, ...rest } = profile.toJSON();
      const recruiter = await Recruiter.findOne({ _id: _id });

      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found." });
      }

      if (!"markedJobs" in recruiter) {
        recruiter.markedJobs = [];
      }

      const existingJobIndex = recruiter.markedJobs.findIndex(
        (job) => job.jobId === jobId
      );

      if (existingJobIndex !== -1) {
        return res
          .status(400)
          .json({ message: "Job is already marked by this recruiter." });
      }

      recruiter.markedJobs.push({ jobId: jobId });

      await recruiter.save();

      res.json({ message: "Job marked successfully.", recruiter });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  unmarkJob = async (req, res, next) => {
    try {
      const jobId = req.params.id;
      const profile = req.user.recruiter;

      if (!profile) {
        return res.sendStatus(403);
      }

      const { _id } = profile.toJSON();
      const recruiter = await Recruiter.findOne({ _id });

      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found." });
      }

      if (!"markedJobs" in recruiter) {
        recruiter.markedJobs = [];
      }

      const existingJobIndex = recruiter.markedJobs.findIndex(
        (job) => job.jobId === jobId
      );

      if (existingJobIndex === -1) {
        return res
          .status(400)
          .json({ message: "Job is not marked by this recruiter." });
      }

      recruiter.markedJobs.splice(existingJobIndex, 1);

      await recruiter.save();

      res.json({ message: "Job unmarked successfully.", recruiter });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new RecruiterJobController();
