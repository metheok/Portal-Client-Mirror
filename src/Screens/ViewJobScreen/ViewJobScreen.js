import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loading from "../../components/Loading/Loading";
import EmployerJobs from "../../components/EmployerJobs/EmployerJobs";
import RecruiterJobs from "../../components/RecruiterJobs/RecruiterJobs";
import JobseekerJobs from "../../components/JobseekerJobs/JobseekerJobs";

const ViewJobScreen = ({ subPath }) => {
  const navigate = useNavigate();
  const { loading, error, userToken } = useSelector((state) => state.auth);
  const { user, profileLoading, profileError } = useSelector(
    (state) => state.user
  );

  var renderedComponent = null;
  if (loading || profileLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }
  if (user.user.userType === "employer") {
    renderedComponent = <EmployerJobs subPath={subPath} />;
  } else if (user.user.userType === "recruiter") {
    renderedComponent = <RecruiterJobs subPath={subPath} />;
  } else if (user.user.userType === "jobseeker") {
    renderedComponent = <JobseekerJobs subPath={subPath} />;
  } else {
    navigate("/dashboard");
    return;
  }

  return <>{renderedComponent}</>;
};

export default ViewJobScreen;
