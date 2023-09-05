/* Routes */
const companyRouter = require("../routes/company.routes");
const employerProfileRouter = require("../routes/employer.profile.routes");
const employerCompanyRouter = require("../routes/employer.company.routes");
const jobEmployerRouter = require("../routes/employer.job.routes");
const jobRecruiterRouter = require("../routes/recruiter.job.routes");
const jobJobseekerRouter = require("../routes/jobseeker.job.routes");

const recruiterProfileRouter = require("../routes/recruiter.profile.routes");
const jobseekerProfileRouter = require("../routes/jobseeker.profile.routes");
const jobseekerSettingRouter = require("../routes/jobseeker.setting.routes");

const recruiterCandidateRouter = require("../routes/recruiter.candidate.routes");
const recruiterApplicationRouter = require("../routes/recruiter.application.routes");
const jobseekerApplicationRouter = require("../routes/jobseeker.application.routes");

const userRoutes = require("../routes/user.routes");

const authRouter = require("../routes/auth.routes");

class RoutesLoader {
  static initRoutes(app) {
    app.use(`/api/auth`, authRouter);
    app.use(`/api/user`, userRoutes);

    app.use(`/api/company`, companyRouter);

    app.use(`/api/employer/profile`, employerProfileRouter);
    app.use(`/api/recruiter/profile`, recruiterProfileRouter);
    app.use(`/api/jobseeker/profile`, jobseekerProfileRouter);

    app.use(`/api/employer/company`, employerCompanyRouter);
    app.use(`/api/employer/job`, jobEmployerRouter);

    app.use(`/api/recruiter/job`, jobRecruiterRouter);

    app.use(`/api/jobseeker/job`, jobJobseekerRouter);

    app.use(`/api/user`, userRoutes);

    app.use(`/api/recruiter/candidate`, recruiterCandidateRouter);
    app.use(`/api/recruiter/application`, recruiterApplicationRouter);
    app.use(`/api/jobseeker/application`, jobseekerApplicationRouter);

    app.use(`/api/jobseeker/setting`, jobseekerSettingRouter);

    app.use("/", async (req, res) => {
      res.status(404).send("No such route found in the API.");
    });
  }
}

module.exports = { RoutesLoader };
