import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../state/auth/authActions";
import css from "./RegisterForm.module.css";
import ToastMessage from "../ToastMessage/ToastMessage";

const RegisterForm = ({ isMobile, loginHandler }) => {
  const dispatch = useDispatch();
  const { signupSuccess, loading, signupError } = useSelector(
    (state) => state.auth
  );
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setuserType] = useState("");
  const [referred, setReferred] = useState("no");
  const [referralId, setReferralId] = useState("");
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showToast, setShowToast] = useState(false);


  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    setPassword("");
    setEmail("");
    setConfirmPassword("");
    setname("");
  }, [signupSuccess]);
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};‘:“\\|,.<>?]).{8,21}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRoleChange = (event) => {
    setuserType(event.target.value);
  };

  const handleReferredRoleChange = (e) => {
    setReferred(e.target.value);
  };

  const handleReferredId = (e) => {
    const inputValue = e.target.value;
    setReferralId(inputValue);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!userType) {
      handleShowToast();
    } else {
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        setValidated(true);
        return;
      }

      if (!passwordRegex.test(password)) {
        setShowPasswordError(true);
        setValidated(false);
        return;
      }

      if (password !== confirmPassword) {
        setValidated(false);
        return;
      }

      setShowPasswordError(false);

      if (email && password && name && userType) {
        dispatch(
          registerUser({
            email,
            password,
            name,
            userType,
            referralId:
              referred == "yes" && referralId && userType === "jobseeker"
                ? referralId
                : null,
          })
        );
      }
    }
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const signupErrorMessage =
    signupError == "Data validation error" ||
      signupError == "User with email already exists"
      ? signupError
      : signupError == "Referral ID incorrect"
        ? "Referral ID incorrect. Please check and try again"
        : "Error in registering user. Please try again";
  return (
    <Container className={`${css.registerForm}  employer-form`} >
      <Row>
        <div>
          {signupSuccess ? (
            <Alert variant="success" className={css.alert}>Registration Successful</Alert>
          ) : signupError ? (
            <Alert variant="danger" className={css.alert}>{signupErrorMessage}</Alert>
          ) : null}
        </div>
        <Col>
          {isMobile && <h1 className={css.heading} >Create an account</h1>}
          {isMobile && <h1 className={css.subHeading} >Please enter your details.</h1>}
          {!isMobile && <h6 className="mb-4" style={{ fontWeight: "700" }}>
            Register today.
          </h6>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col sm={12} md={6} className={css.input}>
                <Form.Label htmlFor="name" className={css.inputHeading}>Full Name :</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="name"
                  type="text"
                  id="name"
                  value={name}
                  required
                />
                <Form.Control.Feedback type="invalid" className={css.error}>
                  Please enter your full name.
                </Form.Control.Feedback>
              </Col>
              <Col >
                <Form.Label htmlFor="email" className={css.inputHeading}>Email Id :</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="email"
                  type="email"
                  id="email"
                  value={email}
                  required
                />
                <Form.Control.Feedback type="invalid" className={css.error}>
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col sm={12} md={6} className={css.input}>
                <Form.Group>
                  <Form.Label htmlFor="password" className={css.inputHeading}>Password : </Form.Label>
                  <div className="input-password-value">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={handleChange}
                      value={password}
                      minLength={8}
                      required
                      isInvalid={showPasswordError}
                    />

                    <button
                      onClick={toggleShowPassword}
                      style={{ width: "30px", padding: "0", zIndex: "1" }}
                      className="button-password-position mt-1 me-4"
                    >
                      <i
                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                      ></i>
                    </button>

                    <Form.Control.Feedback type="invalid" className={css.error}>
                      {showPasswordError
                        ? "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
                        : "Please enter a password with at least 8 characters."}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label htmlFor="confirmPassword" className={css.inputHeading}>
                  Confirm Password :
                </Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={confirmPassword}
                  minLength={8}
                  required
                  isInvalid={password != confirmPassword}
                />
                <Form.Control.Feedback type="invalid" className={css.error}>
                  Please enter the same password as above.
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Row className="mt-4">
              <div className="d-flex d-inline-block align-items-center ">
                <p className={css.registerAs}>
                  Register as:
                </p>
                <div className={css.referredRadio}>
                  <input
                    type="radio"
                    className={css.radioInput}
                    id="jobseeker"
                    name="role"
                    value="jobseeker"
                    checked={userType === "jobseeker"}
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="jobseeker" className={css.radioLabel}>Jobseeker</label>
                  {/*  <Form.Check
                  type="radio"
                  id="jobseeker"
                  label="Jobseeker"
                  className={css.radio}
                  
                /> */}
                  <input
                    type="radio"
                    className={css.radioInput}
                    name="role"
                    value="recruiter"
                    checked={userType === "recruiter"}
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="recruiter" className={css.radioLabel}>Recruiter</label>
                  {/* <Form.Check
                  type="radio"
                  id="recruiter"
                  label="Recruiter"
                  className={css.radio}
                  name="role"
                  value="recruiter"
                  checked={userType === "recruiter"}
                  onChange={handleRoleChange}
                /> */}
                  <input
                    type="radio"
                    className={css.radioInput}
                    name="role"
                    value="employer"
                    checked={userType === "employer"}
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="employer" className={css.radioLabel}>Employer</label>

                  {/* <Form.Check
                  type="radio"
                  id="employer"
                  label="Employer"
                  className={css.radio}
                  name="role"
                  value="employer"
                  checked={userType === "employer"}
                  onChange={handleRoleChange}
                /> */}
                </div>
              </div>
            </Row>

            <Row
              style={userType === "jobseeker" ? {} : { visibility: "hidden" }}
              className="mt-3"
            >
              <Col >
                <div className={css.registerContainer}>
                  <p
                    className={css.isRegistered}
                  >
                    Is Referred:
                  </p>
                  <div className={css.referredRadio}>
                    <input
                      type="radio"
                      className={css.radioInput}
                      name="referred"
                      value="no"
                      checked={referred === "no"}
                      onChange={handleReferredRoleChange}
                    />
                    <label htmlFor="no" className={css.radioLabel}>No</label>
                  </div>
                  <div className={css.referredRadio}>
                    <input
                      type="radio"
                      className={css.radioInput}
                      name="referred"
                      value="yes"
                      checked={referred === "yes"}
                      onChange={handleReferredRoleChange}
                    />
                    <label htmlFor="yes" className={css.radioLabel}>Yes</label>
                  </div>

                </div>
              </Col>
              <Col className={css.referredIdCol} style={referred === "yes" ? {} : { visibility: "hidden" }}>
                <div>
                  <Form.Group id="referred">
                    <Form.Control
                      type="text"
                      placeholder="Enter Referral ID"
                      className={css.referredId}
                      id="referred"
                      name="referred"
                      onChange={handleReferredId}
                      value={referralId}
                      minLength={8}
                    />
                    <Form.Control.Feedback type="invalid" className={css.error}>
                      Please enter a valid referred Id.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>

            <div className="d-flex flex-column mt-3 mb-1">
              <Button className={!isMobile ? `${css.registerButton}` : `${css.registerButton} w-100`} type="submit" variant="primary">
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) :
                  (
                    isMobile ? `Sign Up` : `Register`
                  )
                }
              </Button>
              {isMobile && <span className={css.alreadyAccount}>
                Already have an account?
                <button onClick={(e) => {
                  e.preventDefault();
                  loginHandler(e)
                }}
                  className={css.linkButton}
                  type="button" >
                  Login
                </button>
              </span>}
              <ToastMessage
                show={showToast}
                onClose={() => setShowToast(false)}
                message="Please Select Register As!"
              />
            </div>
          </Form>
        </Col>

      </Row>
    </Container>
  );
};

export default RegisterForm;
