const { Config } = require("../../configs/config");
const { hashPassword } = require("./util");
const generator = require("generate-password");
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const NAME_RE = /^[a-zA-Z ]{5,300}$/i;
const PASSWORD_RE =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).{8,21}$/;
const emailFormatValid = (value) => {
  return value && EMAIL_RE.test(value) ? false : "email invalid format";
};

const passwordFormatValid = (value) => {
  return value && PASSWORD_RE.test(value) ? false : "password invalid format";
};

const nameFormatValid = (value) => {
  return value && NAME_RE.test(value) ? false : "name invalid format";
};
const userTypeValid = (value) => {
  return Config.USERTYPES[value] ? Config.USERTYPES[value] : false;
};
const validateCompanyData = (data) => {
  if (data && data.companyName && typeof data.companyName != "string") {
    return [["type error"], null];
  }
  return [data, null];
};
const validateJobData = (data) => {
  if (
    (data.jobTitle && typeof data.jobTitle != "string") ||
    (data.workplaceType && typeof data.workplaceType != "string") ||
    (data.country && typeof data.country != "string") ||
    (data.city && typeof data.city != "string") ||
    (data.jobType && typeof data.jobType != "string") ||
    (data.description && typeof data.description != "string") ||
    (data.responsibilties && typeof data.responsibilties != "string") ||
    (data.qualifications && typeof data.qualifications != "string") ||
    (data.minimumRequirements && !Array.isArray(data.minimumRequirements)) ||
    (data.screeningQuestions && !Array.isArray(data.screeningQuestions)) ||
    (data.annualCtcRange && typeof data.annualCtcRange != "string") ||
    (data.minimumCtc && typeof data.minimumCtc != "number") ||
    (data.maximumBudget && typeof data.maximumBudget != "number") ||
    (data.NoOfVacancies && typeof data.NoOfVacancies != "number") ||
    (data.NoOfApplications && typeof data.NoOfApplications != "number") ||
    (data.FulFillmentPayoutType &&
      typeof data.FulFillmentPayoutType != "string") ||
    (data.FulFillmentPayout && typeof data.FulFillmentPayout != "number")
  ) {
    return [null, ["type error"]];
  }
  let outputData = {},
    errors = [];
  if (data.jobTitle && data.jobTitle.length > 80) {
    errors.push("jobTitle error");
  } else outputData.jobTitle = data.jobTitle;

  if (data.workplaceType) {
    outputData.workplaceType = data.workplaceType;
  }

  if (data.country && data.country.length > 40) {
    errors.push("country error");
  } else outputData.country = data.country;

  if (data.city && data.city.length > 40) {
    errors.push("city error");
  } else outputData.city = data.city;

  if (data.jobType) {
    outputData.jobType = data.jobType;
  }

  if (data.description && data.description.length > 400) {
    errors.push("description error");
  } else outputData.description = data.description;

  if (data.responsibilities && data.responsibilities.length > 400) {
    errors.push("responsibilties error");
  } else outputData.responsibilities = data.responsibilities;

  if (data.qualifications && data.qualifications.length > 400) {
    errors.push("qualifications error");
  } else outputData.qualifications = data.qualifications;

  if (data.totalExperience && typeof data.totalExperience != "number") {
    outputData.totalExperience = 0;
  } else outputData.totalExperience = data.totalExperience;

  if (data.minimumRequirements && data.minimumRequirements.length > 0) {
    let err = null;
    data.minimumRequirements.every((element) => {
      if (typeof element.skill != "string") {
        err = true;
        return false;
      }

      if (typeof element.experience != "string") {
        err = true;
        return false;
      }

      return true;
    });
    if (err) {
      errors.push("minimumRequirements error");
    } else {
      outputData.minimumRequirements = data.minimumRequirements;
    }
  }

  if (data.screeningQuestions && data.screeningQuestions.length > 0) {
    let err = null;
    data.screeningQuestions.every((element) => {
      if (typeof element.question != "string") {
        err = true;
        return false;
      }

      if (typeof element.answerType != "string") {
        err = true;
        return false;
      }

      if (typeof element.mustHave != "boolean") {
        err = true;
        return false;
      }

      if (typeof element.idealAnswer != "string") {
        err = true;
        return false;
      }

      return true;
    });
    if (err) {
      errors.push("screeningQuestions error");
    } else {
      outputData.screeningQuestions = data.screeningQuestions;
    }
  }

  if (data.annualCtcRange) {
    outputData.annualCtcRange = data.annualCtcRange;
  }

  if (data.minimumCtc) {
    outputData.minimumCtc = data.minimumCtc;
  }

  if (data.maximumBudget) {
    outputData.maximumBudget = data.maximumBudget;
  }

  if (data.NoOfVacancies) {
    outputData.NoOfVacancies = data.NoOfVacancies;
  }

  if (data.NoOfApplications) {
    outputData.NoOfApplications = data.NoOfApplications;
  }

  if (data.FulFillmentPayoutType) {
    outputData.FulFillmentPayoutType = data.FulFillmentPayoutType;
  }

  if (data.FulFillmentPayout) {
    outputData.FulFillmentPayout = data.FulFillmentPayout;
  }

  return [{ ...outputData }, errors];
};
const validateJobStatus = (data) => {
  try {
    data = String(data);
    if (["under-review", "draft", "closed", "paused", "live"].includes(data)) {
      return [data, null];
    } else {
      return [null, ["not valid status"]];
    }
  } catch (e) {
    return [null, ["not valid status"]];
  }
};
const validateJobStatusEmployer = (data) => {
  try {
    data = String(data);
    if (["under-review", "draft", "live", "closed", "paused"].includes(data)) {
      return [data, null];
    } else {
      return [null, ["not valid status"]];
    }
  } catch (e) {
    return [null, ["not valid status"]];
  }
};
const validateEmployerProfile = (data) => {
  if (
    (data.name && typeof data.name != "string") ||
    (data.profilePicture && typeof data.profilePicture != "string") ||
    (data.designation && typeof data.designation != "string") ||
    (data.city && typeof data.city != "string") ||
    (data.dob &&
      typeof data.dob != "string" &&
      new Date(data.dob).getDate() > 0) ||
    (data.contactPersonName && typeof data.contactPersonName != "string") ||
    (data.contactNumber && typeof data.contactNumber != "string") ||
    (data.contactEmail && typeof data.contactEmail != "string") ||
    (data.contactDesignation && typeof data.contactDesignation != "string") ||
    (data.socialMediaLinks && !Array.isArray(data.socialMediaLinks))
  ) {
    return [null, ["type error"]];
  }
  let outputData = {},
    errors = [];
  if (data.name && data.name.length > 80) {
    errors.push("name error");
  } else outputData.name = data.name;

  if (data.dob) {
    outputData.dob = data.dob;
  }
  if (data.profilePicture && data.profilePicture.length > 80) {
    errors.push("profilePicture error");
  } else outputData.profilePicture = data.profilePicture;

  if (data.contactPersonName && data.contactPersonName.length > 80) {
    errors.push("contactPersonName error");
  } else outputData.contactPersonName = data.contactPersonName;

  if (data.contactNumber && data.contactNumber.length > 20) {
    errors.push("contactNumber error");
  } else outputData.contactNumber = data.contactNumber;

  if (data.designation && data.designation.length > 20) {
    errors.push("designation error");
  } else outputData.designation = data.designation;

  if (data.city && data.city.length > 20) {
    errors.push("city error");
  } else outputData.city = data.city;

  if (data.contactDesignation && data.contactDesignation.length > 80) {
    errors.push("contactDesignation error");
  } else outputData.contactDesignation = data.contactDesignation;

  if (data.socialMediaLinks && data.socialMediaLinks.length > 0) {
    let err = null;
    data.socialMediaLinks.every((element) => {
      if (!element.link || typeof element.link != "string") {
        err = true;
        return false;
      }
      if (!element.name || typeof element.name != "string") {
        err = true;
        return false;
      }
      return true;
    });
    if (err) {
      errors.push("social media links error");
    } else {
      outputData.socialMediaLinks = data.socialMediaLinks;
    }
  }
  if (data.socialMediaLinks && data.socialMediaLinks.length == 0) {
    outputData.socialMediaLinks = [];
  }
  if (data.contactEmail) {
    const err = emailFormatValid(data.contactEmail);
    if (err) {
      errors.push(err);
    } else {
      outputData.contactEmail = data.contactEmail;
    }
  }

  return [{ ...outputData }, errors];
};
const validateEmployerCompany = (data) => {
  if (
    (data.companyName && typeof data.companyName != "string") ||
    (data.industry && typeof data.industry != "string") ||
    (data.description && typeof data.description != "string") ||
    (data.website && typeof data.website != "string") ||
    (data.employeeStrength && typeof data.employeeStrength != "number") ||
    (data.companyRegistrationNumber &&
      typeof data.companyRegistrationNumber != "string") ||
    (data.companyYearOfRegistration &&
      typeof data.companyYearOfRegistration != "number") ||
    (data.companyGst && typeof data.companyGst != "string") ||
    (data.companyLastYearTurnover &&
      typeof data.companyLastYearTurnover != "string") ||
    (data.registeredAddressLine1 &&
      typeof data.registeredAddressLine1 != "string") ||
    (data.registeredAddressLine2 &&
      typeof data.registeredAddressLine2 != "string") ||
    (data.registeredAddressCountry &&
      typeof data.registeredAddressCountry != "string") ||
    (data.registeredAddressCity &&
      typeof data.registeredAddressCity != "string") ||
    (data.registeredAddressPin &&
      typeof data.registeredAddressPin != "string") ||
    (data.registeredAddressState &&
      typeof data.registeredAddressState != "string") ||
    (data.companyType && typeof data.companyType != "string") ||
    (data.contactDetails && !Array.isArray(data.contactDetails)) ||
    (data.offices && !Array.isArray(data.offices))
  ) {
    return [null, ["type error"]];
  }
  let outputData = {},
    errors = [];
  if (data.companyName && data.companyName.length > 80) {
    errors.push("companyName error");
  } else outputData.companyName = data.companyName;

  if (data.industry && data.industry.length > 80) {
    errors.push("industry error");
  } else outputData.industry = data.industry;

  if (data.description && data.description.length > 800) {
    errors.push("description error");
  } else outputData.description = data.description;

  if (data.website && data.website.length > 100) {
    errors.push("website error");
  } else outputData.website = data.website;

  if (data.employeeStrength) {
    outputData.employeeStrength = data.employeeStrength;
  }

  if (data.companyType && data.companyType.length > 80) {
    errors.push("companyType error");
  } else outputData.companyType = data.companyType;

  if (
    data.companyRegistrationNumber &&
    data.companyRegistrationNumber.length > 80
  ) {
    errors.push("companyRegistrationNumber error");
  } else outputData.companyRegistrationNumber = data.companyRegistrationNumber;

  if (data.companyYearOfRegistration) {
    outputData.companyYearOfRegistration = data.companyYearOfRegistration;
  }

  if (data.companyGst && data.companyGst.length > 20) {
    errors.push("companyGst error");
  } else outputData.companyGst = data.companyGst;

  if (
    data.companyLastYearTurnover &&
    data.companyLastYearTurnover.length > 80
  ) {
    errors.push("companyLastYearTurnover error");
  } else outputData.companyLastYearTurnover = data.companyLastYearTurnover;

  if (data.registeredAddressLine1 && data.registeredAddressLine1.length > 80) {
    errors.push("registeredAddressLine1 error");
  } else outputData.registeredAddressLine1 = data.registeredAddressLine1;
  if (data.registeredAddressLine2 && data.registeredAddressLine2.length > 80) {
    errors.push("registeredAddressLine2 error");
  } else outputData.registeredAddressLine2 = data.registeredAddressLine2;

  if (
    data.registeredAddressCountry &&
    data.registeredAddressCountry.length > 80
  ) {
    errors.push("registeredAddressCountry error");
  } else outputData.registeredAddressCountry = data.registeredAddressCountry;

  if (data.registeredAddressCity && data.registeredAddressCity.length > 80) {
    errors.push("registeredAddressCity error");
  } else outputData.registeredAddressCity = data.registeredAddressCity;

  if (data.registeredAddressPin && data.registeredAddressPin.length > 80) {
    errors.push("registeredAddressPin error");
  } else outputData.registeredAddressPin = data.registeredAddressPin;

  if (data.registeredAddressState && data.registeredAddressState.length > 80) {
    errors.push("registeredAddressState error");
  } else outputData.registeredAddressState = data.registeredAddressState;

  if (data.contactDetails && data.contactDetails.length > 0) {
    let err = null;
    data.contactDetails.every((element) => {
      if (!element.title || typeof element.title != "string") {
        err = true;
        return false;
      }

      if (!element.name || typeof element.name != "string") {
        err = true;
        return false;
      }

      if (!element.number || typeof element.number != "string") {
        err = true;
        return false;
      }

      if (!element.designation || typeof element.designation != "string") {
        err = true;
        return false;
      }

      return true;
    });
    if (err) {
      errors.push("contactDetails error");
    } else {
      outputData.contactDetails = data.contactDetails;
    }
  }
  if (data.offices && data.offices.length > 0) {
    let err = null;
    data.offices.every((element) => {
      if (element.addressType && typeof element.addressType != "string") {
        err = true;
        return false;
      }

      if (element.address1 && typeof element.address1 != "string") {
        err = true;
        return false;
      }

      if (element.country && typeof element.country != "string") {
        err = true;
        return false;
      }

      if (element.number && typeof element.number != "string") {
        err = true;
        return false;
      }

      if (data.email) {
        const error = emailFormatValid(data.email);
        if (error) {
          err = true;
          return false;
        }
      }

      return true;
    });
    if (err) {
      errors.push("offices error");
    } else {
      outputData.offices = data.offices;
    }
  }

  return [{ ...outputData }, errors];
};
const validateEmployer = (data) => {
  return [data, null];
};
const validateJobseekerProfile = (data) => {
  if (
    (data.name && typeof data.name != "string") ||
    (data.nameTitle && typeof data.nameTitle != "string") ||
    (data.totalExperience && typeof data.totalExperience != "string") ||
    (data.dob &&
      typeof data.dob != "string" &&
      new Date(data.dob).getDate() > 0) ||
    (data.currentCity && typeof data.currentCity != "string") ||
    (data.education && !Array.isArray(data.education)) ||
    (data.isExperienced && typeof data.isExperienced != "boolean") ||
    (data.experience && !Array.isArray(data.experience)) ||
    (data.skills && !Array.isArray(data.skills)) ||
    (data.openToRelocate && typeof data.openToRelocate != "boolean") ||
    (data.openToRemoteWork && typeof data.openToRemoteWork != "boolean") ||
    (data.openToBringYourOwnDevice &&
      typeof data.openToBringYourOwnDevice != "boolean") ||
    (data.openToShift && typeof data.openToShift != "boolean") ||
    (data.passport && typeof data.passport != "boolean") ||
    (data.validityPassport && typeof data.validityPassport != "string") ||
    (data.currentCtc && typeof data.currentCtc != "number") ||
    (data.minimumCtc && typeof data.minimumCtc != "number") ||
    (data.resume && typeof data.resume != "string") ||
    (data.contactDetails?.currentCity &&
      typeof data.contactDetails?.currentCity != "string") ||
    (data.contactDetails?.email &&
      typeof data.contactDetails?.email != "string") ||
    (data.contactDetails?.contact &&
      typeof data.contactDetails?.contact != "string") ||
    (data.contactDetails?.alternateNo &&
      typeof data.contactDetails?.alternateNo != "string")
  ) {
    return [null, ["type error"]];
  }

  let outputData = {},
    errors = [];

  if (data.nameTitle && data.nameTitle.length > 6) {
    errors.push("nameTitle error");
  } else outputData.nameTitle = data.nameTitle;
  if (data.totalExperience && data.totalExperience.length > 25) {
    errors.push("totalExperience error");
  } else outputData.totalExperience = data.totalExperience;
  if (data.name && data.name.length > 80) {
    errors.push("name error");
  } else outputData.name = data.name;
  if (data.dob) {
    outputData.dob = data.dob;
  }
  if (data.currentCity && data.currentCity.length > 80) {
    errors.push("currentCity error");
  } else outputData.currentCity = data.currentCity;

  if (data.education && data.education.length > 0) {
    let err = null;
    data.education.every((element) => {
      if (!element.degree || typeof element.degree != "string") {
        err = true;
        return false;
      }
      if (!element.yearOfPassing || typeof element.yearOfPassing != "string") {
        err = true;
        return false;
      }
      if (!element.institute || typeof element.institute != "string") {
        err = true;
        return false;
      }
      return true;
    });
    if (err) {
      errors.push("education error");
    } else {
      outputData.education = data.education;
    }
  }
  if (data.education && data.education.length == 0) {
    outputData.education = [];
  }
  if (typeof data.isExperienced == "boolean") {
    outputData.isExperienced = data.isExperienced;
  }
  if (data.experience && data.experience.length > 0) {
    let err = null;
    data.experience.every((element) => {
      if (
        !element.organizationName ||
        typeof element.organizationName != "string"
      ) {
        err = true;
        return false;
      }
      if (!element.designation || typeof element.designation != "string") {
        err = true;
        return false;
      }
      if (
        !element.responsibilities ||
        typeof element.responsibilities != "string"
      ) {
        err = true;
        return false;
      }
      if (!element.isCurrentlyWorking) {
        if (
          !element.relievingDate ||
          typeof element.relievingDate != "string"
        ) {
          err = true;
          return false;
        }
      }

      if (!element.joiningDate || typeof element.joiningDate != "string") {
        err = true;
        return false;
      }

      return true;
    });
    if (err) {
      errors.push("experience error");
    } else {
      outputData.experience = data.experience;
    }
  }
  if (data.experience && data.experience.length == 0) {
    outputData.experience = [];
  }
  if (data.skills && data.skills.length > 0) {
    let err = null;
    data.skills.every((element) => {
      if (!element.skill || typeof element.skill != "string") {
        err = true;
        return false;
      }
      if (!element.experience || typeof element.experience != "string") {
        err = true;
        return false;
      }

      return true;
    });
    if (err) {
      errors.push("skills error");
    } else {
      outputData.skills = data.skills;
    }
  }
  if (data.skills && data.skills.length == 0) {
    outputData.skills = [];
  }

  if (typeof data.openToRelocate == "boolean") {
    outputData.openToRelocate = data.openToRelocate;
  }
  if (typeof data.openToRemoteWork == "boolean") {
    outputData.openToRemoteWork = data.openToRemoteWork;
  }
  if (typeof data.openToBringYourOwnDevice == "boolean") {
    outputData.openToBringYourOwnDevice = data.openToBringYourOwnDevice;
  }
  if (typeof data.currentCtc == "number") {
    outputData.currentCtc = data.currentCtc;
  }
  if (typeof data.minimumCtc == "number") {
    outputData.minimumCtc = data.minimumCtc;
  }
  if (typeof data.openToShift == "boolean") {
    outputData.openToShift = data.openToShift;
  }
  if (typeof data.passport == "boolean") {
    outputData.passport = data.passport;
  }
  if (data.validityPassport && data.validityPassport.length > 7) {
    errors.push("validityPassport error");
  } else outputData.validityPassport = data.validityPassport;

  if (data.resume) {
    outputData.resume = data.resume;
  }

  if (data.contactDetails && typeof data.contactDetails == "object") {
    const contactDetails = data.contactDetails;
    outputData.contactDetails = {};
    if (contactDetails.currentCity && contactDetails.currentCity.length > 50) {
      errors.push("contactDetails currentCity error");
    } else
      outputData.contactDetails.currentCity = data.contactDetails.currentCity;

    if (contactDetails.email && contactDetails.email?.length >= 0) {
      if (contactDetails.email?.length > 0) {
        const err = emailFormatValid(contactDetails.email);
        if (err) {
          errors.push(err);
        } else {
          outputData.contactDetails.email = contactDetails.email;
        }
      }
    }
    if (contactDetails.contact && contactDetails.contact.length > 20) {
      errors.push("contactDetails contact error");
    } else outputData.contactDetails.contact = data.contactDetails.contact;
    if (contactDetails.alternateNo && contactDetails.alternateNo.length > 20) {
      errors.push("contactDetails alternateNo error");
    } else
      outputData.contactDetails.alternateNo = data.contactDetails.alternateNo;
  }

  return [{ ...outputData }, errors];
};
const validateJobseekerSetting = (data) => {
  if (
    (data.makeProfilePublic && typeof data.makeProfilePublic != "boolean") ||
    (data.makeProfilePrivate && typeof data.makeProfilePrivate != "boolean") ||
    (data.makeProfileAnonymous &&
      typeof data.makeProfileAnonymous != "boolean") ||
    (data.jobSearchAlerts && typeof data.jobSearchAlerts != "boolean") ||
    (data.desktopNotification &&
      typeof data.desktopNotification != "boolean") ||
    (data.emailNotification && typeof data.emailNotification != "boolean")
  ) {
    return [null, ["Type error: Invalid boolean property."]];
  }
  let outputData = {},
    errors = [];

  if (typeof data.makeProfilePublic === "boolean") {
    outputData.makeProfilePublic = data.makeProfilePublic;
  } else {
    errors.push("makeProfilePublic must be a boolean.");
  }

  if (typeof data.makeProfilePrivate === "boolean") {
    outputData.makeProfilePrivate = data.makeProfilePrivate;
  } else {
    errors.push("makeProfilePrivate must be a boolean.");
  }

  if (typeof data.makeProfileAnonymous === "boolean") {
    outputData.makeProfileAnonymous = data.makeProfileAnonymous;
  } else {
    errors.push("makeProfileAnonymous must be a boolean.");
  }

  if (typeof data.jobSearchAlerts === "boolean") {
    outputData.jobSearchAlerts = data.jobSearchAlerts;
  } else {
    errors.push("jobSearchAlerts must be a boolean.");
  }

  if (typeof data.desktopNotification === "boolean") {
    outputData.desktopNotification = data.desktopNotification;
  } else {
    errors.push("desktopNotification must be a boolean.");
  }

  if (typeof data.emailNotification === "boolean") {
    outputData.emailNotification = data.emailNotification;
  } else {
    errors.push("emailNotification must be a boolean.");
  }
  return [{ ...outputData }, errors];
};

