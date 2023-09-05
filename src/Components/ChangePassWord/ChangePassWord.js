import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../state/auth/authActions";
import css from "./Changepassword.module.css";
import { isLoading } from "../../state/auth/authSlice";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
const ChangePassWord = ({ navigate, isMobile }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const isLoadingTrue = useSelector(isLoading);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPasswordError, setShowOldPasswordError] = useState(false);
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const clearForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    clearErrors();
  };
  useEffect(() => {
    if (auth.updatePasswordSuccess) {
      clearForm();
      setPasswordChangeSuccess(true);
    }
    if (auth.updatePasswordError) {
      setShowOldPasswordError(true);
    }
  }, [auth]);
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
  const clearErrors = () => {
    setShowOldPasswordError("");
    setShowNewPasswordError("");
    setShowConfirmPasswordError("");
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSave = async () => {
    // Password validation
    setPasswordChangeSuccess(false);
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).{8,21}$/;

    if (!passwordRegex.test(newPassword)) {
      setShowNewPasswordError(true);
      return;
    }
    if (newPassword != confirmNewPassword) {
      setShowConfirmPasswordError(true);
    }

    setShowOldPasswordError(false);
    setShowNewPasswordError(false);
    setShowConfirmPasswordError(false);
    clearErrors();
    await dispatch(updatePassword({ oldPassword, newPassword }));
  };

  const handleBack = () => {
    navigate("/dashboard/settings/security");
  };

  return (
    <>
      {isMobile ?
        (
          <>
            <div className={`${css.passwordContainer}  p-3 d-flex flex-column vh-100`}>
              <Link to='/dashboard'>
                <span className={css.backArrow}><BiArrowBack /></span>
              </Link>
              <h1 className={`${css.basicHeading}  mt-2`}>Change Password</h1>
              <Form style={{ backgroundColor: 'white', flex: 1 }}>
                <Form.Group className="mb-4 mt-4" as={Row} controlId="oldPassword">
                  <Form.Label column sm={4} className={css.Label}>
                    Enter Old Password
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      type="password"
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                      isInvalid={showOldPasswordError}
                      className={css.singleLine}
                    />
                    {showOldPasswordError && (
                      <Form.Control.Feedback type="invalid">
                        Old Password not correct.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="newPassword">
                  <Form.Label column sm={4} className={css.Label}>
                    Enter New Password
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      isInvalid={showNewPasswordError}
                      className={css.singleLine}
                    />
                    {showNewPasswordError && (
                      <Form.Control.Feedback type="invalid">
                        must contain at least 8 to 21 characters, ex-Password12@
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="confirmNewPassword">
                  <Form.Label column sm={4} className={css.Label}>
                    Confirm New Password
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      type="password"
                      value={confirmNewPassword}
                      onChange={handleConfirmNewPasswordChange}
                      isInvalid={showConfirmPasswordError}
                      className={css.singleLine}
                    />
                    {showConfirmPasswordError && (
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>
                {passwordChangeSuccess && (
                  <p className={css.success}>Passwords changed successfully!</p>
                )}
              </Form>
              <div className="mt-auto">
                <Form.Group className="mt-5 d-flex justify-content-end float-end" as={Row}>
                  <Col >
                    <Button
                      variant="secondary"
                      className="me-3"
                      style={{ width: "5rem", fontSize: "0.9rem" }}
                      onClick={handleBack}
                      disabled={isLoadingTrue}
                    >
                      Back
                    </Button>
                    <Button
                      style={{ width: "5rem" }}
                      variant="primary"
                      disabled={
                        isLoadingTrue ||
                        !(oldPassword && newPassword && confirmNewPassword)
                      }
                      onClick={handleSave}
                    >
                      {isLoadingTrue ? "Saving..." : "Save"}
                    </Button>{" "}
                  </Col>
                </Form.Group>
              </div>
            </div>
          </>
        )
        :
        (
          <>
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
                      Old Password not correct.
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
              {passwordChangeSuccess && (
                <p className={css.success}>Passwords changed successfully!</p>
              )}
              <Form.Group className="mt-5" as={Row}>
                <Col sm={{ span: 8, offset: 4 }}>
                  <Button
                    variant="secondary"
                    className="me-3"
                    style={{ width: "5rem", fontSize: "0.9rem" }}
                    onClick={handleBack}
                    disabled={isLoadingTrue}
                  >
                    Back
                  </Button>
                  <Button
                    style={{ width: "5rem" }}
                    variant="primary"
                    disabled={
                      isLoadingTrue ||
                      !(oldPassword && newPassword && confirmNewPassword)
                    }
                    onClick={handleSave}
                  >
                    {isLoadingTrue ? "Saving..." : "Save"}
                  </Button>{" "}
                </Col>
              </Form.Group>
            </Form>
          </>
        )}
    </>
  );
};

export default ChangePassWord;
