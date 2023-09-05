const mongoose = require("mongoose");
const employerSchema = new mongoose.Schema({
  name: String,
  profilePicture: String,
  dob: Date,
  designation: String,
  city: String,

  socialMediaLinks: [Object],
  contactPersonName: String,
  contactNumber: String,
  contactEmail: String,
  contactDesignation: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  //company details seperate schema
});

module.exports = mongoose.model("Employer", employerSchema);
