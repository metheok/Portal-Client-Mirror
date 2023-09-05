const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now },
  jobId: String,
  jobTitle: String,
  workplaceType: String,
  country: String,
  city: String,
  status: String, //live, paused, closed,under-review, draft
  jobType: String,
  description: String,
  responsibilities: String,
  qualifications: String,
  minimumRequirements: [
    {
      skill: String,
      experience: String,
    },
  ],
  screeningQuestions: [
    {
      question: String,
      answerType: String,
      mustHave: Boolean,
      idealAnswer: String,
    },
  ],
  annualCtcRange: String,
  minimumCtc: Number,
  maximumBudget: Number,
  NoOfVacancies: Number,
  NoOfApplications: Number,
  FulFillmentPayoutType: String,
  FulFillmentPayout: Number,
  totalExperience: Number,
});

module.exports = mongoose.model("Job", jobSchema);
