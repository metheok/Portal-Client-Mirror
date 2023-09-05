import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import css from "./RecruiterContactDetails.module.css";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { clone, cloneDeep, isEqual } from "lodash";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const RecruiterContactDetails = ({
  recruiterProfileUpdate,
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

  const [editingField, setEditingField] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);

  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [isFormChanged, setIsFromChanged] = useState(false);

  React.useEffect(() => {
    const values = {
      contactEmail: user?.profile?.contactEmail,
      altEmail: user?.profile?.altEmail,
      contactNumber: user?.profile?.contactNumber,
      altContactNumber: user?.profile?.altContactNumber,
      nomineeName: user?.profile?.nomineeName,
      nomineeEmail: user?.profile?.nomineeEmail,
      nomineeContactNumber: user?.profile?.nomineeContactNumber,
    };
    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [user]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);
    switch (name) {
      case "contactEmail":
        setFormValues({ ...formValues, contactEmail: value });
        break;
      case "altEmail":
        setFormValues({ ...formValues, altEmail: value });
        break;
      case "contactNumber":
        setFormValues({ ...formValues, contactNumber: value });
        break;
      case "altContactNumber":
        setFormValues({ ...formValues, altContactNumber: value });
        break;
      case "nomineeName":
        setFormValues({ ...formValues, nomineeName: value });
        break;
      case "nomineeEmail":
        setFormValues({ ...formValues, nomineeEmail: value });
        break;
      case "nomineeContactNumber":
        setFormValues({ ...formValues, nomineeContactNumber: value });
        break;
      default:
        break;
    }
  };

  const handleEdit = (fieldName) => {
    setEditingField(fieldName);
  };
  const handleSave = (fieldName) => {
    const errors = cloneDeep(validationErrors);
    switch (fieldName) {
      case "contactEmail":
        if (!formValues.contactEmail) {
          errors.altEmail = "Please enter valid email";
          break;
        } else if (formValues.contactEmail) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const test = emailRegex.test(formValues.contactEmail);
          if (!test) {
            errors.contactEmail = "Invalid email format";
            break;
          }
        }
        delete errors.contactEmail;

        break;
      case "altEmail":
        if (!formValues.altEmail) {
          errors.altEmail = "Please enter valid email";
          break;
        } else if (formValues.altEmail) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const test = emailRegex.test(formValues.altEmail);
          if (!test) {
            errors.altEmail = "Invalid email format";
            break;
          }
          if (formValues.altEmail == formValues.contactEmail) {
            errors.altEmail =
              "Alternate Email should not be similar to above email";
            break;
          }
        }
        delete errors.altEmail;

        break;
      case "contactNumber":
        if (formValues.contactNumber) {
          const contactNumberRegex = /^\d{10,15}$/;
          const test = contactNumberRegex.test(formValues.contactNumber);

          if (!test) {
            errors.contactNumber = "Invalid number";
            break;
          }
        }
        delete errors.contactNumber;

        break;
      case "altContactNumber":
        if (formValues.altContactNumber) {
          const altContactNumberRegex = /^\d{10,15}$/;
          const test = altContactNumberRegex.test(formValues.altContactNumber);
          if (!test) {
            errors.altContactNumber = "Invalid number";
            break;
          }
        }
        delete errors.altContactNumber;

        break;
      case "nomineeName":
        if (!formValues.nomineeName) {
          errors.nomineeName = "Please enter name";
          break;
        }
        delete errors.nomineeName;

        break;
      case "nomineeEmail":
        if (!formValues.nomineeEmail) {
          errors.nomineeEmail = "Please enter email Id";
          break;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const test = emailRegex.test(formValues.nomineeEmail);
          if (!test) {
            errors.nomineeEmail = "Invalid email format";
            break;
          }
        }
        delete errors.nomineeEmail;

        break;
      case "nomineeContactNumber":
        if (formValues.nomineeContactNumber) {
          const nomineeContactNumberRegex = /^\d{10,15}$/;
          const test = nomineeContactNumberRegex.test(
            formValues.nomineeContactNumber
          );
          if (!test) {
            errors.nomineeContactNumber = "Invalid valid number";
            break;
          }
        }
        delete errors.nomineeContactNumber;

        break;
      default:
        break;
    }
    setValidationErrors(errors);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setFormValues(initialValues);
    setValidationErrors({});
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    const formData = {
      contactEmail: formValues.contactEmail,
      altEmail: formValues.altEmail,
      contactNumber: formValues.contactNumber,
      altContactNumber: formValues.altContactNumber,
      nomineeName: formValues.nomineeName,
      nomineeEmail: formValues.nomineeEmail,
      nomineeContactNumber: formValues.nomineeContactNumber,
    };

    // return;
    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }

    try {
      await dispatch(recruiterProfileUpdate(formData));
    } catch (error) {
      // Handle any errors that occur during form submission.
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const renderContactEmailField = () => (
    <Form.Group className="mb-4" as={Row} controlId="contactEmail">
      <Form.Label column sm={3}>
        Email Id
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "contactEmail" ? (
          <Form.Control
            type="email"
            name="contactEmail"
            value={formValues.contactEmail}
            onChange={handleChange}
            isInvalid={validationErrors["contactEmail"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.contactEmail}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["contactEmail"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "contactEmail" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("contactEmail")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("contactEmail")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderAltEmailField = () => (
    <Form.Group className="mb-4" as={Row} controlId="altEmail">
      <Form.Label column sm={3}>
        Alternate Email Id
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "altEmail" ? (
          <Form.Control
            type="email"
            name="altEmail"
            value={formValues.altEmail}
            onChange={handleChange}
            isInvalid={validationErrors["altEmail"]}
            required
          />
        ) : (
          <Form.Control plaintext readOnly defaultValue={formValues.altEmail} />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["altEmail"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "altEmail" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("altEmail")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("altEmail")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );

  const renderContactNumberField = () => (
    <Form.Group className="mb-4" as={Row} controlId="contactNumber">
      <Form.Label column sm={3}>
        Contact Number
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "contactNumber" ? (
          <Form.Control
            type="number"
            name="contactNumber"
            value={formValues.contactNumber}
            onChange={handleChange}
            isInvalid={validationErrors["contactNumber"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.contactNumber}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["contactNumber"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "contactNumber" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("contactNumber")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("contactNumber")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderAltContactNumberField = () => (
    <Form.Group className="mb-4" as={Row} controlId="altContactNumber">
      <Form.Label column sm={3}>
        Alternate Contact Number
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "altContactNumber" ? (
          <Form.Control
            type="number"
            name="altContactNumber"
            value={formValues.altContactNumber}
            onChange={handleChange}
            isInvalid={validationErrors["altContactNumber"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.altContactNumber}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["altContactNumber"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "altContactNumber" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("altContactNumber")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("altContactNumber")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );

  const renderNomineeNameField = () => (
    <Form.Group className="mb-4" as={Row} controlId="nomineeName">
      <Form.Label column sm={3}>
        Nominee Name
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "nomineeName" ? (
          <Form.Control
            type="text"
            name="nomineeName"
            value={formValues.nomineeName}
            onChange={handleChange}
            isInvalid={validationErrors["nomineeName"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.nomineeName}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["nomineeName"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "nomineeName" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("nomineeName")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("nomineeName")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );

  const renderNomineeEmailIdField = () => (
    <Form.Group className="mb-4" as={Row} controlId="nomineeEmail">
      <Form.Label column sm={3}>
        Nominee Email Id
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "nomineeEmail" ? (
          <Form.Control
            type="email"
            name="nomineeEmail"
            value={formValues.nomineeEmail}
            onChange={handleChange}
            isInvalid={validationErrors["nomineeEmail"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.nomineeEmail}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["nomineeEmail"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "nomineeEmail" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("nomineeEmail")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("nomineeEmail")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );

  const renderNomineeContactNumberField = () => (
    <Form.Group className="mb-4" as={Row} controlId="nomineeContactNumber">
      <Form.Label column sm={3}>
        Nominee Contact Number
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "nomineeContactNumber" ? (
          <Form.Control
            type="number"
            name="nomineeContactNumber"
            value={formValues.nomineeContactNumber}
            onChange={handleChange}
            isInvalid={validationErrors["nomineeContactNumber"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.nomineeContactNumber}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["nomineeContactNumber"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "nomineeContactNumber" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("nomineeContactNumber")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("nomineeContactNumber")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );

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
      <Form className="p-3">
        {renderContactEmailField()}
        {renderAltEmailField()}
        {renderContactNumberField()}
        {renderAltContactNumberField()}
        {renderNomineeNameField()}
        {renderNomineeEmailIdField()}
        {renderNomineeContactNumberField()}

        <Form.Group as={Row}>
          <Col sm={{ span: 6, offset: 6 }}>
            <Button
              variant="secondary"
              className="me-3"
              style={{ width: "5rem", fontSize: "0.9rem" }}
              disabled={profileUpdateLoading}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={
                profileUpdateLoading ||
                !isFormChanged ||
                (validationErrors &&
                  Object.keys(validationErrors).length > 0) ||
                editingField
              }
              type="button"
              onClick={handleSaveAll}
              variant="primary"
              style={{ width: "6rem", fontSize: "0.9rem" }}
            >
              {profileUpdateLoading ? "Saving..." : "Save"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default RecruiterContactDetails;