const validateRecruiterProfile = (data) => {
  if (
    (data.name && typeof data.name != "string") ||
    (data.username && typeof data.username != "string") ||
    (data.dob &&
      typeof data.dob != "string" &&
      new Date(data.dob).getDate() > 0) ||
    (data.refferedId && typeof data.refferedId != "string") ||
    (data.contactNumber && typeof data.contactNumber != "string") ||
    (data.altContactNumber && typeof data.altContactNumber != "string") ||
    (data.contactEmail && typeof data.contactEmail != "string") ||
    (data.altEmail && typeof data.altEmail != "string") ||
    (data.nomineeName && typeof data.nomineeName != "string") ||
    (data.nomineeEmail && typeof data.nomineeEmail != "string") ||
    (data.nomineeContactNumber &&
      typeof data.nomineeContactNumber != "string") ||
    (data.nomineeAltContactNumber &&
      typeof data.nomineeAltContactNumber != "string") ||
    (data.bank?.accountHolderName &&
      typeof data.bank?.accountHolderName != "string") ||
    (data.bank?.bankName && typeof data.bank?.bankName != "string") ||
    (data.bank?.accountNumber && typeof data.bank?.accountNumber != "string") ||
    (data.bank?.ifsc && typeof data.bank?.ifsc != "string") ||
    (data.bank?.upi && typeof data.bank?.upi != "string")
  ) {
    return [null, ["type error"]];
  }
  let outputData = {},
    errors = [];

  if (data.name && data.name.length > 80) {
    errors.push("name error");
  } else outputData.name = data.name;
  if (data.username && data.username.length > 80) {
    errors.push("username error");
  } else outputData.username = data.username;
  if (data.nomineeName && data.nomineeName.length > 80) {
    errors.push("nomineeName error");
  } else outputData.nomineeName = data.nomineeName;

  if (data.dob) {
    outputData.dob = data.dob;
  }
  if (data.profilePicture && data.profilePicture.length > 80) {
    errors.push("profilePicture error");
  } else outputData.profilePicture = data.profilePicture;
  if (data.altEmail) {
    const err = emailFormatValid(data.altEmail);
    if (err) {
      errors.push(err);
    } else {
      outputData.altEmail = data.altEmail;
    }
  }
  if (data.contactEmail) {
    const err = emailFormatValid(data.contactEmail);
    if (err) {
      errors.push(err);
    } else {
      outputData.contactEmail = data.contactEmail;
    }
  }
  if (data.nomineeEmail) {
    const err = emailFormatValid(data.nomineeEmail);
    if (err) {
      errors.push(err);
    } else {
      outputData.nomineeEmail = data.nomineeEmail;
    }
  }

  if (data.altContactNumber && data.altContactNumber.length > 20) {
    errors.push("altContactNumber error");
  } else outputData.altContactNumber = data.altContactNumber;

  if (data.nomineeContactNumber && data.nomineeContactNumber.length > 20) {
    errors.push("nomineeContactNumber error");
  } else outputData.nomineeContactNumber = data.nomineeContactNumber;

  if (
    data.nomineeAltContactNumber &&
    data.nomineeAltContactNumber.length > 20
  ) {
    errors.push("nomineeAltContactNumber error");
  } else outputData.nomineeAltContactNumber = data.nomineeAltContactNumber;

  if (data.contactNumber && data.contactNumber.length > 20) {
    errors.push("contactNumber error");
  } else outputData.contactNumber = data.contactNumber;

  if (data.bank && typeof data.bank == "object") {
    const bank = data.bank;
    outputData.bank = {};
    if (bank.accountHolderName && bank.accountHolderName.length > 30) {
      errors.push("bank accountHolderName error");
    } else outputData.bank.accountHolderName = data.bank.accountHolderName;
    if (bank.bankName && bank.bankName.length > 30) {
      errors.push("bank bankName error");
    } else outputData.bank.bankName = data.bank.bankName;
    if (bank.accountNumber && bank.accountNumber.length > 16) {
      errors.push("bank accountNumber error");
    } else outputData.bank.accountNumber = data.bank.accountNumber;
    if (bank.ifsc && bank.ifsc.length > 14) {
      errors.push("bank ifsc error");
    } else outputData.bank.ifsc = data.bank.ifsc;
    if (bank.upi && bank.upi.length > 25) {
      errors.push("bank upi error");
    } else outputData.bank.upi = data.bank.upi;
  }

  return [{ ...outputData }, errors];
};
const validateUserData = (data) => {
  if (
    (data.email && typeof data.email != "string") ||
    (data.password && typeof data.password != "string") ||
    (data.userType && typeof data.userType != "string")
  ) {
    return [null, ["type error"]];
  }
  let err = null,
    outputData = {},
    errors = [];
  if (data.email) {
    err = emailFormatValid(data.email);
    if (err) {
      errors.push(err);
    } else {
      outputData.email = data.email;
    }
  }
  if (data.password) {
    err = passwordFormatValid(data.password);
    if (err) {
      errors.push(err);
    } else {
      outputData.password = data.password;
    }
  }

  let userTypeValue = null;
  if (data.userType) {
    userTypeValue = userTypeValid(data.userType);
    if (!userTypeValue) {
      errors.push("usertype invalid");
    }
  }

  return [{ ...outputData, ...{ userType: userTypeValue } }, errors];
};
const validateCandidateUserData = async (data) => {
  if (!data.email || typeof data.email != "string") {
    return [null, ["no email error"]];
  }
  let err = null,
    outputData = {},
    errors = [];
  if (data.email) {
    err = emailFormatValid(data.email);
    if (err) {
      errors.push(err);
    } else {
      outputData.email = data.email;
    }
  }
  var randomPassword = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
  });

  const hashedPassword = await hashPassword(randomPassword);
  return [
    { ...outputData, ...{ userType: 3, password: hashedPassword } },
    errors,
  ];
};
const validateRecruiterApplicationData = (data) => {
  let outputData = {},
    errors = [];

  if (!data.job || typeof data.job !== "string") {
    return [null, ["jobID error"]];
  } else {
    outputData.job = data.job;
  }
  if (!data.jobseeker || typeof data.jobseeker !== "string") {
    return [null, ["jobseekerID error"]];
  } else {
    outputData.jobseeker = data.jobseeker;
  }
  if (!data.recruiter || typeof data.recruiter !== "string") {
    return [null, ["recruiterID error"]];
  } else {
    outputData.recruiter = data.recruiter;
  }
  if (!data.employer || typeof data.employer !== "string") {
    return [null, ["employerID error"]];
  } else {
    outputData.employer = data.employer;
  }

  if (!data.status || typeof data.status !== "string") {
    return [null, ["statusID error"]];
  } else {
    outputData.status = data.status;
  }
  if (
    !data.statusArray ||
    !Array.isArray(data.statusArray) ||
    data.statusArray.length == 0
  ) {
    return [null, ["statusArray error"]];
  } else {
    outputData.statusArray = data.statusArray;
  }
  if (!data.screeningQuestions || !Array.isArray(data.screeningQuestions)) {
    return [null, ["screeningQuestions error"]];
  } else {
    if (data.screeningQuestions.length > 0) {
      let err = null;

      data.screeningQuestions.forEach((element) => {
        if (typeof element.question != "string") {
          err = "question error";
        }
      });
      if (err) {
        errors.push("screeningQuestions error");
      } else {
        outputData.screeningQuestions = data.screeningQuestions;
      }
    } else {
      return [null, ["screeningQuestions error"]];
    }
  }
  if (!data.skills || !Array.isArray(data.skills)) {
    return [null, ["skills error"]];
  } else {
    if (data.skills.length > 0) {
      let err = null;
      data.skills.every((element) => {
        if (typeof element.skill != "string") {
          err = "skill error";
          return false;
        }

        if (typeof element.experience != "string") {
          err = "experience error";
          return false;
        }

        return true;
      });
      if (err) {
        errors.push("skills error");
      } else {
        outputData.skills = data.skills;
      }
    } else {
      return [null, ["skills error"]];
    }
  }
  if (data.education && data.education.length > 0) {
    let err = null;
    data.education.every((element) => {
      if (!element.degree || typeof element.degree != "string") {
        err = true;
        return false;
      }
      if (!element.yearOfPassing || typeof element.yearOfPassing != "string") {
        err = true;
        return false;
      }
      if (!element.institute || typeof element.institute != "string") {
        err = true;
        return false;
      }
      return true;
    });
    if (err) {
      errors.push("education error");
    } else {
      outputData.education = data.education;
    }
  }
  if (data.education && data.education.length == 0) {
    outputData.education = [];
  }
  if (typeof data.isExperienced == "boolean") {
    outputData.isExperienced = data.isExperienced;
  }
  if (data.experience && data.experience.length > 0) {
    let err = null;
    data.experience.every((element) => {
      if (
        !element.organizationName ||
        typeof element.organizationName != "string"
      ) {
        err = true;
        return false;
      }
      if (!element.designation || typeof element.designation != "string") {
        err = true;
        return false;
      }
      if (
        !element.responsibilities ||
        typeof element.responsibilities != "string"
      ) {
        err = true;
        return false;
      }
      if (!element.isCurrentlyWorking) {
        if (
          !element.relievingDate ||
          typeof element.relievingDate != "string"
        ) {
          err = true;
          return false;
        }
      }

      if (!element.joiningDate || typeof element.joiningDate != "string") {
        err = true;
        return false;
      }

      return true;
    });
    if (err) {
      errors.push("experience error");
    } else {
      outputData.experience = data.experience;
    }
  }
  if (data.experience && data.experience.length == 0) {
    outputData.experience = [];
  }
  if (data.coverLetter) {
    if (typeof data.coverLetter == "string") {
      outputData.coverLetter = data.coverLetter;
    } else {
      errors.push("coverLetter error");
    }
  }
  if (data.resume) {
    if (typeof data.resume == "string") {
      outputData.resume = data.resume;
    } else {
      errors.push("resume error");
    }
  } else {
    errors.push("resume error");
  }
  if (data.remarks) {
    if (typeof data.remarks == "string") {
      outputData.remarks = data.remarks;
    } else {
      errors.push("remarks error");
    }
  }
  return [{ ...outputData }, errors];
};

