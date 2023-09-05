import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const RecruiterChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPasswordError, setShowOldPasswordError] = useState(false);
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSave = () => {
    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (
      newPassword.length >= 8 &&
      passwordRegex.test(newPassword) &&
      newPassword === confirmNewPassword
    ) {
      // Password change logic here (e.g., API call)
      setShowOldPasswordError(false);
      setShowNewPasswordError(false);
      setShowConfirmPasswordError(false);

      // Make the POST request to save the data

      // if successfully data is send please show an alert here
      alert(`Your password has been changed successfully.`);
    } else {
      setShowOldPasswordError(true);
      setShowNewPasswordError(true);
      setShowConfirmPasswordError(true);
    }
  };

  return (
    <Form className="p-3">
      <Form.Group className="mb-5 mt-5" as={Row} controlId="oldPassword">
        <Form.Label column sm={4}>
          Enter Old Password
        </Form.Label>
        <Col sm={1}> :</Col>
        <Col sm={6}>
          <Form.Control
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            isInvalid={showOldPasswordError}
            placeholder="Enter your old password"
          />
          {showOldPasswordError && (
            <Form.Control.Feedback type="invalid">
              Please enter your old password.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-5" controlId="newPassword">
        <Form.Label column sm={4}>
          Enter New Password
        </Form.Label>
        <Col sm={1}> :</Col>
        <Col sm={6}>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            isInvalid={showNewPasswordError}
            placeholder="Enter your new password"
          />
          {showNewPasswordError && (
            <Form.Control.Feedback type="invalid">
              must contain at least 8 to 21 characters, ex-Password12@
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-5" controlId="confirmNewPassword">
        <Form.Label column sm={4}>
          Confirm New Password
        </Form.Label>
        <Col sm={1}> :</Col>
        <Col sm={6}>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            isInvalid={showConfirmPasswordError}
            placeholder="Confirm your new password"
          />
          {showConfirmPasswordError && (
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Form.Group className="mt-5" as={Row}>
        <Col sm={{ span: 2, offset: 10 }}>
          <Button
            style={{ width: "5rem" }}
            variant="primary"
            onClick={handleSave}
          >
            Save
          </Button>{" "}
        </Col>
      </Form.Group>
    </Form>
  );
};

export default RecruiterChangePassword;
