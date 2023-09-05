const Employer = require("../../models/employer");
const Company = require("../../models/company");

const fetchCompanyData = async (req, res) => {
  const profile = req.user.employer;
  const { _id } = profile.toJSON();
  const company = await Company.findOne(
    { employer: _id },
    { _id: false, user: false, __v: false }
  );
  return company;
};

const handleIncluded = async (include, req, res) => {
  const includeArray =
    include && typeof include == "string" ? include.split(",") : null;
  if (!includeArray || includeArray.length < 1) {
    return null;
  }
  let companyData = {};
  if (includeArray.includes("company")) {
    companyData = await fetchCompanyData(req, res);
  }
  return { company: companyData };
};

module.exports = {
  handleIncluded,
};
