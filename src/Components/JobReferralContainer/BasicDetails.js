import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from "./JobReferralContainer.module.css";

export default function BasicDetails({
  formData,
  dispatch,
  setFormData,
  handleFormChange,
  jobData,
  errorMessages,
  setJobData,
  userState,
  recruiterJobReferralState,
  recruiterJobsState,
  showErrorAlert,
  loading,
  onVerifyEmail,
  applicantData,
  onFillFromUser,
}) {
  const {
    createReferralLoading,
    createReferralSuccess,
    createReferralError,
    verifyEmailLoading,
    verifyEmailSuccess,
    verifyEmailError,
    resumeUploadLoading,
    resumeUploadSuccess,
    resumeUploadError,
    coverLetterUploadLoading,
    coverLetterUploadSuccess,
    coverLetterUploadError,
  } = recruiterJobReferralState;

  return (
    <Form style={{ padding: "1rem 2.5rem 0", backgroundColor: "white" }}>
      <Col sm={{ span: 10, offset: 0 }}>
        <Row className={`mb-1 mt-1`}>
          <h2 className={css.title}>Basic Details</h2>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label className={css.labelChange}>Full Name :</Form.Label>

              <Form.Control
                type="text"
                name="name"
                required
                disabled={
                  formData.hasDBData &&
                  formData.email === formData.validatedEmail &&
                  applicantData.user.email
                }
                value={formData.name}
                onChange={handleFormChange}
                style={{ borderRadius: "2px" }}
              />

              {showErrorAlert && errorMessages.name && (
                <Form.Text className="text-danger">
                  {errorMessages.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label className={css.labelChange}>Email Id :</Form.Label>

              <Form.Control
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                style={{ borderRadius: "2px" }}
              />

              {showErrorAlert && errorMessages.email && (
                <Form.Text className="text-danger">
                  {errorMessages.email}
                </Form.Text>
              )}
              {verifyEmailError && (
                <Form.Text className="text-danger">
                  "Failed to Verify Email, Please try again"
                </Form.Text>
              )}
              {showErrorAlert && errorMessages.validateEmail && (
                <Form.Text className="text-danger">
                  {errorMessages.validateEmail}
                </Form.Text>
              )}
              <Row>
                {formData.emailValid && (
                  <Form.Text className="text-success">
                    {formData.emailValid}
                  </Form.Text>
                )}
                {errorMessages.emailValid && (
                  <Form.Text className="text-danger">
                    {errorMessages.emailValid}
                  </Form.Text>
                )}
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label className={css.labelChange}>
                Contact Number :
              </Form.Label>

              <Form.Control
                type="text"
                name="contact"
                required
                value={formData.contact}
                disabled={
                  formData.hasDBData &&
                  formData.email === formData.validatedEmail &&
                  applicantData.user.email
                }
                onChange={handleFormChange}
                style={{ borderRadius: "2px" }}
              />

              {showErrorAlert && errorMessages.contact && (
                <Form.Text className="text-danger">
                  {errorMessages.contact}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 px-3">
          <button
            type="button"
            onClick={onVerifyEmail}
            disabled={
              !formData.email ||
              errorMessages.email ||
              loading ||
              (applicantData?.user?.email
                ? formData.email === applicantData.user.email
                : false)
            }
            className={`btn btn-sm  btn-primary ${css.buttonVerify}`}
          >
            {verifyEmailLoading ? "Verifying..." : "Check email"}
          </button>
        </Row>
        {formData.email === applicantData?.user?.email &&
          formData.email === formData.validatedEmail && (
            <Row className="mb-3 px-3">
              <Form.Check
                type="checkbox"
                label="Fill from Database"
                name="fromDB"
                className={`${css.labelChange} mx-3`}
                checked={formData.fromDB}
                onChange={(e) => {
                  setFormData((pValue) => {
                    return {
                      ...pValue,
                      fromDB: e.target.checked,
                    };
                  });
                  if (e.target.checked) {
                    onFillFromUser();
                  }
                }}
              />
            </Row>
          )}
      </Col>
    </Form>
  );
}
