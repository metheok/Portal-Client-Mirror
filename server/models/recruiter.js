const mongoose = require("mongoose");
const recruiterSchema = new mongoose.Schema({
  name: String,
  username: String,
  contactEmail: String,
  profilePicture: String,
  dob: Date,
  referredId: { type: String, required: true, unique: true },
  contactNumber: String,
  altContactNumber: String,
  altEmail: String,
  nomineeName: String,
  nomineeEmail: String,
  nomineeContactNumber: String,
  nomineeAltContactNumber: String,
  bank: {
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    ifsc: String,
    upi: String,
  },
  markedJobs: Array
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
