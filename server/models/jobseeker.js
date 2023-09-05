const mongoose = require("mongoose");
const jobseekerSchema = new mongoose.Schema({
  nameTitle: String,
  name: String,
  dob: Date,
  referralId: String,
  currentCity: String,
  education: [
    {
      degree: String,
      yearOfPassing: String,
      institute: String,
    },
  ],
  isExperienced: Boolean,
  experience: [
    {
      organizationName: String,
      designation: String,
      responsibilities: String,
      relievingDate: String,
      joiningDate: String,
      isCurrentlyWorking: Boolean,
    },
  ],
  skills: [
    {
      skill: String,
      experience: String,
      description: String,
    },
  ],
  openToRelocate: Boolean,
  openToRemoteWork: Boolean,
  openToBringYourOwnDevice: Boolean,
  currentCtc: Number,
  minimumCtc: Number,
  openToShift: Boolean,
  passport: Boolean,
  validityPassport: String,
  resume: String,
  contactDetails: {
    currentCity: String,
    email: String,
    contact: String,
    alternateNo: String,
  },
  makeProfilePublic: Boolean,
  makeProfilePrivate: Boolean,
  makeProfileAnonymous: Boolean,
  jobSearchAlerts: Boolean,
  desktopNotification: Boolean,
  emailNotification: Boolean,
  totalExperience: String,
  favouriteJobs: Array
});

module.exports = mongoose.model("Jobseeker", jobseekerSchema);
