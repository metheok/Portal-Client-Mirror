const multer = require("multer");
const fs = require("fs");
const shortUUID = require("short-uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilePicture") {
      fs.mkdir("./uploads/image", (err) => {
        cb(null, "./uploads/image");
      });
    }
    if (file.fieldname === "jobseekerResume") {
      fs.mkdir("./uploads/jobseekerResume", (err) => {
        cb(null, "./uploads/jobseekerResume");
      });
    }
    if (file.fieldname === "candidateResume") {
      fs.mkdir("./uploads/jobseekerResume", (err) => {
        cb(null, "./uploads/jobseekerResume");
      });
    }
    if (file.fieldname === "recruiterApplicantResume") {
      fs.mkdir("./uploads/jobseekerResume", (err) => {
        cb(null, "./uploads/jobseekerResume");
      });
    }
    if (file.fieldname === "recruiterApplicantCover") {
      fs.mkdir("./uploads/applicantCoverLetter", (err) => {
        cb(null, "./uploads/applicantCoverLetter");
      });
    }
    if (file.fieldname === "jobseekerApplicantResume") {
      fs.mkdir("./uploads/jobseekerResume", (err) => {
        cb(null, "./uploads/jobseekerResume");
      });
    }
    if (file.fieldname === "jobseekerApplicantCover") {
      fs.mkdir("./uploads/applicantCoverLetter", (err) => {
        cb(null, "./uploads/applicantCoverLetter");
      });
    }
  },
  filename: (req, file, cb) => {
    const userId = req.user._id;
    let fileName = "";
    if (
      file.fieldname === "candidateResume" ||
      file.fieldname === "recruiterApplicantCover" ||
      file.fieldname === "recruiterApplicantResume" ||
      file.fieldname === "jobseekerApplicantCover" ||
      file.fieldname === "jobseekerApplicantResume"
    ) {
      fileName = `${shortUUID.generate()}.${file.originalname
        .split(".")
        .pop()}`;
    } else {
      fileName = `${userId}.${file.originalname.split(".").pop()}`;
    }

    cb(null, fileName);
  },
});

const fileFilter = function (req, file, cb) {
  let allowedTypes = [];

  if (file.fieldname === "profilePicture") {
    allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  }
  if (file.fieldname === "jobseekerResume") {
    allowedTypes = ["application/pdf"];
  }
  if (
    file.fieldname === "candidateResume" ||
    file.fieldname === "recruiterApplicantResume" ||
    file.fieldname === "recruiterApplicantCover" ||
    file.fieldname === "jobseekerApplicantResume" ||
    file.fieldname === "jobseekerApplicantCover"
  ) {
    allowedTypes = ["application/pdf"];
  }
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, and PDF files are allowed."
      )
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4, // Limit file size to 4MB (adjust as needed)
  },
  fileFilter: fileFilter,
});

module.exports = { upload };
