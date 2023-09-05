import React, { useEffect, useState } from "react";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import {
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { Alert, Container } from "react-bootstrap";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import { Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import ViewCandidate from "../../components/ViewCandidate/ViewCandidate";
import ViewCandidateDetails from "../../components/ViewCandidate/ViewCandidate";

const ViewCandidateScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const city = searchParams.get("city");
  const sort = searchParams.get("sort");
  const state = useSelector((state) => state);
  const { id } = useParams();
  const { loading, error, userToken } = useSelector((state) => state.auth);
  const { user, profileLoading, profileError } = useSelector(
    (state) => state.user
  );
  const [data, setData] = useState();
  const dispatch = useDispatch();


  var renderComponent = null
  if (loading || profileLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }
  if (user.user.userType !== 'recruiter') {
    navigate('/dashboard')
    return;
  }
  if (!id) {
    renderComponent = <ViewCandidate
      sort={sort}
      page={page}
      search={search}
      city={city}
      user={user}
      dispatch={dispatch}
      data={data}
      setData={setData}
      state={state}
      userToken={userToken}
    />
  } else if (id) {
    renderComponent = <ViewCandidateDetails
      user={user}
      dispatch={dispatch}
      data={data}
      setData={setData}
      state={state}
      userToken={userToken}
      id={id}
    />
  }

  return (
    <>
      <Container>
        {!error && user?.user ? (
          <Row>
            <Col xs={4} md={3}>
              <ProfileCard user={user} location={location} />
            </Col>
            <Col xs={12} md={6}>
              {renderComponent}
            </Col>
            <Col xs={4} md={3}>
              <EmptyCard />
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
};

export default ViewCandidateScreen;
