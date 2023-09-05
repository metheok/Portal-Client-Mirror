const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: String,
  userType: Number, // 1 - Employer, // 2 - Recruiter // 3 - JobSeeker
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobseeker",
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  },
});

module.exports = mongoose.model("User", userSchema);