const validateJobseekerApplicationData = (data) => {
  let outputData = {},
    errors = [];

  if (!data.job || typeof data.job !== "string") {
    return [null, ["jobID error"]];
  } else {
    outputData.job = data.job;
  }
  if (!data.jobseeker || typeof data.jobseeker !== "string") {
    return [null, ["jobseekerID error"]];
  } else {
    outputData.jobseeker = data.jobseeker;
  }
  if (!data.employer || typeof data.employer !== "string") {
    return [null, ["employerID error"]];
  } else {
    outputData.employer = data.employer;
  }
  if (!data.status || typeof data.status !== "string") {
    return [null, ["statusID error"]];
  } else {
    outputData.status = data.status;
  }
  if (
    !data.statusArray ||
    !Array.isArray(data.statusArray) ||
    data.statusArray.length == 0
  ) {
    return [null, ["statusArray error"]];
  } else {
    outputData.statusArray = data.statusArray;
  }
  if (!data.screeningQuestions || !Array.isArray(data.screeningQuestions)) {
    return [null, ["screeningQuestions error"]];
  } else {
    if (data.screeningQuestions.length > 0) {
      let err = null;

      data.screeningQuestions.forEach((element) => {
        if (typeof element.question != "string") {
          err = "question error";
        }
      });
      if (err) {
        errors.push("screeningQuestions error");
      } else {
        outputData.screeningQuestions = data.screeningQuestions;
      }
    } else {
      return [["screeningQuestions error"], null];
    }
  }
  if (!data.skills || !Array.isArray(data.skills)) {
    return [null, ["skills error"]];
  } else {
    if (data.skills.length > 0) {
      let err = null;
      data.skills.every((element) => {
        if (typeof element.skill != "string") {
          err = "skill error";
          return false;
        }

        if (typeof element.experience != "string") {
          err = "experience error";
          return false;
        }

        return true;
      });
      if (err) {
        errors.push("skills error");
      } else {
        outputData.skills = data.skills;
      }
    } else {
      return [null, ["skills error"]];
    }
  }
  if (data.education && data.education.length > 0) {
    let err = null;
    data.education.every((element) => {
      if (!element.degree || typeof element.degree != "string") {
        err = true;
        return false;
      }
      if (!element.yearOfPassing || typeof element.yearOfPassing != "string") {
        err = true;
        return false;
      }
      if (!element.institute || typeof element.institute != "string") {
        err = true;
        return false;
      }
      return true;
    });
    if (err) {
      errors.push("education error");
    } else {
      outputData.education = data.education;
    }
  }
  if (data.education && data.education.length == 0) {
    outputData.education = [];
  }
  if (typeof data.isExperienced == "boolean") {
    outputData.isExperienced = data.isExperienced;
  }
  if (data.experience && data.experience.length > 0) {
    let err = null;
    data.experience.every((element) => {
      if (
        !element.organizationName ||
        typeof element.organizationName != "string"
      ) {
        err = true;
        return false;
      }
      if (!element.designation || typeof element.designation != "string") {
        err = true;
        return false;
      }
      if (
        !element.responsibilities ||
        typeof element.responsibilities != "string"
      ) {
        err = true;
        return false;
      }
      if (!element.isCurrentlyWorking) {
        if (
          !element.relievingDate ||
          typeof element.relievingDate != "string"
        ) {
          err = true;
          return false;
        }
      }

      if (!element.joiningDate || typeof element.joiningDate != "string") {
        err = true;
        return false;
      }

      return true;
    });
    if (err) {
      errors.push("experience error");
    } else {
      outputData.experience = data.experience;
    }
  }
  if (data.experience && data.experience.length == 0) {
    outputData.experience = [];
  }
  if (data.coverLetter) {
    if (typeof data.coverLetter == "string") {
      outputData.coverLetter = data.coverLetter;
    } else {
      errors.push("coverLetter error");
    }
  }
  if (data.resume) {
    if (typeof data.resume == "string") {
      outputData.resume = data.resume;
    } else {
      errors.push("resume error");
    }
  } else {
    errors.push("resume error");
  }
  if (data.remarks) {
    if (typeof data.remarks == "string") {
      outputData.remarks = data.remarks;
    } else {
      errors.push("remarks error");
    }
  }
  return [{ ...outputData }, errors];
};

module.exports = {
  emailFormatValid,
  nameFormatValid,
  passwordFormatValid,
  userTypeValid,
  validateEmployerProfile,
  validateEmployerCompany,
  validateCompanyData,
  validateJobseekerProfile,
  validateJobseekerSetting,
  validateEmployer,
  validateRecruiterProfile,
  validateUserData,
  validateJobData,
  validateJobStatus,
  validateJobStatusEmployer,
  validateCandidateUserData,
  validateRecruiterApplicationData,
  validateJobseekerApplicationData,
};
