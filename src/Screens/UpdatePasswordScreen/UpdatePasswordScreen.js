import React from "react";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Alert } from "react-bootstrap";

import EmptyCard from "../../components/EmptyCard/EmptyCard";
import UpdatePassword from "../../components/UpdatePassword/UpdatePassword";

import { Row, Col, Container } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const UpdatePasswordScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { user, profileLoading } = useSelector((state) => state.user);

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 800);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  if (profileLoading || loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }
  return (
    <>
      <Container>
        {error && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}

        {isMobile ? (
          <>
            {!error && user?.user && (
              <Row>
                <Col xs={12} md={6}>
                  <UpdatePassword
                    user={user}
                    navigate={navigate}
                    location={location}
                    isMobile={isMobile}
                  />
                </Col>
              </Row>
            )}
          </>
        ) : (
          <>
            {!error && user?.user && (
              <Row>
                <Col xs={4} md={3}>
                  <ProfileCard user={user} location={location} />
                </Col>
                <Col xs={12} md={6}>
                  <UpdatePassword
                    user={user}
                    navigate={navigate}
                    location={location}
                    isMobile={isMobile}
                  />
                </Col>
                <Col xs={4} md={3}>
                  <EmptyCard />
                </Col>
              </Row>
            )}
          </>
        )}

      </Container>
    </>
  );
};

export default UpdatePasswordScreen;
