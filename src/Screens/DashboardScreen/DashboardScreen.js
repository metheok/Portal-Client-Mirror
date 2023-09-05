import React from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Alert, Container } from "react-bootstrap";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Settings from "../../components/DashboardSettings/DashboardSettings";
import Profiles from "../../components/DashboardProfile/DashboardProfile";
import JobseekerProfileView from "../../components/JobseekerProfileView/JobseekerProfileView";
import css from "./DashboardScreen.module.css";
import { Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import EmployerHome from "../../components/EmployerHome/EmployerHome";


const DashboardScreen = () => {
  const location = useLocation();


  const state = useSelector((state) => state);
  const { auth, user } = state;
  const { loading, error } = auth;
  const { userLoading } = user;

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 767);
  const [isTablet, setIsTablet] = React.useState(window.innerWidth <= 991);
  const [removeEmpty, setRemoveEmpty] = React.useState(window.innerWidth <= 991);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setRemoveEmpty(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading || userLoading) {
    return <Loading />;
  }

  if (!user.user) {
    return <Navigate to="/register" />;
  }

  let renderComponent = null;

  const deskTopHome = location.pathname.includes("/dashboard")

  const EmployerDeskTop = user?.user?.user?.userType === 'employer'

  if (location.pathname.includes("/dashboard/settings")) {
    renderComponent = <Settings user={user} location={location} isMobile={isMobile} />;
  } else if (location.pathname.includes("/dashboard/profile")) {
    renderComponent = <Profiles user={user} location={location} />;
  } else if (location.pathname.includes("/dashboard/viewprofile")) {
    renderComponent = (
      <JobseekerProfileView user={user.user} location={location} />
    );
  } else if (deskTopHome && EmployerDeskTop) {
    renderComponent = (<EmployerHome isTablet={isTablet} isMobile={isMobile} />);
  }



  return (
    <>
      <Container style={{ marginTop: '1rem' }}>
        {error && (
          <Alert variant="danger">Error occurred while loading data.</Alert>

        )}

        {isMobile ? (
          <>
            {!error && user?.user ? (
              <div>
                {renderComponent}
                {location.state && <div>{location.state.message}</div>}
              </div>
            ) : null
            }
          </>
        ) : (
          <>
            {!error && user?.user ? (
              <Row >
                {!isMobile && (
                  <Col xs={4} md={2} lg={3} xl={3} xxl={3}>
                    <ProfileCard user={user.user} location={location} />
                  </Col>
                )}
                <Col className={deskTopHome ? ' ' : css.middleContent} xs={12} md={10} lg={6} xl={6} xxl={6}>
                  {renderComponent}
                  {location.state && <div>{location.state.message}</div>}

                </Col>
                {!removeEmpty &&
                  <Col xs={4} md={2} lg={3} xl={3} xxl={3}>
                    <EmptyCard className={css.emptyCard} />
                  </Col>
                }
              </Row>
            ) : null
            }
          </>
        )}


      </Container>
    </>
  );
};

export default DashboardScreen;
