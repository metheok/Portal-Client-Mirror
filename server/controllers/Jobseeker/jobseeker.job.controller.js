const {
    validateJobData,
    validateJobStatusEmployer,
} = require("../../utils/validators");
const Job = require("../../models/job");
const Jobseeker = require("../../models/jobseeker");
const Company = require('../../models/company')
const Recruiter = require("../../models/recruiter")
const mongoose = require("mongoose");
class JobseekerJobController {
    
    fetchAllJobs = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.search || '';
            const cityFilter = req.query.city || '';
            const skillsFilter = req.query.skills || '';
            const sortType = req.query.sort || '';
    
            const query = {
                status: "live"
            };
    
            if (searchQuery) {
                query.jobTitle = { $regex: searchQuery, $options: 'i' };
            }
    
            if (cityFilter) {
                query.city = { $regex: cityFilter, $options: 'i' };
            }
    
            if (skillsFilter) {
                const skillsArray = skillsFilter.split(',').map(skill => skill.trim()); // Split skills and trim whitespace
                query['minimumRequirements.skill'] = { $in: skillsArray.map(skill => new RegExp(`^${skill}$`, 'i')) };
            }
    
            const totalJobsCount = await Job.countDocuments(query);
            const totalPages = Math.ceil(totalJobsCount / limit);
    
            const startIndex = (page - 1) * limit;
    
            let detailsQuery = Job.find(query, {
                _id: false,
                user: false,
                __v: false,
            }).skip(startIndex).limit(limit);
    
            if (sortType === 'time') {
                detailsQuery = detailsQuery.sort({ createdAt: -1 });
            } else if (sortType === 'experience') {
                detailsQuery = detailsQuery.sort({ totalExperience: -1 });
            }
    
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
    
    
    
    favouriteJob = async (req, res, next) => {
        try {
            const { jobId } = req.body;
            const profile = req.user.jobseeker;
    
            if (!profile) {
                return res.sendStatus(403);
            }
    
            const { _id, __v, ...rest } = profile.toJSON();
            const jobseeker = await Jobseeker.findOne({ _id: _id });
    
            if (!jobseeker) {
                return res.status(404).json({ message: "Jobseeker not found." });
            }
    
            if (!("favouriteJobs" in jobseeker)) {
                jobseeker.favouriteJobs = [];
            }
    
            const existingJobIndex = jobseeker.favouriteJobs.findIndex(
                (job) => job.jobId === jobId
            );
    
            if (existingJobIndex !== -1) {
                return res
                    .status(400)
                    .json({ message: "Job is already saved as favourite by this jobseeker." });
            }
    
            jobseeker.favouriteJobs.push({ jobId: jobId });
    
            await jobseeker.save();
    
            res.json({ message: "Job saved as favourite successfully.", jobseeker });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    unfavouriteJob = async (req, res, next) => {
        try {
            const jobId = req.params.id;
            const profile = req.user.jobseeker;
    
            if (!profile) {
                return res.sendStatus(403);
            }
    
            const { _id } = profile.toJSON();
            const jobseeker = await Jobseeker.findOne({ _id });
    
            if (!jobseeker) {
                return res.status(404).json({ message: "Jobseeker not found." });
            }
    
            if (!("favouriteJobs" in jobseeker)) {
                jobseeker.favouriteJobs = [];
            }
    
            const existingJobIndex = jobseeker.favouriteJobs.findIndex(
                (job) => job.jobId === jobId
            );
    
            if (existingJobIndex === -1) {
                return res
                    .status(400)
                    .json({ message: "Job is not saved as favourite by this jobseeker." });
            }
    
            jobseeker.favouriteJobs.splice(existingJobIndex, 1);
    
            await jobseeker.save();
    
            res.json({ message: "Job removed from favourite successfully.", jobseeker });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    
    fetchById = async (req, res, next) => {
        try {
            const jobId = req.params.id;
            const profile = req.user.jobseeker;
    
            if (!profile) {
                return res.sendStatus(403);
            }
    
            const job = await Job.findOne({ jobId: jobId })
                .select('-FulFillmentPayout -FulFillmentPayoutType -NoOfApplications -NoOfVacancies -annualCtcRange -maximumBudget -minimumCtc')
                .exec();
    
            if (!job) {
                return res.status(404).json({ message: "Job not found." });
            }
    
            const employer = job.employer;
    
            const company = await Company.findOne({ employer: employer });
    
            res.json({ message: "Job fetched successfully.", job, company });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    

}

module.exports = new JobseekerJobController();
