import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import job from "../../images/Job.png";
import cv from "../../images/CV.png";
import SearchCandidate from "../../images/Employer/SearchCandidate.svg";
import NewJob from "../../images/Employer/postNewJob.svg";
import ViewProfile from "../../images/view.svg";
import EditProfile from "../../images/edit.svg";
import Setting from "../../images/settings.svg";
import Privacy from "../../images/security.svg";
import Logout from "../../images/exit.svg";
import WebHeader from "../WebHeader/WebHeader";
import WebLoggedHeader from "../WebLoggedHeader/WebLoggedHeader";
import { logoutAndClearUser } from "../../state/auth/authSlice";
import { useDispatch } from "react-redux";
import MobileHeader from "../MobileHeader/MobileHeader";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import RecruiterLoggedHeader from "../MobileHeader/RecruiterLoggedHeader";
import JobseekerLoggedHeader from "../MobileHeader/JobseekerLoggedHeader";
import EmployerLoggedHeader from "../MobileHeader/EmployerLoggedHeader";
import { useLocation } from "react-router-dom";

const Header = ({ auth, user }) => {
  const dispatch = useDispatch();
  let location = useLocation()
  const { loading, error } = auth;
  const { userLoading, userError } = user;

  const handleLogOut = () => {
    dispatch(logoutAndClearUser());
  };

  const [login, setLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const userType = user?.user?.user?.userType;
  /* ----------this nav links for the user details header -------- */

  const navLinks = [
    { name: "For Employer", Link: "home" },
    { name: "For Recruiter", Link: "job" },
    { name: "For Jobseeker", Link: "candidates" },
    { name: "About us", Link: "jobseekers" },
    { name: "FAQ's", Link: "recruiter" },
  ];

  /* --------------------this details after user login  ------------ */

  const RecruiterProfile = [
    {
      name: "View Profile",
      icon: ViewProfile,
      link: "dashboard/settings/update-profile",
    },
    {
      name: "Edit Profile",
      icon: EditProfile,
      link: "dashboard/settings/update-profile",
    },
    {
      name: "Security Settings",
      icon: Setting,
      link: "dashboard/settings/security",
    },
    {
      name: "Privacy Settings",
      icon: Privacy,
      link: "dashboard/settings/privacy",
    },
    { name: "Logout", icon: Logout, link: "", handleLogOut },
  ];

  const RecruiterDetails = [
    { name: "All Jobs", icon: job, Link: "dashboard/jobs" },
    { name: "Add a Candidate", icon: cv, Link: "dashboard/candidate/add" },
  ];
  const EmployerProfile = [
    {
      name: "View Profile",
      icon: ViewProfile,
      link: "dashboard/settings/update-profile",
    },
    {
      name: "Edit Profile",
      icon: EditProfile,
      link: "dashboard/settings/update-profile",
    },
    {
      name: "Security Settings",
      icon: Setting,
      link: "dashboard/settings/security",
    },
    {
      name: "Privacy Settings",
      icon: Privacy,
      link: "dashboard/settings/privacy",
    },
    {
      name: "Logout",
      icon: Logout,
      link: "",
      handleLogOut,
    },
  ];

  const EmployerDetails = [
    { name: "Search Candidate", icon: SearchCandidate, Link: "jobs" },
    {
      name: "Post New Job",
      icon: NewJob,
      Link: "dashboard/job/edit-job/new/post-job",
    },
  ];

  const JobSeekerProfiles = [
    {
      name: "View Profile",
      icon: ViewProfile,
      link: "dashboard/profile/general",
    },
    {
      name: "Edit Profile",
      icon: EditProfile,
      link: "dashboard/profile/general",
    },
    {
      name: "Security Settings",
      icon: Setting,
      link: "dashboard/settings/security",
    },
    {
      name: "Privacy Settings",
      icon: Privacy,
      link: "dashboard/settings/privacy",
    },
    { name: "Logout", icon: Logout, link: "", handleLogOut },
  ];

  const JobSeekerDetails = [
    { name: "Search Jobs", icon: job, Link: "dashboard/search-jobs" },
    { name: "My Application", icon: cv, Link: "Application" },
  ];

  let navDetails = [];
  let profileDetails = [];
  let MobileLoggedHeader = [];

  if (userType === "recruiter") {
    navDetails = RecruiterDetails;
    profileDetails = RecruiterProfile;
    MobileLoggedHeader = (<RecruiterLoggedHeader user={user} />);
  } else if (userType === "employer") {
    navDetails = EmployerDetails;
    profileDetails = EmployerProfile;
    MobileLoggedHeader = (<EmployerLoggedHeader user={user} />);
  } else if (userType === "jobseeker") {
    navDetails = JobSeekerDetails;
    profileDetails = JobSeekerProfiles;
    MobileLoggedHeader = (<JobseekerLoggedHeader user={user} />);
  }

  let path = location.pathname === '/dashboard'

  return (
    <>
      {isMobile ? (
        <>
          {user.user ? (
            <>
              {!loading && error && (
                <Alert variant="danger">
                  Error occurred while loading data.
                </Alert>
              )}
              {userError && (
                <Alert variant="danger">
                  Error occurred while loading data.
                </Alert>
              )}
              {!loading && !error && !userLoading && !userError && path ? (
                MobileLoggedHeader
              )
                :
                (
                  null
                )
              }
            </>
          ) : (
            <MobileHeader />
          )}
        </>
      ) : (
        <>
          {user.user ? (
            <>
              {!loading && error && (
                <Alert variant="danger">
                  Error occurred while loading data.
                </Alert>
              )}
              {userError && (
                <Alert variant="danger">
                  Error occurred while loading data.
                </Alert>
              )}
              {!loading && !error && !userLoading && !userError ? (
                <WebLoggedHeader
                  user={user}
                  navDetails={navDetails}
                  profileDetails={profileDetails}
                />
              ) : (
                <WebHeader
                  login={login}
                  setLogin={setLogin}
                  navLinks={navLinks}
                />
              )}
            </>
          ) : (
            <WebHeader login={login} setLogin={setLogin} navLinks={navLinks} />
          )
          }
        </>
      )}
    </>
  );
};

export default Header;
