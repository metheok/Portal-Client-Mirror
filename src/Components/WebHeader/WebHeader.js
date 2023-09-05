import React, { useState } from "react";
import {
  Image,
  Navbar,
  Container,
  Button,
  Form,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import LogoImg from "../../images/Header/LogoImg.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userLogin } from "../../state/auth/authActions";
import css from "./WebHeader.module.css";


const WebHeader = ({ navLinks }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { loading, loginError } = useSelector((state) => state.auth);
  const { user, userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      return;
    }

    if (email && password) {
      await dispatch(userLogin({ email, password, rememberMe }));
    }
  };

  return (
    <>
      <style>
        {`
        .custom-nav {
          display: flex;
        margin: 0;
        padding: 0;
        }

        .custom-nav-item {
          margin: 0 10px; 
        padding: 10px 0; 
          }`}
      </style>
      <Navbar expand="md" className="bg-body-tertiary fixed-top">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <Image
                alt="logo"
                src={LogoImg}
                className={css.logo}
              />
            </Navbar.Brand>
          </Link>

          {navLinks.map((link, index) => (
            <Link key={index} to={`/${link.Link}`}>
              <div key={link.name}>
                <span style={{ margin: "0" }} className={css.NavbarItems}>{link.name}</span>
              </div>
            </Link>
          ))}

          {!user?.user?.user && (
            <Dropdown className="login-dropdown">
              <Dropdown.Toggle
                variant="outline-primary"
                id="dropdown-menu-align-responsive-1"
                className={css.loginButton}
              >
                <span>Login </span>
              </Dropdown.Toggle>
              <Dropdown.Menu align={{ sm: "start" }}>
                <Form validated={validated} noValidate onSubmit={handleLogin}>
                  <Form.Group className="mb-1">
                    <Form.Label htmlFor="email">Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!email && validated}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="password">Password : </Form.Label>
                    <div className="input-password-value">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!password && validated}
                        name="password"
                        minLength={8}
                        required
                      />

                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        style={{ width: "30px", padding: "0", zIndex: "1" }}
                        className="button-password-position mt-1 me-4"
                      >
                        <i
                          className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                        ></i>
                      </button>

                      <Form.Control.Feedback type="invalid">
                        invalid password or email.
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  {loginError && (
                    <span className={css.error}>Invalid Credentials</span>
                  )}
                  <div className="login-menu-bottom">
                    <Form.Group controlId="rememberMe">
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                      />
                    </Form.Group>
                    <a href="#forgotPassword">Forgot Password?</a>
                    <Button variant="primary" type="submit" >
                      {loading ? (
                        <Spinner animation="border" variant="primary" />
                      ) : (
                        " Log in"
                      )}
                    </Button>
                  </div>
                </Form>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {!user?.user?.user && (
            <Link to={"/register"}>
              <Button variant="primary" className={css.RegisterButton} >Register</Button>
            </Link>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default WebHeader;
