import React, { useState } from "react";

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
import { Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import css from "./EditJobScreen.module.css";
import EditJob from "../../components/EditJob/EditJob";
import MobileEditJob from "../../components/EditJob/MobileEditJob";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  clearJobForm,
  setAddAJobError,
  setAddAJobLoading,
  setAddAJobSuccess,
  setFetchAJobError,
  setFetchAJobLoading,
  setFetchAJobSuccess,
} from "../../state/employerJob/employerJobSlice";
import { useEffect } from "react";

const EditJobScreen = () => {
  const [jobData, setJobData] = useState({});
  const state = useSelector((state) => state);
  const { userToken, loading, error } = state.auth;
  const { user, profileLoading, profileError } = state.user;
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 767);
  const [removeEmpty, setRemoveEmpty] = React.useState(window.innerWidth <= 1400);

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
      setRemoveEmpty(window.innerWidth <= 1400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    addAJobLoading,
    addAJobSuccess,
    addAJobError,
    fetchAJobLoading,
    fetchAJobSuccess,
    fetchAJobError,
  } = state.employerJobs;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, tab } = useParams();

  const tabs = [
    "post-job",
    "add-details",
    "screening-questions",
    "payout-details",
    "review-and-submit",
  ];

  const updateJob = async (data, status, feature, experience) => {
    const nextTab = tabs[tabs.findIndex((e) => e === tab) + 1];
    var finalData = {}
    if (experience) {
      finalData = { ...data, totalExperience: experience }
    } else {
      finalData = data
    }
    dispatch(setAddAJobLoading());
    await axios
      .put(
        "/api/employer/job",
        {
          jobId: id,
          data: finalData,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201 || res.data.job) {
          const job = res.data.job;
          setJobData(job);
          dispatch(setAddAJobSuccess());
          if (feature == "draft") {
            navigate(`/dashboard`, {
              state: { message: "Job Saved Successfully" },
            });
          } else {
            if (nextTab) {
              navigate(`/dashboard/job/edit-job/${job.jobId}/${nextTab}`);
            }
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          dispatch(setAddAJobError(error.response.data.message));
        } else {
          dispatch(setAddAJobError("error"));
        }
      });
  };
  const createJob = async (data, status, feature, experience) => {
    var finalData = {}
    if (experience) {
      finalData = { ...data, totalExperience: experience }
    } else {
      finalData = data
    }
    dispatch(setAddAJobLoading());
    await axios
      .post(
        "/api/employer/job",
        { data: finalData, status: status },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201 || res.data.job) {
          const job = res.data.job;
          setJobData(job);

          dispatch(setAddAJobSuccess());
          if (feature == "draft") {
            navigate(`/dashboard`, {
              state: { message: "Job Saved Successfully" },
            });
          } else if (feature === 'submit' && status === 'under-review') {
            navigate(`/dashboard`, {
              state: { message: "Job Saved Successfully" },
            });
          }
          else {
            if (tab !== 'review-and-submit') {
              navigate(`/dashboard/job/edit-job/${job.jobId}/add-details`);
            }
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          dispatch(setAddAJobError(error.response.data.message));
        } else {
          dispatch(setAddAJobError("error"));
        }
      });
  };
  const fetchJob = async (id) => {
    dispatch(setFetchAJobLoading());
    await axios
      .get(`/api/employer/job/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setJobData(res.data.job);
        dispatch(setFetchAJobSuccess());
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          dispatch(setFetchAJobError(error.response.data.message));
        } else {
          dispatch(setFetchAJobError("error"));
        }
      });
  };
  useEffect(() => {
    if (id && id != "new") {
      fetchJob(id);
    }
    else if (id === 'new') {
      if (location.state) {
        setJobData(location.state.data)
      }
    }
  }, []);

  if (loading || profileLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }

  if (user.user.userType !== "employer") {
    return <Navigate to="/dashboard" />;
  }

  if (!id) {
    return <Navigate to="/dashboard/job/edit-job/new/post-job" />;
  }
  if (!tab) {
    return <Navigate to={`/dashboard/job/edit-job/${id}/post-job`} />;
  }
  let renderComponent = null;
  if (id === "new" && tab !== "post-job" && !location.state) {
    return <Navigate to="/dashboard/job/edit-job/new/post-job" />;
  }
  if (id === "new") {


    renderComponent = renderComponent = (
      isMobile ?
        <MobileEditJob
          id={id}
          updateJob={updateJob}
          createJob={createJob}
          fetchJob={fetchJob}
          currentTab={tab}
          state={state}
          dispatch={dispatch}
          navigate={navigate}
          tabs={tabs}
          clearJobForm={clearJobForm}
          jobData={jobData}
        />
        :
        <EditJob
          id={id}
          updateJob={updateJob}
          createJob={createJob}
          fetchJob={fetchJob}
          currentTab={tab}
          state={state}
          dispatch={dispatch}
          navigate={navigate}
          tabs={tabs}
          clearJobForm={clearJobForm}
          jobData={jobData}
        />
    );
  } else {
    renderComponent = (
      isMobile ?
        <MobileEditJob
          id={id}
          updateJob={updateJob}
          createJob={createJob}
          fetchJob={fetchJob}
          currentTab={tab}
          state={state}
          dispatch={dispatch}
          navigate={navigate}
          tabs={tabs}
          clearJobForm={clearJobForm}
          jobData={jobData}
        />
        :
        <>
          <EditJob
            id={id}
            updateJob={updateJob}
            createJob={createJob}
            fetchJob={fetchJob}
            currentTab={tab}
            state={state}
            dispatch={dispatch}
            navigate={navigate}
            tabs={tabs}
            clearJobForm={clearJobForm}
            jobData={jobData}
          />
        </>
    );
  }

  return (
    <>
      <Container>
        {(error || profileError) && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}
        {!error && user?.user ? (
          <Row className="mt-3">
            {!isMobile && <Col xs={4} md={2} lg={3} xl={3} xxl={3}>
              <ProfileCard user={user} location={location} />
            </Col>}
            <Col className={css.middleContent} xs={12} md={10} lg={9} xl={8} xxl={6}>
              {renderComponent}
            </Col>
            {!removeEmpty && <Col xs={4} md={2} lg={3} xl={3} xxl={3}>
              <EmptyCard />
            </Col>}
          </Row>
        ) : null}
      </Container>
    </>
  );
};

export default EditJobScreen;
