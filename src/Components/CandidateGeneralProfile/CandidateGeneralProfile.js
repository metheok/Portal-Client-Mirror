import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from "./CandidateGeneralProfile.module.css";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";
import UploadResumeCandidate from "../UploadResumeCandidate/UploadResumeCandidate";
import axios from "axios";
const CandidateGeneralProfile = ({
  dispatch,
  clearErrors,
  formValues,
  setFormValues,
  nextTab,
}) => {
  const {
    user,
    profileLoading,
    profileUpdateLoading,
    profileUpdateSuccess,
    profileUpdateError,
    userToken,
  } = useSelector((state) => state.user);

  const [resumeName, setResumeName] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);

  const [emailValidLoading, setEmailValidLoading] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [formData, setFormData] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setFormValues({ ...formValues, resume: resumeName });
    setFormData({ ...formData, resume: resumeName });
  }, [resumeName]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);

    // Validation logic goes here
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required." : null;
        if (!newErrors.name) {
          delete newErrors.name;
        }

        break;
      case "nameTitle":
        newErrors.nameTitle = !value ? "Name Title is required." : null;
        if (!newErrors.nameTitle) {
          delete newErrors.nameTitle;
        }

        break;
      case "dob":
        newErrors.dob =
          !/^\d{2}\/\d{2}\/\d{4}$/.test(value) ||
          !moment(value, "DD/MM/YYYY").isValid()
            ? "Invalid date format. Please use dd/mm/yyyy."
            : !(moment().diff(moment(value, "DD/MM/YYYY"), "years") > 10)
            ? "DOB seems to be incorrect"
            : null;
        if (!newErrors.dob) {
          newErrors = errors;
          delete newErrors.dob;
        }
        break;
      case "currentCity":
        newErrors.currentCity =
          value.trim() === "" ? "Current City is required." : null;
        if (!newErrors.currentCity) {
          newErrors = errors;
          delete newErrors.currentCity;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(value);
        setEmailValidError(false);
        newErrors = {
          ...newErrors,
          ...{ email: isValidEmail ? "" : "Invalid email format" },
        };

        if (isValidEmail) {
          delete newErrors.email;
        }
        break;

      // Add more cases for additional fields if needed
      default:
        break;
    }
    setErrors(newErrors); // Update the errors state with the new error messages

    setFormData({ ...formData, [name]: value });

    setFormValues({ ...formValues, [name]: newErrors[name] ? "" : value });
  };

  const handleEmailValid = async (emailId) => {
    setEmailValidError(false);
    setEmailValid(false);

    try {
      setEmailValidLoading(true);
      const resp = await axios.get(
        `/api/recruiter/candidate/get-email-validity/${emailId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const isValid = resp.data?.isValid;

      if (!isValid) {
        throw "not valid";
      }
      setEmailValid(true);
      setEmailValidLoading(false);
      setFormValues({ ...formValues, validatedEmail: formValues.email });
      setFormData({ ...formData, validatedEmail: formData.email });
    } catch (error) {
      setEmailValidLoading(false);
      setEmailValid(false);

      setEmailValidError(true);
      console.error("Error validating email:", error);
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
      <Form style={{ padding: "2rem 2.5rem 0", backgroundColor: "white" }}>
        {profileUpdateSuccess && (
          <SuccessAlert message="Data saved successfully!" />
        )}
        {showErrorAlert && <ErrorAlert message={errorMessage} />}
        {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}

        <Col sm={{ span: 10, offset: 0 }}>
          <Row className="mb-3">
            <Col sm={9}>
              <Form.Group controlId="email">
                <Form.Label className={css.labelChange}>Email Id :</Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />

                {errors.email && (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                )}
                {emailValidError && (
                  <Form.Text className="text-danger">
                    {"User with email already exists"}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col>
              <button
                disabled={
                  !formData.email ||
                  errors.email ||
                  fileUploading ||
                  emailValidLoading
                }
                type="button"
                onClick={(e) => handleEmailValid(formData.email)}
              >
                {emailValidLoading
                  ? "validating..."
                  : emailValid && formValues.email == formValues.validatedEmail
                  ? "validated"
                  : "validate"}
              </button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={3} style={{ paddingRight: "0" }}>
              <Form.Group controlId="nameTitle">
                <Form.Label className={css.labelChange}>Title :</Form.Label>
                <Form.Select
                  name="nameTitle"
                  value={formData.nameTitle}
                  onChange={handleChange}
                  className="custom-select"
                  required
                  style={{ borderRadius: "2px" }}
                >
                  <option value="">select</option>
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </Form.Select>
                {errors.nameTitle && (
                  <Form.Text className="text-danger">
                    {errors.nameTitle}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col sm={9}>
              <Form.Group controlId="name">
                <Form.Label className={css.labelChange}>Full Name :</Form.Label>

                <Form.Control
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />

                {errors.name && (
                  <Form.Text className="text-danger">{errors.name}</Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }}>
              <Form.Group controlId="dob">
                <Form.Label className={css.labelChange}>
                  Date of Birth :
                </Form.Label>
                <Form.Control
                  dateFormat="dd/MM/yyyy"
                  name="dob"
                  required
                  placeholder="dd/mm/yyyy"
                  value={formData.dob}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.dob && (
                  <Form.Text className="text-danger">{errors.dob}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="currentCity">
                <Form.Label className={css.labelChange}>
                  Current City :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="currentCity"
                  required
                  value={formData.currentCity}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.currentCity && (
                  <Form.Text className="text-danger">
                    {errors.currentCity}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4 mt-5">
            <Row>
              <Col
                className="mt-2"
                style={{ display: "grid", alignItems: "start" }}
                sm={4}
              >
                <Form.Label className={css.labelChange}>
                  Resume Upload :
                </Form.Label>
              </Col>
              <Col className="" sm={6}>
                <UploadResumeCandidate
                  fileName={resumeName}
                  setFileName={setResumeName}
                  fileUploading={fileUploading}
                  setFileUploading={setFileUploading}
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <div className="d-flex justify-content-end  mt-5">
          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            // onClick={dasBoardTab}
            disabled={profileUpdateLoading}
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            disabled={
              fileUploading ||
              !formValues.validatedEmail ||
              !formValues.nameTitle ||
              !formValues.name ||
              !formValues.dob ||
              !formValues.currentCity ||
              !formValues.resume ||
              profileUpdateLoading ||
              (errors && Object.keys(errors).length > 0)
            }
            onClick={(e) => nextTab()}
          >
            {" Next"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CandidateGeneralProfile;
