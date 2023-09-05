const { validateEmployerCompany } = require("../../utils/validators");
const Company = require("../../models/company");
class CompanyController {
  fetchDetails = async (req, res, next) => {
    try {
      const profile = req.user.employer;
      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, __v, ...rest } = profile.toJSON();
      const details = await Company.findOne(
        {
          employer: _id,
        },
        { _id: false, user: false, __v: false }
      );
      res.json({
        company: details,
        profile: rest,
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
  saveDetails = async (req, res, next) => {
    try {
      const { data } = req.body;

      const [validatedData, err] = validateEmployerCompany(data);
      if (err && err.length > 0) {
        return res.status(400).json({ error: err });
      }
      const profile = req.user.employer;
      if (!profile) {
        return res.sendStatus(403);
      }
      const { _id, __v, ...rest } = profile.toJSON();
      const details = await Company.findOne({
        employer: _id,
      });
      if (details) {
        return res.status(400).json({ error: "Company details already exist" });
      }
      // Create a new company
      const companyObject = {
        ...validatedData,
        employer: _id,
      };
      const company = new Company(companyObject);

      await company.save();
      res.status(201).json({
        company: {
          ...company.toJSON(),
        },
        profile: rest,
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
  updateDetails = async (req, res, next) => {
    const { data } = req.body;
    const [validatedData, err] = validateEmployerCompany(data);
    if (err && err.length > 0) {
      return res.status(400).json({ error: err });
    }
    const profile = req.user.employer;
    if (!profile) {
      return res.sendStatus(403);
    }
    const { _id, __v, ...rest } = profile.toJSON();
    try {
      const fetchedCompany = await Company.findOne({
        employer: _id,
      });

      if (!fetchedCompany) {
        return res.status(400).json({ error: "Company details not available" });
      }

      let result = await Company.findByIdAndUpdate(
        { _id: fetchedCompany._id.toString() },
        { $set: { ...validatedData } },
        { new: true }
      ).lean();
      delete result.__v;
      res.status(201).json({
        company: {
          ...result,
        },
        profile: rest,
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
}

module.exports = new CompanyController();
