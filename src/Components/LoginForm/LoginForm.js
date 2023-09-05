import React, { useState } from "react";
import { Col, Form, Button, Container, Spinner, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../state/auth/authActions";
import css from "./LoginForm.module.css";

const LoginForm = ({ registerHandler, isMobile, stayOnLogin }) => {
  const dispatch = useDispatch();
  const { loading, loginError } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeLogin = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      if (loginError && stayOnLogin) {
        return;
      } else {
        return;
      }
    }

    if (email && password) {
      dispatch(userLogin({ email, password, rememberMe }));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="login-form mt-2 py-2">
      <Col className="mt-5">
        {isMobile && <h1 className={css.heading} >Log in to your Account</h1>}
        {isMobile && <h1 className={css.subHeading} >Welcome back, please enter your details.</h1>}

        {!isMobile && <h6
          className="d-flex justify-content-center"
          style={{ fontWeight: "700" }}
        >
          Already Registered?
        </h6>}
        {!isMobile && <h6
          className="mb-5 d-flex justify-content-center"
          style={{ fontWeight: "700" }}
        >
          Log in to your Account
        </h6>
        }
        <Form noValidate validated={validated} onSubmit={handleLogin}>
          <Form.Group className={css.input}>
            <Form.Label htmlFor="loginEmail" className={css.inputHeading}>Email Address:</Form.Label>
            <Form.Control
              onChange={handleChangeLogin}
              name="email"
              type="email"
              id="loginEmail"
              value={email}
              required
            />
            <Form.Control.Feedback type="invalid" className={css.error}>
              Please enter a valid email address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={css.input}>
            <Form.Label htmlFor="password" className={css.inputHeading}>Password : </Form.Label>
            <div className="input-password-value">
              <Form.Control
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChangeLogin}
                value={password}
                minLength={8}
                required
              />

              <button
                onClick={toggleShowPassword}
                type="button"
                style={{ width: "30px", padding: "0", zIndex: "1" }}
                className="button-password-position mt-1 me-4"
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>

              <Form.Control.Feedback type="invalid" className={css.error}>
                Please enter a password with at least 8 characters.
              </Form.Control.Feedback>
            </div>
          </Form.Group>
          {loginError && <span className={css.error}>Invalid Credentials</span>}
          <Row className="login-menu-bottom-screen mt-2">
            <Col xs={6} md={4} >
              <Form.Group controlId="rememberMe">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={4}  >
              <a href="#forgotPassword" className={css.passwordLink}>Forgot Password?</a>
            </Col>
            <Col sm={12} md={4} >
              <Button variant="primary" className={isMobile ? `${css.loginButton} w-100 h-50` : ''} type="submit" size={'lg'}>
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <span className={css.buttonFont}>Log in</span>
                )}
              </Button>
              {isMobile && <span className={css.alreadyAccount}>
                Already have an account?
                <button onClick={(e) => (registerHandler(e))} className={css.linkButton} type="button">
                  Sign Up
                </button>
              </span>}
            </Col>


          </Row>
        </Form>
      </Col>
    </Container>
  );
};

export default LoginForm;
