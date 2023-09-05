import React from "react";
import RecruiterSettings from "../RecruiterSettings/RecruiterSettings";
import EmployerSettings from "../EmployerSettings/EmployerSettings";
import JobSeekerSettings from "../JobseekerSettings/JobseekerSettings";

const Settings = ({ user, location, isMobile }) => {
  const userType = user.user.user.userType;

  let renderComponent = null;
  switch (userType) {
    case "employer":
      renderComponent = <EmployerSettings location={location} isMobile={isMobile} />;
      break;
    case "recruiter":
      renderComponent = <RecruiterSettings location={location} />;
      break;
    case "jobseeker":
      renderComponent = <JobSeekerSettings location={location} />;
      break;
    default:
      break;
  }

  return <div>{renderComponent}</div>;
};

export default Settings;
