import { React, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { clearErrors } from "../../state/user/userSlice";
import OnScreenMenu from "../OnScreenMenu/OnScreenMenu";
import UpdateProfile from "../EmployerUpdateProfile/EmployerUpdateProfile";
import Privacy from "../EmployerPrivacy/EmployerPrivacy";
import Security from "../EmployerSecurity/EmployerSecurity";
import { Navigate, useNavigate } from "react-router-dom";
import {
  employerProfileFetch,
  employerProfileUpdate,
} from "../../state/employerProfile/employerProfileActions";
import { useDispatch } from "react-redux";

const EmployerSettings = ({ location, isMobile }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employerProfileFetch());
  }, [dispatch]);

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/settings/update-profile":
        setKey("UpdateProfile");
        break;
      /*  case "/dashboard/settings/contact-details":
         setKey("ContactDetails"); 
         break;*/
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
    return <Navigate to="/dashboard/settings/update-profile" />;
  }

  const handleChangePassword = (e) => {
    return navigate("/update-password");
  };
  return (
    <>
      <style>
        {`
       @media (max-width: 800px) {
            .tabs-container .nav-tabs {
              display: none; /* Hide the tab headers */
            }
            
            .tabs-container .tab-content {
              margin-top: 0; /* Adjust the margin if needed */
            }
          }
      `}
      </style>
      <div className="tabs-container screenMenu-container ">
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k) => {
            switch (k) {
              case "UpdateProfile":
                navigate("/dashboard/settings/update-profile");
                break;
              case "privacy":
                navigate("/dashboard/settings/privacy");
                break;
              case "security":
                navigate("/dashboard/settings/security");
                break;
            }
            return;
          }}
          className="mb-3"
        >
          <Tab
            eventKey="UpdateProfile"
            className="mb-2 tab-content"
            title="Update Profile"
          >
            <UpdateProfile
              dispatch={dispatch}
              employerProfileUpdate={employerProfileUpdate}
              clearErrors={clearErrors}
              isMobile={isMobile}
            />
          </Tab>
          <Tab eventKey="privacy" className="tab-content" title="Privacy">
            <Privacy isMobile={isMobile} />
          </Tab>
          <Tab eventKey="security" className="tab-content" title="Security">
            <Security handleChangePassword={handleChangePassword} isMobile={isMobile} />
          </Tab>
        </Tabs>
      </div>

    </>);
};

export default EmployerSettings;
