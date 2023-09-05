import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import css from "./RecruiterDetails.module.css";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import UpdateProfilePicture from "../UpdateProfilePicture/UpdateProfilePicture";

const RecruiterDetails = ({
  recruiterProfileUpdate,
  dispatch,
  clearErrors,
  navigate,
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
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  React.useEffect(() => {
    const values = {
      name: user.profile.name,
      dob:
        user.profile.dob && moment(user.profile.dob).isValid()
          ? moment(user.profile.dob).format("DD/MM/YYYY")
          : "",
      username: user.profile.username,
      referredId: user.profile.referredId,
    };
    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [user]);
  React.useEffect(() => {
    if (profileUpdateSuccess && formSubmitSuccess) {
      setFormSubmitSuccess(false);
      navigate("/dashboard/profile/bank");
      return;
    }
  }, [profileUpdateSuccess, navigate, formSubmitSuccess]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEdit = (fieldName) => {
    setEditingField(fieldName);
    dispatch(clearErrors());
  };

  const handleSave = (fieldName) => {
    const errors = cloneDeep(validationErrors);
    switch (fieldName) {
      case "name":
        if (!formValues.name) {
          errors.name = "Please enter name";
        } else {
          delete errors.name;
        }
        break;
      case "dob":
        if (formValues.dob) {
          const dobRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
          const test = dobRegex.test(formValues.dob);
          if (!test || !moment(formValues.dob, "DD/MM/YYYY").isValid()) {
            errors.dob = "Invalid format";
            break;
          } else if (
            moment().diff(moment(formValues.dob, "DD/MM/YYYY"), "years") < 10
          ) {
            errors.dob =
              "DOB should be atleast earlier than 10 years from date";
            break;
          }
          delete errors.dob;
        }
        break;
      case "username":
        if (!formValues.username) {
          errors.username = "Please enter username";
        } else {
          delete errors.username;
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: formValues.name,
      dob:
        formValues.dob && moment(formValues.dob, "DD/MM/YYYY").isValid()
          ? moment(formValues.dob, "DD/MM/YYYY").toISOString()
          : "",
      username: formValues.username,
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
      setFormSubmitSuccess(true);
    } catch (error) {
      // Handle any errors that occur during form submission.
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const renderFullNameField = () => (
    <Form.Group className="mb-3" as={Row} controlId="name">
      <Form.Label column sm={3}>
        Full Name
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "name" ? (
          <Form.Control
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            isInvalid={validationErrors["name"]}
            required
          />
        ) : (
          <Form.Control plaintext readOnly defaultValue={formValues.name} />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["name"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "name" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("name")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            disabled={profileUpdateLoading}
            variant="primary"
            onClick={() => handleEdit("name")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderProfilePictureField = () => (
    <Form.Group className="mt-3 mb-3" as={Row} controlId="profilePicture">
      <Form.Label className="mt-2" column sm={3}>
        Profile Picture
      </Form.Label>
      <Col className="mt-3" sm={1}>
        :
      </Col>
      <Col sm={6}>
        <UpdateProfilePicture disabled={profileUpdateLoading} />
      </Col>
    </Form.Group>
  );
  const renderDateOfBirthField = () => (
    <Form.Group className="mb-3" as={Row} controlId="dob">
      <Form.Label column sm={3}>
        Date Of Birth
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "dob" ? (
          <Form.Control
            type="text"
            placeholder="dd/mm/yyyy"
            value={formValues.dob}
            name="dob"
            onChange={handleChange}
            //isInvalid={}  Apply isInvalid class based on dobIsValid state
            required
          />
        ) : (
          <Form.Control plaintext readOnly defaultValue={formValues.dob} />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["dob"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "dob" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("dob")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("dob")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  /* const renderUsernameField = () => (
    <Form.Group className="mb-3" as={Row} controlId="username">
      <Form.Label column sm={3}>
        User Name
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "username" ? (
          <Form.Control
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            isInvalid={validationErrors["username"]}
            required
          />
        ) : (
          <Form.Control plaintext readOnly defaultValue={formValues.username} />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["username"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "username" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            onClick={() => handleSave("username")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            onClick={() => handleEdit("username")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  ); */
  const renderReferralIdField = () => (
    <Form.Group className="mb-3" as={Row} controlId="referredId">
      <Form.Label column sm={3}>
        Referred Id
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "referredId" ? (
          <Form.Control
            type="referredId"
            name="referredId"
            value={formValues.referredId}
            onChange={handleChange}
            isInvalid={validationErrors["referredId"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.referredId}
          />
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

      <Form className="p-3" onSubmit={handleSubmit}>
        {renderFullNameField()}
        {renderProfilePictureField()}
        {renderDateOfBirthField()}
        {/* {renderUsernameField()} */}
        {renderReferralIdField()}
        <Form.Group as={Row}>
          <Col sm={{ span: 8, offset: 4 }}>
            <Button
              variant="secondary"
              type="button"
              className="me-3"
              style={{ width: "5rem", fontSize: "0.9rem" }}
              onClick={handleCancel}
              disabled={profileUpdateLoading}
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
              type="submit"
              variant="primary"
              style={{ width: "8rem", fontSize: "0.9rem" }}
            >
              {profileUpdateLoading ? "Saving..." : "Save and Next"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default RecruiterDetails;
