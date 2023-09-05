import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from "./JobseekerGeneralProfile.module.css";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";
import UpdateProfilePicture from "../UpdateProfilePicture/UpdateProfilePicture";
import UploadResume from "../UploadResume/UploadResume";
const JobseekerGeneralProfile = ({
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
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);

  const navigate = useNavigate();
  React.useEffect(() => {
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
    const values = {
      nameTitle: user.profile.nameTitle,
      name: user.profile.name,
      dob:
        user.profile.dob && moment(user.profile.dob).isValid()
          ? moment(user.profile.dob).format("DD/MM/YYYY")
          : "",
      currentCity: user.profile.currentCity,
    };
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

    // Validation logic goes here
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required." : null;
        if (!newErrors.name) {
          delete newErrors.name;
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
      // Add more cases for additional fields if needed
      default:
        break;
    }
    setErrors(newErrors); // Update the errors state with the new error messages

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e, next) => {
    e.preventDefault();
    const formData = {
      nameTitle: formValues.nameTitle,
      name: formValues.name,
      dob:
        formValues.dob && moment(formValues.dob).isValid()
          ? moment(formValues.dob).format("DD/MM/YYYY")
          : "",
      currentCity: formValues.currentCity,
    };

    if (Object.values(errors).some((error) => error !== null)) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }

    try {
      await dispatch(jobSeekerProfileUpdate(formData));
      if (next) setFormSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const dasBoardTab = () => {
    navigate("/dashboard");
  };

  const nextTab = () => {
    navigate("/dashboard/profile/education");
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
      <Form
        style={{ padding: "2rem 2.5rem 0", backgroundColor: "white" }}
        onSubmit={handleSubmit}
      >
        {profileUpdateSuccess && (
          <SuccessAlert message="Data saved successfully!" />
        )}
        {showErrorAlert && <ErrorAlert message={errorMessage} />}
        {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
        <Col sm={{ span: 10, offset: 0 }}>
          <Row className="mb-3">
            <Col xs={3} style={{ paddingRight: "0" }}>
              <Form.Group controlId="nameTitle">
                <Form.Label className={css.labelChange}>Title :</Form.Label>
                <Form.Select
                  name="nameTitle"
                  value={formValues.nameTitle}
                  onChange={handleChange}
                  className="custom-select"
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
                  value={formValues.name}
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
                  placeholder="dd/mm/yyyy"
                  value={formValues.dob}
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
                  value={formValues.currentCity}
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
                  Profile Picture :
                </Form.Label>
              </Col>
              <Col className="" sm={6}>
                <UpdateProfilePicture disabled={profileUpdateLoading} />
              </Col>
            </Row>
          </Form.Group>

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
                <UploadResume disabled={profileUpdateLoading} />
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <div className="d-flex justify-content-end  mt-5">
          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            onClick={dasBoardTab}
            disabled={profileUpdateLoading}
          >
            Cancel
          </Button>

          <Button
            disabled={
              !isFormChanged ||
              profileUpdateLoading ||
              (errors && Object.keys(errors).length > 0)
            }
            type="submit"
            variant="primary"
            className="d-inline"
          >
            {profileUpdateLoading ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            disabled={
              !isFormChanged ||
              profileUpdateLoading ||
              (errors && Object.keys(errors).length > 0)
            }
            onClick={(e) => handleSubmit(e, true)}
          >
            {profileUpdateLoading ? "Saving..." : "Save & Next"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default JobseekerGeneralProfile;
