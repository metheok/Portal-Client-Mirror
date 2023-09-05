import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ViewJobCard from "../ViewJob/ViewJobCard";
import { Tabs, Tab, Pagination, Row, Col } from "react-bootstrap";
import { setFetchAppliedJobLoading, setFetchAppliedJobSuccess, setFetchAppliedJobError, setUnfavouriteJobError, setUnfavouriteJobLoading, setUnfavouriteJobSuccess } from "../../state/jobseekerJob/jobseekerJobSlice";
import Loading from "../Loading/Loading";
import { userFetch } from "../../state/user/userActions";
import { useNavigate } from "react-router";

export default function ViewAppliedJob({
  status,
  user,
  state,
  data,
  setData,
  statusChange,
  show,
  dispatch,
  page,
  userToken
}) {
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  const { fetchAppliedJobLoading, fetchAppliedJobSuccess, fetchAppliedJobError, unfavouriteJobLoading, unfavouriteJobSuccess, unfavouriteJobError } = state.jobseekerJobs;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/dashboard/jobs/applied?page=${page || 1}`);
    dispatch(setFetchAppliedJobLoading());
    axios
      .get(
        `/api/jobseeker/job?page=${page}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setTotalPages(res.data.pagination.totalPages);
        let jobs = [];
        res.data.jobs.map((x) => {
          user.profile.favouriteJobs.map((y) => {
            if (x.jobId === y.jobId) {
              jobs.push(x)
            }
          })
        })
        setData(jobs)
        dispatch(setFetchAppliedJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setFetchAppliedJobError(err));
        setData([]);
      });
  }, [status, page, favouriteJobs]);

  const handlePageChange = (pageNumber) => {
    navigate(`/dashboard/jobs/applied?&page=${pageNumber}`);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      navigate(`/dashboard/jobs/applied?&page=${parseInt(page) + 1}`);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      navigate(`/dashboard/jobs/applied?&page=${parseInt(page) - 1}`);
    }
  };

  const unFavouriteJob = (id) => {
    dispatch(setUnfavouriteJobLoading());
    axios
      .delete(`/api/jobseeker/job/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setFavouriteJobs(res.data.jobseeker.favouriteJobs)
        dispatch(userFetch());
        dispatch(setUnfavouriteJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setUnfavouriteJobError(err));
      });
  }

  return (
    <>
      {fetchAppliedJobLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-2">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((x) => {
                return (
                  <div className="mb-3">
                    <ViewJobCard
                      unfavouriteJobLoading={unfavouriteJobLoading}
                      show={show}
                      statusChange={statusChange}
                      avatar={true}
                      user={user}
                      data={x}
                      setData={setData}
                      status={status}
                      favourite={true}
                      unFavouriteJob={unFavouriteJob}
                    />
                  </div>
                );
              })
            ) : (
              <div className="mt-2">No jobs added yet.</div>
            )}
          </div>
          {Array.isArray(data) && data.length > 0 && (
            <Row className="justify-content-center">
              <Col xs="auto">
                <Pagination>
                  <Pagination.Prev
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  />
                  {Array.from({ length: totalPages }).map((_, index) => {
                    if (
                      index === 0 ||
                      index === parseInt(page) - 1 ||
                      index === totalPages - 1 ||
                      (index >= parseInt(page) - 2 &&
                        index <= parseInt(page) + 2)
                    ) {
                      return (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === parseInt(page)}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      );
                    } else if (
                      (index === 1 && parseInt(page) - 3 > 1) ||
                      (index === totalPages - 2 &&
                        parseInt(page) + 3 < totalPages)
                    ) {
                      return <Pagination.Ellipsis key={index} />;
                    }
                    return null;
                  })}
                  <Pagination.Next
                    onClick={handleNextPage}
                    disabled={parseInt(page) === totalPages}
                  />
                </Pagination>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
}
