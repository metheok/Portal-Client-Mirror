import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./JobSeekerAdditional.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";

const JobSeekerAdditional = ({
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

  const [degreeData, setDegreeData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  // New state variables to control the success and error alerts visibility

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);

  const [showValidation, setShowValidation] = useState(false);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    /* 	if (profileUpdateSuccess || profileUpdateError) {
        setEditingField(null);
      } */
    if (profileUpdateError) {
      setFormValues(initialValues);
    }
  }, [profileUpdateSuccess, profileUpdateError, initialValues]);
  React.useEffect(() => {
    if (profileUpdateSuccess && formSubmitSuccess) {
      setFormSubmitSuccess(false);
      nextTab();
      return;
    }
  }, [profileUpdateSuccess, navigate, formSubmitSuccess]);
  React.useEffect(() => {
    const {
      openToRelocate = null,
      openToRemoteWork = null,
      openToBringYourOwnDevice = null,
      currentCtc = "",
      minimumCtc = "",
      openToShift = null,
      passport = null,
      validityPassport = "",
    } = user.profile;
    const initialValues = {
      openToRelocate,
      openToRemoteWork,
      openToBringYourOwnDevice,
      currentCtc,
      minimumCtc,
      openToShift,
      passport,
      validityPassport,
    };
    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(initialValues);
    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [user]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);

    // Handle radio button inputs separately
    if (type === "radio") {
      // Convert the value to a boolean
      const radioValue = value === "true";
      setFormValues({ ...formValues, [name]: radioValue });

      // If the passport radio button is set to "No," empty the passport validity input field
      if (name === "passport" && !radioValue) {
        setFormValues((prevState) => ({
          ...prevState,
          validityPassport: "",
        }));
      }

      return;
    } else {
      // Validation logic goes here
      let newErrors = { ...validationErrors };
      switch (name) {
        case "minimumCtc":
          newErrors.minimumCtc =
            value.trim() === "" ? "minimumCtc is required." : null;
          if (!newErrors.minimumCtc) {
            delete newErrors.minimumCtc;
          }

          break;
        case "currentCtc":
          newErrors.currentCtc =
            value.trim() === "" ? "currentCtc is required." : null;
          if (!newErrors.currentCtc) {
            delete newErrors.currentCtc;
          }

          break;
        case "validityPassport":
          newErrors.validityPassport = !moment(value, "MM/YYYY").isValid()
            ? "Invalid date format. Please use mm/yyyy."
            : null;
          if (!newErrors.validityPassport) {
            newErrors = validationErrors;
            delete newErrors.validityPassport;
          }
          break;

        // Add more cases for additional fields if needed
        default:
          break;
      }
      setValidationErrors(newErrors); // Update the errors state with the new error messages

      setFormValues({ ...formValues, [name]: value });
    }
    // Validate date inputs to allow only mm/yyyy format

    // Handle other input fields
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e, next) => {
    e.preventDefault();
    const { minimumCtc, currentCtc, ...rest } = formValues;
    const formData = {
      ...rest,
      minimumCtc: parseFloat(minimumCtc),
      currentCtc: parseFloat(currentCtc),
    };
    try {
      // Perform the API call using 'formValues'
      await dispatch(jobSeekerProfileUpdate(formData));
      if (next) setFormSubmitSuccess(true);

      // Optionally, show a success message or perform other actions after successful form submission.
      setShowErrorAlert(false); // Hide any existing error alerts
      setErrorMessage("Data saved successfully!");
    } catch (error) {
      // Handle any errors that occur during form submission.
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const previousTab = () => {
    navigate("/dashboard/profile/skills");
  };

  const nextTab = () => {
    navigate("/dashboard/profile/contact");
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: "2.5rem" }} className="mt-4">
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      <Form style={{ backgroundColor: "white" }} onSubmit={handleSubmit}>
        <Col md={{ span: 10, offset: 0 }}>
          <Form.Group className="mb-4" controlId="openToRelocate">
            <div className="d-flex justify-content-start">
              <Col sm={7}>
                <Form.Label className={css.labelChange}>
                  Open to relocate :
                </Form.Label>
              </Col>

              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToRelocate"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToRelocate"
                  value={true}
                  checked={formValues.openToRelocate === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToRelocate"
                  className={`${css.labelChange} `}
                  label="No"
                  name="openToRelocate"
                  value={false}
                  checked={formValues.openToRelocate === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="openToRemoteWork">
            <div className="d-flex justify-content-start">
              <Col sm={7}>
                <Form.Label className={css.labelChange}>
                  Open for remote work :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToRemoteWork"
                  className={`${css.labelChange} `}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToRemoteWork"
                  value={true}
                  checked={formValues.openToRemoteWork === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToRemoteWork"
                  className={`${css.labelChange} `}
                  label="No"
                  name="openToRemoteWork"
                  value={false}
                  checked={formValues.openToRemoteWork === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="openToBringYourOwnDevice">
            <div className="d-flex justify-content-start">
              <Col sm={7}>
                <Form.Label className={css.labelChange}>
                  Open to bring your own device :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToBringYourOwnDevice"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToBringYourOwnDevice"
                  value={true}
                  checked={formValues.openToBringYourOwnDevice === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToBringYourOwnDevice"
                  className={`${css.labelChange}`}
                  label="No"
                  name="openToBringYourOwnDevice"
                  value={false}
                  checked={formValues.openToBringYourOwnDevice === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="currentCtc">
                <Form.Label className={css.labelChange}>
                  CTC - Current CTC:
                </Form.Label>
                <Form.Control
                  type="number"
                  name="currentCtc"
                  value={formValues.currentCtc}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="minimumCtc">
                <Form.Label className={css.labelChange}>
                  Minimum Acceptable CTC:
                </Form.Label>
                <Form.Control
                  type="number"
                  name="minimumCtc"
                  value={formValues.minimumCtc}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="openToShift">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Open for shift :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToShift"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToShift"
                  value={true}
                  checked={formValues.openToShift === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToShift"
                  className={`${css.labelChange}`}
                  label="No"
                  name="openToShift"
                  value={false}
                  checked={formValues.openToShift === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="passport">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>Passport :</Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="passport"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="passport"
                  value={true}
                  checked={formValues.passport === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="passport"
                  className={`${css.labelChange}`}
                  label="No"
                  name="passport"
                  value={false}
                  checked={formValues.passport === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>

          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="validityPassport">
                <Form.Label className={css.labelChange}>
                  Validity if Yes:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="mm/yyyy"
                  value={formValues.validityPassport}
                  name="validityPassport"
                  onChange={handleChange}
                  disabled={!formValues.passport}
                  //isInvalid={}  Apply isInvalid class based on dobIsValid state
                  required
                  style={{ borderRadius: "2px" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide date of Joining.
                </Form.Control.Feedback>
                {validationErrors.validityPassport && (
                  <Form.Text className="text-danger">
                    {validationErrors.validityPassport}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <div className="d-flex justify-content-end  mt-5">
          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            onClick={previousTab}
            disabled={profileUpdateLoading}
          >
            Previous
          </Button>

          <Button
            disabled={
              !isFormChanged || profileUpdateLoading /*||
					 		(validationErrors &&
								Object.keys(validationErrors).length > 0) ||
							editingField */
            }
            type="submit"
            variant="primary"
            style={{ width: "9rem" }}
            className="d-inline"
          >
            {profileUpdateLoading ? "Saving" : "Save Changes"}
          </Button>

          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            disabled={!isFormChanged || profileUpdateLoading}
            onClick={(e) => handleSubmit(e, true)}
          >
            {profileUpdateLoading ? "Saving" : "Save & Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobSeekerAdditional;
