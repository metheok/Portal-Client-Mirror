import React from "react";
import RecruiterProfile from "../RecruiterProfile/RecruiterProfile";

import JobSeekerProfile from "../JobseekerProfile/JobseekerProfile";

import JobSeekerProfileView from "../JobseekerProfileView/JobseekerProfileView";

const Profiles = ({ user, location }) => {
  const userType = user?.user?.user.userType;
  let renderComponent = null;
  switch (userType) {
    case "recruiter":
      renderComponent = <RecruiterProfile location={location} />;
      break;
    case "jobseeker":
      renderComponent = <JobSeekerProfile location={location} />;

      break;
    default:
      break;
  }

  return <div>{renderComponent}</div>;
};

export default Profiles;
