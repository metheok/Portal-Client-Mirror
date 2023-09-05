import React from "react";
import { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Privacy from "../JobSeekerPrivacy/JobSeekerPrivacy";
import Security from "../JobSeekerSecurity/JobSeekerSecurity";
import { Navigate, useNavigate } from "react-router-dom";
import {
  jobseekerSettingFetch,
  jobseekerSettingUpdate,
} from "../../state/jobseekerSettings/jobseekerSettingActions";
import { clearErrors } from "../../state/auth/authSlice";
import { useDispatch } from "react-redux";

const JobseekerSettings = ({ location }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobseekerSettingFetch());
  }, [dispatch]);

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/settings/privacy":
        setKey("privacy");
        break;
      case "/dashboard/settings/security":
        setKey("security");
        break;
      default:
        break;
    }
  }, [location]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [key, dispatch]);

  if (
    location.pathname === "/dashboard/settings" ||
    location.pathname === "/dashboard/settings/"
  ) {
    return <Navigate to="/dashboard/settings/privacy" />;
  }

  const handleChangePassword = (e) => {
    return navigate("/update-password");
  };

  return (
    <Tabs
      id="controlled-tab"
      activeKey={key}
      onSelect={(k) => {
        switch (k) {
          case "privacy":
            navigate("/dashboard/settings/privacy");
            break;
          case "security":
            navigate("/dashboard/settings/security");

            break;

          case "contact":
            navigate("/dashboard/settings/contact");

            break;
          default:
            navigate("/dashboard/settings/privacy");

            break;
        }
        return;
      }}
      className="mb-3"
    >
      <Tab eventKey="privacy" className="mb-2" title="Privacy">
        <div>
          <Privacy
            dispatch={dispatch}
            jobseekerSettingUpdate={jobseekerSettingUpdate}
          />
        </div>
      </Tab>
      <Tab eventKey="security" className="m-2" title="Security">
        <div>
          <Security handleChangePassword={handleChangePassword} />
        </div>
      </Tab>
    </Tabs>
  );
};

export default JobseekerSettings;
