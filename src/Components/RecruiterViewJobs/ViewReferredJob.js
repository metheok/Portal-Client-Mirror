import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ViewJobCard from "./ViewJobCard";
import { Tabs, Tab, Pagination, Row, Col } from "react-bootstrap";
import {
  setFetchAJobError,
  setFetchAJobLoading,
  setFetchAJobSuccess,
  setUnmarkJobLoading,
  setUnmarkJobError,
  setUnmarkJobSuccess,
} from "../../state/recruiterJob/recruiterJobSlice";
import Loading from "../Loading/Loading";
import { userFetch } from "../../state/user/userActions";
import { useNavigate } from "react-router";

export default function ViewReferredJob({
  status,
  user,
  state,

  dispatch,
  page,
  userToken,
}) {
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [favouriteJobs, setFavouriteJobs] = useState([]);
  const [data, setData] = useState();

  const {
    fetchAJobLoading,
    fetchAJobSuccess,
    fetchAJobError,
    unmarkJobLoading,
    unmarkJobSuccess,
    unmarkJobError,
  } = state.recruiterJobs;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/dashboard/jobs/referred?page=${page || 1}`);
    dispatch(setFetchAJobLoading());
    axios
      .get(
        `/api/recruiter/job?type=referred&page=${page}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setTotalPages(res.data.pagination.totalPages);

        setData(res.data.jobs);
        dispatch(setFetchAJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setFetchAJobError(err));
        setData([]);
      });
  }, [status, page, favouriteJobs]);

  const handlePageChange = (pageNumber) => {
    navigate(`/dashboard/jobs/referred?&page=${pageNumber}`);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      navigate(`/dashboard/jobs/referred?&page=${parseInt(page) + 1}`);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      navigate(`/dashboard/jobs/referred?&page=${parseInt(page) - 1}`);
    }
  };

  const unmarkJob = (id) => {
    dispatch(setUnmarkJobLoading());
    axios
      .delete(`/api/recruiter/job/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setFavouriteJobs(res.data.recruiter.markedJobs);
        dispatch(userFetch());
        dispatch(setUnmarkJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setUnmarkJobError(err));
      });
  };

  return (
    <>
      {fetchAJobLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-2">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((x) => {
                return (
                  <div className="mb-3">
                    <ViewJobCard
                      type="referred"
                      unmarkJobLoading={unmarkJobLoading}
                      avatar={true}
                      user={user}
                      data={x}
                      setData={setData}
                      status={status}
                      favourite={true}
                      unmarkJob={unmarkJob}
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
