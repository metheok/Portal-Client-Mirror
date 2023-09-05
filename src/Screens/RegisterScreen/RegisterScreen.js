import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./RegisterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { Navigate } from "react-router";
import { logoutAndClearUser } from "../../state/auth/authSlice";

const RegisterScreen = () => {
  const { state: locationState } = useLocation();
  const registerHandler = (e) => {
    e?.preventDefault();
    setShowRegister(true);
    setShowLogin(false);
  };

  const loginHandler = (e) => {
    e?.preventDefault();
    setShowRegister(false);
    setShowLogin(true);
  };
  useEffect(() => {
    if (locationState?.to === "login") {
      loginHandler();
    } else if (locationState?.to === "register") {
      registerHandler();
    }
  }, [locationState]);
  const { loading, loginError, signupError } = useSelector(
    (state) => state.auth
  );
  const { user, profileLoading } = useSelector((state) => state.user);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      signupError === null &&
      loginError === "Request failed with status code 401"
    ) {
      setShowLogin(true);
      setShowRegister(false);
    }
  }, []);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!loading && !profileLoading && !user) {
      dispatch(logoutAndClearUser());
    }
  }, [dispatch, profileLoading, loading, user]);
  if (loading) {
    console.log("loading");
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Container className={css.headerHight}>
        <Row>
          {isMobile ? (
            <Col lg={12}>
              {showRegister && (
                <RegisterForm loginHandler={loginHandler} isMobile={isMobile} />
              )}
              {showLogin && (
                <LoginForm
                  registerHandler={registerHandler}
                  isMobile={isMobile}
                  stayOnLogin={loginError}
                />
              )}
            </Col>
          ) : (
            <>
              <Col lg={7}>
                <RegisterForm />
              </Col>
              <Col className={css.verticalLineParent} lg={1}>
                <div className={css.verticalLine}></div>
              </Col>
              <Col lg={4}>
                <LoginForm />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default RegisterScreen;
