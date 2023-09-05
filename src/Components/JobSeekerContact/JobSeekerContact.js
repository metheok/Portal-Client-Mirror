import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./JobSeekerContact.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";

const JobSeekerContact = ({
  jobSeekerProfileUpdate,
  dispatch,
  clearErrors,
}) => {
  const {
    user,
    profileLoading,
    profileUpdateLoading,
    profileUpdateSuccess,
    profileUpdateError,
  } = useSelector((state) => state.user);

  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});

  const [validationErrors, setValidationErrors] = useState({});

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);

  const [showValidation, setShowValidation] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (profileUpdateError) {
      setFormValues(initialValues);
    }
  }, [profileUpdateSuccess, profileUpdateError, initialValues]);

  React.useEffect(() => {
    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(user.profile.contactDetails || {});
    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [user]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);
  const changeHandle = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);
    let errors = { ...validationErrors };
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(value);

        errors = {
          ...errors,
          ...{ email: isValidEmail ? "" : "Invalid email format" },
        };

        if (isValidEmail) {
          delete errors.email;
        }
        break;
      case "contact":
        const contactRegex = /^\d{10,14}$/;
        const isValidContact = contactRegex.test(value);

        errors = {
          ...errors,
          ...{ contact: isValidContact ? "" : "Invalid contact format" },
        };
        if (isValidContact) {
          delete errors.contact;
        }
        break;
      case "alternateNo":
        const alternateNoRegex = /^\d{10,15}$/;
        const isValidAlternateNo = alternateNoRegex.test(value);
        errors = {
          ...errors,
          ...{ contact: isValidAlternateNo ? "" : "Invalid contact format" },
        };
        if (isValidAlternateNo) {
          delete errors.alternateNo;
        }
        break;
      default:
        break;
    }
    setValidationErrors({
      ...errors,
    });
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      currentCity: formValues.currentCity,
      email: formValues.email,
      contact: formValues.contact,
      alternateNo: formValues.alternateNo,
    };

    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }

    try {
      await dispatch(jobSeekerProfileUpdate({ contactDetails: formData }));
      // Optionally, you can show a success message or perform other actions after successful form submission.
      /* 	setShowSuccessAlert(true); // Show the success alert */
    } catch (error) {
      // Handle any errors that occur during form submission.
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const nextTab = () => {
    navigate("/dashboard/profile/additional");
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      style={{ paddingLeft: "2.5rem" }}
      sm={{ span: 6, offset: 2 }}
      className="mt-5"
    >
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      <Form style={{ backgroundColor: "white" }} onSubmit={handleSubmit}>
        <Col sm={{ span: 8, offset: 1 }}>
          <Form.Group className="mb-3" controlId="currentCity">
            <Form.Label className={css.labelChange}>Current City:</Form.Label>
            <Form.Control
              type="text"
              name="currentCity"
              value={user?.profile?.currentCity}
              isInvalid={showValidation && !!validationErrors.currentCity}
              required
              style={{ borderRadius: "2px" }}
              disabled
            />
            {validationErrors.currentCity && (
              <Form.Text className="text-danger">
                {validationErrors.currentCity}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className={css.labelChange}>Email :</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user?.user?.email}
              isInvalid={showValidation && !!validationErrors.email}
              style={{ borderRadius: "2px" }}
              required
              disabled
            />
            {validationErrors.email && (
              <Form.Text className="text-danger">
                {validationErrors.email}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="contact">
            <Form.Label className={css.labelChange}>Contact No:</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formValues.contact}
              onChange={changeHandle}
              isInvalid={showValidation && !!validationErrors.contact}
              required
              style={{ borderRadius: "2px" }}
            />
            {validationErrors.contact && (
              <Form.Text className="text-danger">
                {validationErrors.contact}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="alternateNo">
            <Form.Label className={css.labelChange}>Alternate No:</Form.Label>
            <Form.Control
              type="text"
              name="alternateNo"
              value={formValues.alternateNo}
              onChange={changeHandle}
              isInvalid={showValidation && !!validationErrors.alternateNo}
              required
              style={{ borderRadius: "2px" }}
            />
            {validationErrors.alternateNo && (
              <Form.Text className="text-danger">
                {validationErrors.alternateNo}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <div className="d-flex justify-content-end  mt-5">
          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            onClick={nextTab}
            disabled={profileUpdateLoading}
          >
            {"Previous"}
          </Button>

          <Button
            disabled={!isFormChanged || profileUpdateLoading}
            type="submit"
            variant="primary"
            style={{ width: "6rem" }}
            className="d-inline"
          >
            {profileUpdateLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobSeekerContact;
