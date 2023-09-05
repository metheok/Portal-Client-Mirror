const {
  validateJobData,
  validateJobStatusEmployer,
} = require("../../utils/validators");
const Job = require("../../models/job");
const mongoose = require("mongoose");
class EmployerJobController {
  fetchAllJobs = async (req, res, next) => {
    try {
      const profile = req.user.employer;

      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, ...rest } = profile.toJSON();

      const statusParam = req.query.status;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const filter = { employer: _id };

      if (statusParam) {
        const statuses = statusParam.split(",").map((status) => status.trim());
        filter.$or = [{ status: { $in: statuses } }];
      }

      const totalCount = await Job.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);

      const details = await Job.find(filter, {
        _id: false,
        user: false,
        __v: false,
      })
        .skip((page - 1) * limit)
        .limit(limit);

      if (details.length === 0) {
        return res
          .status(404)
          .json({ message: "No jobs found with the specified status." });
      }

      res.json({
        jobs: details,
        user: {
          userType: req.user.userType,
          _id: req.user._id,
          email: req.user.email,
        },
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalCount,
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

      const job = await Job.findOne(
        { jobId: jobId },
        { _id: false, user: false, __v: false }
      );

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.status(200).json({
        job,
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
  updateDetails = async (req, res, next) => {
    const { data, status, jobId } = req.body;

    const [validatedData, err] = validateJobData(data);
    if (!jobId) {
      return res.status(400).json({ error: "Job ID not found" });
    }
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    }

    const [statusValidated, statusErr] = validateJobStatusEmployer(status);
    if (!statusValidated || (statusErr && statusErr.length > 0)) {
      return res.status(400).json({ error: statusErr });
    }

    const profile = req.user.employer;
    if (!profile) {
      return res.sendStatus(403);
    }
    const { _id, __v, ...rest } = profile.toJSON();
    try {
      const fetchedJob = await Job.findOne({ jobId: jobId });
      if (!fetchedJob) {
        return res.status(400).json({ error: "Job not found" });
      }

      if (fetchedJob.status !== "draft") {
        return res.status(400).json({
          error: [`Job edit is not authorized`],
        });
      }

      const updateData = {
        updatedAt: new Date(),
        ...validatedData,
        status: statusValidated,
        jobId: jobId,
      };

      let result = await Job.findByIdAndUpdate(
        { _id: fetchedJob._id.toString() },
        { $set: { ...updateData } },
        { new: true }
      ).lean();
      delete result._id;
      delete result.employer;
      delete result.__v;
      res.status(201).json({
        job: {
          ...result,
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
  saveDetails = async (req, res, next) => {
    try {
      const { data, status } = req.body;

      const [validatedData, err] = validateJobData(data);

      if (err.length > 0) {
        return res.status(400).json({ error: err });
      }
      const [statusValidated, statusErr] = validateJobStatusEmployer(status);
      if (!statusValidated || (statusErr && statusErr.length > 0)) {
        return res.status(400).json({ error: statusErr });
      }

      const profile = req.user.employer;
      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, __v, ...rest } = profile.toJSON();

      const jobId =
        Date.now().toString(16) +
        Math.floor(Math.random() * 10000).toString(16);

      // Create a new company
      const jobObject = {
        createdAt: new Date(),
        jobId: jobId,
        ...validatedData,
        status: statusValidated,
        employer: _id,
      };
      const job = new Job(jobObject);

      await job.save();

      res.status(201).json({
        job: {
          ...jobObject,
          status: statusValidated,
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
  updateJobStatus = async (req, res, next) => {
    const { status, jobId } = req.body;

    if (status !== "closed" && status !== "deleted" && status !== "draft") {
      return res.status(400).json({ error: "Invalid status" });
    }

    if (!jobId) {
      return res.status(400).json({ error: "Job ID not found" });
    }

    try {
      const fetchedJob = await Job.findOne({ jobId: jobId });

      if (!fetchedJob) {
        return res.status(400).json({ error: "Job not found" });
      }

      const updatedJob = await Job.findByIdAndUpdate(
        { _id: fetchedJob._id },
        { $set: { status: status } },
        { new: true }
      ).lean();

      const responseData = {
        job: {
          status: updatedJob.status,
          jobId: updatedJob.jobId,
        },
        user: {
          userType: req.user.userType,
          _id: req.user._id,
          email: req.user.email,
        },
      };

      res.status(201).json(responseData);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new EmployerJobController();
