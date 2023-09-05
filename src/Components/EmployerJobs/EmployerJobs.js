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
import ViewPostedJob from "../ViewJob/ViewPostedJob";
import ViewClosedJob from "../ViewJob/ViewClosedJob";
import ViewDraftedJob from "../ViewJob/ViewDraftedJob";
import ViewJobDetails from "../ViewJob/ViewJobDetails";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import {
  setStatusChangeLoading,
  setStatusChangeSuccess,
  setStatusChangeError,
} from "../../state/employerJob/employerJobSlice";

const EmployerJobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
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
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [apiParameter, setApiParameter] = useState();
  const dispatch = useDispatch();
  const { statusChangeLoading, statusChangeSuccess, statusChangeError } =
    state.employerJobs;


  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 767);
  const [isTablet, setIsTablet] = React.useState(window.innerWidth <= 991);
  const [removeEmpty, setRemoveEmpty] = React.useState(window.innerWidth <= 1200);

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
      setRemoveEmpty(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleStatusChange = (s, d) => {
    setShow(true);
    setApiParameter({
      status: s,
      data: d,
    });
  };

  const changeStatus = () => {
    dispatch(setStatusChangeLoading());
    axios
      .put(
        "/api/employer/job/update-status",
        { status: apiParameter.status, jobId: apiParameter.data.jobId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        axios
          .get(`/api/employer/job?status=${status}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            setData(res.data.jobs);
          })
          .catch((err) => {
            console.log(err);
            setData([]);
          });
        if (apiParameter.status === "draft") {
          navigate(
            `/dashboard/job/edit-job/${apiParameter.data.jobId}/review-and-submit`
          );
        }
        setModal(true);
        dispatch(setStatusChangeSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setStatusChangeError(err));
      });
  };

  var renderedComponent = null;

  if (loading || profileLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }
  if (user.user.userType !== "employer") {
    navigate("/dashboard");
    return;
  }
  if (status) {
    if (isMobile) {
      if (
        status === "live" ||
        status === "under-review" ||
        status === "paused" ||
        status === "draft" ||
        status === "closed"
      ) {
        renderedComponent = (
          <ViewPostedJob
            dispatch={dispatch}
            setShow={setShow}
            statusChange={handleStatusChange}
            data={data}
            setData={setData}
            state={state}
            status={status}
            user={user}
            userToken={userToken}
            page={page}
            isMobile={isMobile}
          />
        );
      }
    } else {
      if (status === "live" || status === "under-review" || status === "paused") {
        renderedComponent = (
          <ViewPostedJob
            dispatch={dispatch}
            setShow={setShow}
            statusChange={handleStatusChange}
            data={data}
            setData={setData}
            state={state}
            status={status}
            user={user}
            userToken={userToken}
            page={page}
            isMobile={isMobile}
          />
        );
      } else if (status === "draft") {
        renderedComponent = (
          <ViewDraftedJob
            dispatch={dispatch}
            setShow={setShow}
            statusChange={handleStatusChange}
            data={data}
            setData={setData}
            state={state}
            userToken={userToken}
            status={status}
            user={user}
            page={page}
            isMobile={isMobile}
          />
        );
      } else if (status === "closed") {
        renderedComponent = (
          <ViewClosedJob
            dispatch={dispatch}
            setShow={setShow}
            statusChange={handleStatusChange}
            data={data}
            setData={setData}
            state={state}
            userToken={userToken}
            status={status}
            user={user}
            page={page}
            isMobile={isMobile}
          />
        );
      }
    }
  } else if (id) {
    renderedComponent = (
      <ViewJobDetails
        dispatch={dispatch}
        setShow={setShow}
        statusChange={handleStatusChange}
        data={data}
        setData={setData}
        state={state}
        userToken={userToken}
        id={id}
        user={user}
      />
    );
  } else if (!status && !id) {
    return <Navigate to="/dashboard" />;
  }


  return (
    <>
      <Container>
        {(error, profileError) && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          backdrop="static"
          keyboard={false}
        >
          {statusChangeLoading ? (
            <Loading />
          ) : (
            <Modal.Body>
              {modal ? (
                <div style={{ padding: "20px" }}>Job deleted successfully</div>
              ) : (
                <div style={{ padding: "20px" }}>
                  <h4>Are you sure?</h4>
                  <p>Do you want to proceed?</p>
                </div>
              )}
            </Modal.Body>
          )}
          <Modal.Footer>
            {modal ? (
              <Button
                onClick={() => {
                  setShow(false);
                  setModal(false);
                }}
                variant="secondary"
              >
                Ok
              </Button>
            ) : (
              <div>
                <Button onClick={() => setShow(false)} variant="secondary">
                  No
                </Button>
                <Button onClick={changeStatus} variant="primary">
                  Yes
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>

        {!error && user?.user ? (
          <Row className="mt-3">
            {!isMobile && <Col xs={4} md={2} lg={3} xl={3} xxl={3}>
              <ProfileCard user={user} location={location} />
            </Col>}
            <Col xs={12} md={10} lg={8} xl={6} xxl={6}>
              {renderedComponent}
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

export default EmployerJobs;
