const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },
  companyName: String,
  industry: String,
  description: String,
  website: String,
  employeeStrength: Number,

  contactDetails: [
    {
      title: String,
      name: String,
      number: String,
      email: String,
      designation: String,
    },
  ],
  //company
  companyType: String,
  companyRegistrationNumber: String,
  companyYearOfRegistration: Number,
  companyGst: String,
  companyLastYearTurnover: String,
  registeredAddressLine1: String,
  registeredAddressLine2: String,
  registeredAddressCountry: String,
  registeredAddressCity: String,
  registeredAddressPin: String,
  registeredAddressState: String,

  offices: [
    {
      addressType: String,
      address1: String,
      address2: String,
      country: String,
      city: String,
      state: String,
      pin: String,
      number: String,
      email: String,
    },
  ],
});

module.exports = mongoose.model("Company", companySchema);
