import { React, useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneralDetails from "../RecruiterDetails/RecruiterDetails";
import BankDetails from "../RecruiterBankDetails/RecruiterBankDetails";
import ContactDetails from "../RecruiterContactDetails/RecruiterContactDetails";
import { Navigate, useNavigate } from "react-router-dom";
import {
  recruiterProfileUpdate,
  recruiterProfileFetch,
} from "../../state/recruiterProfile/recruiterProfileActions";
import { clearErrors } from "../../state/auth/authSlice";
import { useDispatch } from "react-redux";

const UpdateProfile = ({ location }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(recruiterProfileFetch());
  }, [dispatch]);

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/profile/general":
        setKey("general");
        break;
      case "/dashboard/profile/bank":
        setKey("bank");

        break;
      case "/dashboard/profile/contact":
        setKey("contact");

        break;
      default:
        break;
    }
  }, [location]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [key, dispatch]);

  if (
    location.pathname === "/dashboard/profile" ||
    location.pathname === "/dashboard/profile/"
  ) {
    return <Navigate to="/dashboard/profile/general" />;
  }

  return (
    <Tabs
      id="controlled-tab"
      activeKey={key}
      onSelect={(k) => {
        switch (k) {
          case "general":
            navigate("/dashboard/profile/general");
            break;
          case "bank":
            navigate("/dashboard/profile/bank");
            break;
          case "contact":
            navigate("/dashboard/profile/contact");
            break;
          default:
            navigate("/dashboard/profile/general");
            break;
        }
        return;
      }}
      className="mb-3"
    >
      <Tab eventKey="general" className="mb-2" title="General Details">
        <div>
          <GeneralDetails
            navigate={navigate}
            key={key}
            dispatch={dispatch}
            recruiterProfileUpdate={recruiterProfileUpdate}
            clearErrors={clearErrors}
          />
        </div>
      </Tab>
      <Tab eventKey="bank" className="m-2" title="Bank Details">
        <div>
          <BankDetails
            navigate={navigate}
            key={key}
            dispatch={dispatch}
            recruiterProfileUpdate={recruiterProfileUpdate}
            clearErrors={clearErrors}
          />
        </div>
      </Tab>
      <Tab eventKey="contact" title="Contact Details">
        <div>
          <ContactDetails
            dispatch={dispatch}
            key={key}
            recruiterProfileUpdate={recruiterProfileUpdate}
            clearErrors={clearErrors}
          />
        </div>
      </Tab>
    </Tabs>
  );
};

export default UpdateProfile;
