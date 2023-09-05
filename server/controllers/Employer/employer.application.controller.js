const { validateEmployerCompany } = require("../../utils/validators");
const Application = require("../../models/company");
class CompanyController {
  fetchApplications = async (req, res, next) => {
    try {
      const profile = req.user.employer;
      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, ...rest } = profile.toJSON();

      const status = req.query.status;
      const job = req.query.job;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const filter = { employer: _id };

      if (status) {
        const statuses = status.split(",").map((status) => status.trim());

        filter.$or = [{ status: { $in: statuses } }];
      }
      if (job) {
        const jobs = job.split(",").map((job) => job.trim());

        filter.$or = [{ jobs: { $in: jobs } }];
      }

      const totalCount = await Application.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);

      const details = await Application.find(filter, {
        __v: false,
      })
        .skip((page - 1) * limit)
        .limit(limit);

      if (details.length === 0) {
        return res.status(404).json({
          message: "No applications found with the specified status.",
        });
      }

      res.json({
        applications: details,
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
  fetchAnApplication = async (req, res, next) => {
    try {
      const appId = req.params.id;
      const profile = req.user.employer;
      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, __v, ...rest } = profile.toJSON();
      const details = await Application.findOne(
        {
          employer: _id,
          _id: appId,
        },
        { __v: false }
      );
      res.json({
        application: details,
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

  updateApplication = async (req, res, next) => {
    const id = req.params.id;
    const { data } = req.body;
  };
}

module.exports = new CompanyController();
