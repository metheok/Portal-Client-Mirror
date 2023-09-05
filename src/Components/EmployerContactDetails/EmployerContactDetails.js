import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from "./EmployerContactDetails.module.css";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";

const EmployerContactDetails = ({
  dispatch,
  employerProfileUpdate,
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
  const [editingField, setEditingField] = useState(false);

  const [isFormChanged, setIsFromChanged] = useState(false);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  React.useEffect(() => {
    const values = {
      contactPersonName: user.profile.contactPersonName,
      contactNumber: user.profile.contactNumber,
      contactEmail: user.profile.contactEmail,
      contactDesignation: user.profile.contactDesignation,
    };
    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);

    setFormValues(copiedValues);
  }, [user, profileUpdateSuccess, profileUpdateError]);
  React.useEffect(() => {
    if (profileUpdateSuccess || profileUpdateError) {
      setEditingField(false);
    }
    if (profileUpdateError) {
      setFormValues(initialValues);
    }
  }, [profileUpdateSuccess, profileUpdateError, initialValues]);
  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleChange = (e) => {
    dispatch(clearErrors());
    const { name, value } = e.target;
    switch (name) {
      case "contactPersonName":
        setFormValues({ ...formValues, contactPersonName: value });
        break;
      case "contactNumber":
        setFormValues({ ...formValues, contactNumber: value });
        break;
      case "contactEmail":
        setFormValues({ ...formValues, contactEmail: value });
        break;
      case "contactDesignation":
        setFormValues({ ...formValues, contactDesignation: value });
        break;
      default:
        break;
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditingField(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    // if (!formValues.contactPersonName) {
    //   errors.name = "Please enter name";
    // }

    if (formValues.contactNumber) {
      const contactNumberRegex = /^\d{10,15}$/;
      const test = contactNumberRegex.test(formValues.contactNumber);
      if (!test) {
        errors.contactNumber = "Invalid format";
      }
    }
    if (Object.keys(errors).length > 0) {
      setShowErrorAlert(true);
      setValidationErrors(errors);

      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }
    const formData = {
      contactPersonName: formValues.contactPersonName,
      contactDesignation: formValues.contactDesignation,
      contactEmail: formValues.contactEmail,

      contactNumber: formValues.contactNumber,
    };
    try {
      await dispatch(employerProfileUpdate(formData));
    } catch (error) {
      // Handle any errors that occur during form submission.
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}

      <Form className={`${css.labelSize} p-4`} onSubmit={handleSubmit}>
        <Form.Group className="mb-4" as={Row} controlId="name">
          <Form.Label column sm={3}>
            Contact Person Name
          </Form.Label>
          <Col sm={1}>:</Col>
          <Col sm={6}>
            {editingField ? (
              <Form.Control
                type="text"
                name="contactPersonName"
                value={formValues.contactPersonName} // Changed from formValues.Name to formValues.name
                onChange={handleChange}
                isInvalid={!!validationErrors.contactPersonName}
              />
            ) : (
              <Form.Control
                plaintext
                readOnly
                defaultValue={formValues.contactPersonName}
              />
            )}
            <Form.Control.Feedback type="invalid">
              {validationErrors.contactPersonName}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group className="mb-4" as={Row} controlId="contactNumber">
          <Form.Label column sm={3}>
            Contact Number
          </Form.Label>
          <Col sm={1}>:</Col>
          <Col sm={6}>
            {editingField ? (
              <Form.Control
                type="text"
                name="contactNumber"
                value={formValues.contactNumber}
                onChange={handleChange}
                isInvalid={!!validationErrors.contactNumber}
              />
            ) : (
              <Form.Control
                plaintext
                readOnly
                defaultValue={formValues.contactNumber}
              />
            )}
            <Form.Control.Feedback type="invalid">
              {validationErrors.contactNumber}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="email">
          <Form.Label column sm={3}>
            Email Address
          </Form.Label>
          <Col sm={1}>:</Col>
          <Col sm={6}>
            {editingField ? (
              <Form.Control
                type="email"
                name="contactEmail"
                value={formValues.contactEmail}
                onChange={handleChange}
                isInvalid={validationErrors["contactEmail"]}
              />
            ) : (
              <Form.Control
                plaintext
                readOnly
                defaultValue={formValues.contactEmail}
              />
            )}
          </Col>
        </Form.Group>

        <Form.Group className="mb-4" as={Row} controlId="contactDesignation">
          <Form.Label column sm={3}>
            Designation
          </Form.Label>
          <Col sm={1}>:</Col>
          <Col sm={6}>
            {editingField ? (
              <Form.Control
                type="text"
                name="contactDesignation"
                value={formValues.contactDesignation}
                onChange={handleChange}
                isInvalid={!!validationErrors.contactDesignation}
              />
            ) : (
              <Form.Control
                plaintext
                readOnly
                defaultValue={formValues.contactDesignation}
              />
            )}
            <Form.Control.Feedback type="invalid">
              {validationErrors.designation}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mt-2" as={Row}>
          {!editingField ? (
            <Col sm={{ span: 3, offset: 9 }}>
              <Button
                type="button"
                className={css.buttonEdit}
                variant="primary"
                onClick={handleEdit}
                disabled={profileUpdateLoading}
              >
                Edit
              </Button>
            </Col>
          ) : (
            <Col sm={{ span: 3, offset: 9 }}>
              <Button
                type="submit"
                className={css.buttonSave}
                variant="primary"
                disabled={
                  profileUpdateLoading ||
                  (validationErrors && Object.keys(validationErrors).length > 0)
                }
              >
                {profileUpdateLoading ? "Saving..." : "Save"}
              </Button>
            </Col>
          )}
        </Form.Group>
      </Form>
    </>
  );
};

export default EmployerContactDetails;
