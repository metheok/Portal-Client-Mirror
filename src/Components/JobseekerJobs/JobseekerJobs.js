import React, { useEffect, useState } from "react";

import ProfileCard from "../ProfileCard/ProfileCard";
import {
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { Alert, Container } from "react-bootstrap";
import EmptyCard from "../EmptyCard/EmptyCard";
import { Row, Col } from "react-bootstrap";
import Loading from "../Loading/Loading";
import JobseekerViewDetails from "../JobseekerSearchJobs/JobseekerViewDetails";
import ViewFavouriteJob from "../JobseekerSearchJobs/ViewFavouriteJob";
import ViewAppliedJob from "../JobseekerSearchJobs/ViewAppliedJob";
import ViewJobseekerClosedJob from "../JobseekerSearchJobs/ViewClosedJob"
import { setFetchAJobLoading, setFetchAJobSuccess, setFetchAJobError } from "../../state/jobseekerJob/jobseekerJobSlice";
import axios from "axios";

const JobseekerJobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const city = searchParams.get("city");
  const sort = searchParams.get("sort");
  const skills = searchParams.get("skills")
  const state = useSelector((state) => state);
  const { id } = useParams();
  const { loading, error, userToken } = useSelector((state) => state.auth);
  const { user, profileLoading, profileError } = useSelector(
    (state) => state.user
  );
  const [favouriteJobs, setFavouriteJobs] = useState([])
  const [data, setData] = useState();
  const dispatch = useDispatch();

  var renderedComponent = null
  if (loading || profileLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }
  if (user.user.userType !== 'jobseeker') {
    navigate('/dashboard')
    return;
  }
  if (!id) {
    if (location.pathname === "/dashboard/jobs/favorite") {
      renderedComponent = (
        <ViewFavouriteJob
          dispatch={dispatch}
          data={data}
          setData={setData}
          state={state}
          status={status}
          user={user}
          page={page}
          userToken={userToken}
          show={true}
        />
      );
    } else if (location.pathname === "/dashboard/jobs/applied") {
      renderedComponent = (
        <ViewAppliedJob
          dispatch={dispatch}
          data={data}
          setData={setData}
          state={state}
          status={status}
          user={user}
          page={page}
          userToken={userToken}
          show={true}
        />
      );
    } else if (location.pathname === "/dashboard/jobs/closed") {
      renderedComponent = (
        <ViewJobseekerClosedJob
          dispatch={dispatch}
          data={data}
          setData={setData}
          state={state}
          status={status}
          user={user}
          page={page}
          userToken={userToken}
          show={true}
        />
      );
    }
  } else if (id) {
    renderedComponent = (
      <JobseekerViewDetails
        dispatch={dispatch}
        state={state}
        user={user}
        page={page}
        favouriteJobs={favouriteJobs}
        setFavouriteJobs={setFavouriteJobs}
        id={id}
        userToken={userToken}
      />
    );
  }

  return (
    <>
      <Container>
        {(error, profileError) && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}
        {!error && user?.user ? (
          <Row>
            <Col xs={4} md={3}>
              <ProfileCard user={user} location={location} />
            </Col>
            <Col xs={12} md={6}>
              {renderedComponent}
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

export default JobseekerJobs;
