import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import css from "./JobSeekerPrivacy.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";

const JobSeekerPrivacy = ({ dispatch, jobseekerSettingUpdate }) => {
  const { user, profileLoading, profileUpdateSuccess, profileUpdateError } =
    useSelector((state) => state.user);

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);

  React.useEffect(() => {
    if (profileUpdateError) {
      setFormValues(initialValues);
    }
  }, [profileUpdateSuccess, profileUpdateError, initialValues]);

  React.useEffect(() => {
    const initialValues = {
      makeProfilePublic: user.profile.makeProfilePublic,
      makeProfilePrivate: user.profile.makeProfilePrivate,
      makeProfileAnonymous: user.profile.makeProfileAnonymous,
      jobSearchAlerts: user.profile.jobSearchAlerts,
      desktopNotification: user.profile.desktopNotification,
      emailNotification: user.profile.emailNotification,
    };

    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(initialValues);

    // Update the initial values for radio buttons based on the user data
    copiedValues.makeProfilePublic = user.profile.makeProfilePublic;
    copiedValues.makeProfilePrivate = user.profile.makeProfilePrivate;
    copiedValues.makeProfileAnonymous = user.profile.makeProfileAnonymous;
    copiedValues.jobSearchAlerts = user.profile.jobSearchAlerts;
    copiedValues.desktopNotification = user.profile.desktopNotification;
    copiedValues.emailNotification = user.profile.emailNotification;

    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [user]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value === "true" }); // Convert the string value to a boolean
  };

  const dashboardTab = () => {
    navigate("/dashboard/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      makeProfilePublic: formValues.makeProfilePublic || false,
      makeProfilePrivate: formValues.makeProfilePrivate || false,
      makeProfileAnonymous: formValues.makeProfileAnonymous || false,
      jobSearchAlerts: formValues.jobSearchAlerts || false,
      desktopNotification: formValues.desktopNotification || false,
      emailNotification: formValues.emailNotification || false,
    };
    try {
      await dispatch(jobseekerSettingUpdate(formData));
    } catch (error) {
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
    <div className="mt-4">
      <Form style={{ padding: "1rem 0" }} onSubmit={handleSubmit}>
        <Col md={{ span: 9, offset: 1 }}>
          <Form.Group className="mb-4" controlId="makeProfilePublic">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Make Profile Public :
                </Form.Label>
              </Col>

              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="makeProfilePublic"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="makeProfilePublic"
                  value={true}
                  checked={formValues.makeProfilePublic === true}
                  onChange={handleRoleChange}
                />

                <Form.Check
                  type="radio"
                  id="makeProfilePublic"
                  className={`${css.labelChange} `}
                  label="No"
                  name="makeProfilePublic"
                  value={false}
                  checked={formValues.makeProfilePublic === false}
                  onChange={handleRoleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="makeProfilePrivate">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Make Profile Private :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="makeProfilePrivate"
                  className={`${css.labelChange} `}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="makeProfilePrivate"
                  value={true}
                  checked={formValues.makeProfilePrivate === true}
                  onChange={handleRoleChange}
                />

                <Form.Check
                  type="radio"
                  id="makeProfilePrivate"
                  className={`${css.labelChange} `}
                  label="No"
                  name="makeProfilePrivate"
                  value={false}
                  checked={formValues.makeProfilePrivate === false}
                  onChange={handleRoleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="makeProfileAnonymous">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Make Profile Anonymous :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="makeProfileAnonymous"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="makeProfileAnonymous"
                  value={true}
                  checked={formValues.makeProfileAnonymous === true}
                  onChange={handleRoleChange}
                />

                <Form.Check
                  type="radio"
                  id="makeProfileAnonymous"
                  className={`${css.labelChange}`}
                  label="No"
                  name="makeProfileAnonymous"
                  value={false}
                  checked={formValues.makeProfileAnonymous === false}
                  onChange={handleRoleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="jobSearchAlerts">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Job Search Alerts :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="jobSearchAlerts"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="jobSearchAlerts"
                  value={true}
                  checked={formValues.jobSearchAlerts === true}
                  onChange={handleRoleChange}
                />

                <Form.Check
                  type="radio"
                  id="jobSearchAlerts"
                  className={`${css.labelChange}`}
                  label="No"
                  name="jobSearchAlerts"
                  value={false}
                  checked={formValues.jobSearchAlerts === false}
                  onChange={handleRoleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="desktopNotification">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Desktop Notification :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="desktopNotification"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="desktopNotification"
                  value={true}
                  checked={formValues.desktopNotification === true}
                  onChange={handleRoleChange}
                />

                <Form.Check
                  type="radio"
                  id="desktopNotification"
                  className={`${css.labelChange}`}
                  label="No"
                  name="desktopNotification"
                  value={false}
                  checked={formValues.desktopNotification === false}
                  onChange={handleRoleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="emailNotification">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Email Notification :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="emailNotification"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="emailNotification"
                  value={true}
                  checked={formValues.emailNotification === true}
                  onChange={handleRoleChange}
                />

                <Form.Check
                  type="radio"
                  id="emailNotification"
                  className={`${css.labelChange}`}
                  label="No"
                  name="emailNotification"
                  value={false}
                  checked={formValues.emailNotification === false}
                  onChange={handleRoleChange}
                />
              </Col>
            </div>
          </Form.Group>
        </Col>

        {profileUpdateSuccess && (
          <SuccessAlert message="Data saved successfully!" />
        )}
        {showErrorAlert && <ErrorAlert message={errorMessage} />}
        {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}

        <div className="d-flex justify-content-center  mt-5 mb-3">
          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            onClick={dashboardTab}
          >
            Cancel
          </Button>

          <Button
            disabled={!isFormChanged}
            type="submit"
            variant="primary"
            style={{ width: "5rem" }}
            className="d-inline"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobSeekerPrivacy;
