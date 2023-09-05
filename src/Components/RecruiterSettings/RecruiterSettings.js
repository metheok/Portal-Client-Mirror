import React from "react";
import { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Privacy from "../RecruiterPrivacy/RecruiterPrivacy";
import Security from "../RecruiterSecurity/RecruiterSecurity";
import { Navigate, useNavigate } from "react-router-dom";

const Settings = ({ location }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/settings/privacy":
        setKey("privacy");
        break;
      case "/dashboard/settings/security":
        setKey("security");
        break;
      case "/dashboard/settings/contact":
        setKey("contact");
        break;
      default:
        break;
    }
  }, [location]);

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
          <Privacy />
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

export default Settings;
