import React from "react";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Alert, Container } from "react-bootstrap";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import JobApplyContainer from "../../components/JobApplyContainer/JobApplyContainer";
import css from "./JobApplyScreen.module.css";
import { Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";

const JobApplyScreen = () => {
  const location = useLocation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { auth, user, recruiterJobs, jobseekerJobApply } = state;

  const { loading, error } = auth;
  const { userLoading, userError } = user;
  if (loading || userLoading) {
    return <Loading />;
  }

  if (!user.user?.user) {
    return <Navigate to="/register" />;
  }
  if (user?.user?.user?.userType !== "jobseeker") {
    return <Navigate to="/dashboard" />;
  }

  let renderComponent = (
    <JobApplyContainer
      recruiterJobsState={recruiterJobs}
      jobseekerJobApplyState={jobseekerJobApply}
      state={state}
      jobId={jobId}
      navigate={navigate}
      userState={user}
      authState={auth}
    />
  );

  return (
    <>
      <Container>
        {(error || userError) && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}
        {!error && !userError && user.user.user ? (
          <Row className="mt-3">
            <Col xs={4} md={3} xl={3} xxl={3}>
              <ProfileCard user={user.user} location={location} />
            </Col>
            <Col className={css.middleContent} xs={12} md={8} xl={6} xxl={6}>
              {renderComponent}
            </Col>
            <Col xs={4} md={1} xl={3} xxl={3}>
              <EmptyCard className={css.emptyCard} />
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
};

export default JobApplyScreen;
