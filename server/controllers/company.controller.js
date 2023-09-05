const Company = require("../models/company");
class CompanyController {
  fetchDetails = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const details = await Company.findOne(
        {
          user: userId,
        },
        { _id: false, user: false, __v: false }
      );
      res.json({
        data: {
          company: details,
          user: {
            name: req.user.name,
            email: req.user.email,
          },
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // saveDetails = async (req, res, next) => {
  //   try {
  //     const { company: data } = req.body;
  //     const [validatedData, err] = validateCompanyData(data);
  //     if (err) {
  //       return res.status(400).json({ error: err });
  //     }
  //     const userId = req.user._id;
  //     const details = await Company.findOne({
  //       user: userId,
  //     });
  //     if (details) {
  //       return res.status(400).json({ error: "Company details already exist" });
  //     }
  //     // Create a new company
  //     const companyObject = {
  //       ...validatedData,
  //       user: userId,
  //     };
  //     const company = new Company(companyObject);

  //     await company.save();
  //     res.status(201).json({
  //       data: {
  //         company: {
  //           ...validatedData,
  //         },
  //       },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };
  // updateDetails = async (req, res, next) => {
  //   const { company: data } = req.body;
  //   const [validatedData, err] = validateCompanyData(data);
  //   if (err) {
  //     return res.status(400).json({ error: err });
  //   }
  //   const userId = req.user._id;
  //   try {
  //     const fetchedCompany = await Company.findOne({
  //       user: userId,
  //     });

  //     if (!fetchedCompany) {
  //       return res.status(400).json({ error: "Company details not available" });
  //     }

  //     let result = await Company.findByIdAndUpdate(
  //       { _id: fetchedCompany._id.toString() },
  //       { $set: { ...validatedData } },
  //       { new: true }
  //     ).lean();
  //     delete result._id;
  //     delete result.user;
  //     delete result.__v;
  //     res.status(201).json({
  //       data: {
  //         company: {
  //           ...result,
  //         },
  //       },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };
}

module.exports = new CompanyController();
