import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Pagination,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import ViewJobCard from "../ViewJob/ViewJobCard";
import { useNavigate } from "react-router-dom";
import Search from "../../images/search.svg";
import Loading from "../Loading/Loading";
import { userFetch } from "../../state/user/userActions";
import {
  setFetchAJobLoading,
  setFetchAJobSuccess,
  setFetchAJobError,
  setMarkJobLoading,
  setMarkJobError,
  setMarkJobSuccess,
  setUnmarkJobError,
  setUnmarkJobLoading,
  setUnmarkJobSuccess,
} from "../../state/recruiterJob/recruiterJobSlice";

export default function RecruiterViewJobs({
  user,
  state,

  dispatch,
  page,
  search,
  city,
  sort,
  userToken,
}) {
  const {
    fetchAJobLoading,
    fetchAJobSuccess,
    fetchAJobError,
    markJobLoading,
    markJobSuccess,
    markJobError,
    unmarkJobLoading,
    unmarkJobSuccess,
    unmarkJobError,
  } = state.recruiterJobs;
  const [data, setData] = useState();

  const [inputs, setInputs] = useState({
    search: search,
    city: city && city.charAt(0).toUpperCase() + city.slice(1),
  });
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [markedJobs, setMarkedJobs] = useState([]);

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    let queryParams = `?page=${pageNumber}`;

    if (search) {
      queryParams += `&search=${search}`;
    }

    if (city) {
      queryParams += `&city=${city}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }
    navigate(`/dashboard/jobs${queryParams}`);
  };

  const handleNextPage = () => {
    let queryParams = `?page=${parseInt(page) + 1}`;

    if (search) {
      queryParams += `&search=${search}`;
    }

    if (city) {
      queryParams += `&city=${city}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }
    if (page < totalPages) {
      navigate(`/dashboard/jobs${queryParams}`);
    }
  };

  const handlePreviousPage = () => {
    let queryParams = `?page=${parseInt(page) - 1}`;

    if (search) {
      queryParams += `&search=${search}`;
    }

    if (city) {
      queryParams += `&city=${city}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }
    if (page < totalPages) {
      navigate(`/dashboard/jobs${queryParams}`);
    }
  };

  useEffect(() => {
    let queryParams = `?page=${page || 1}`;

    if (search) {
      queryParams += `&search=${search}`;
    }

    if (city) {
      queryParams += `&city=${city}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }

    navigate(`/dashboard/jobs${queryParams}`);
    dispatch(setFetchAJobLoading());
    axios
      .get(`/api/recruiter/job${queryParams}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setTotalPages(res.data.pagination.totalPages);
        setData(res.data.jobs);
        setMarkedJobs(user.profile.markedJobs);
        dispatch(setFetchAJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        setData([]);
        dispatch(setFetchAJobError(err));
      });
  }, [page, city, sort, search]);

  const markJob = (id) => {
    dispatch(setMarkJobLoading());
    axios
      .post(
        "/api/recruiter/job",
        { jobId: id },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setMarkedJobs(res.data.recruiter.markedJobs);
        dispatch(userFetch());
        dispatch(setMarkJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMarkJobError(err));
      });
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
        setMarkedJobs(res.data.recruiter.markedJobs);
        dispatch(userFetch());
        dispatch(setUnmarkJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setUnmarkJobError(err));
      });
  };

  const handleFilter = (e) => {
    const FilterQuery = e.target.value;
    setInputs((pValue) => {
      return {
        ...pValue,
        city: e.target.value,
      };
    });
    let queryParams = `?page=${1}&${e.target.name}=${FilterQuery}`;

    if (search) {
      queryParams += `&search=${search}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }

    navigate(`/dashboard/jobs${queryParams}`);
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setInputs((pValue) => {
      return {
        ...pValue,
        search: e.target.value,
      };
    });
    let queryParams = `?page=${1}&search=${searchQuery}`;

    if (city) {
      queryParams += `&city=${city}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }

    navigate(`/dashboard/jobs${queryParams}`);
  };

  return (
    <>
      <h5 className="font-weight-bolder mb-3">All Jobs</h5>
      <Form className="d-flex mx-auto " style={{ width: "60%" }}>
        <div className="search-wrapper " style={{ width: "100%" }}>
          <FormControl
            type="search"
            placeholder="Search Jobs"
            className="mr-2"
            onChange={handleSearch}
            value={inputs.search}
          />
          <img src={Search} alt="search" className="search-icon" />
        </div>
      </Form>
      <h5 className="font-weight-bolder mb-3">Filter</h5>
      <div className="d-flex justify-content-around">
        <Form.Group className="mb-4">
          <Button
            onClick={(e) => {
              let queryParams = `?page=${1}&sort=experience`;
              if (search) {
                queryParams += `&search=${search}`;
              }
              if (city) {
                queryParams += `&city=${city}`;
              }

              navigate(`/dashboard/jobs${queryParams}`);
            }}
            variant="primary"
          >
            Years of Experience
          </Button>
        </Form.Group>
        <Form.Group placeholder="Rating" className="mb-4">
          <Form.Select name="rating" required>
            <option value="">Rating</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Select
            value={inputs.city}
            onChange={handleFilter}
            placeholder="Location"
            name="city"
            required
          >
            <option value="">Location</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-4">
          <Button
            onClick={(e) => {
              let queryParams = `?page=${1}&sort=time`;
              if (search) {
                queryParams += `&search=${search}`;
              }
              if (city) {
                queryParams += `&city=${city}`;
              }

              navigate(`/dashboard/jobs${queryParams}`);
            }}
            variant="primary"
          >
            Sort By Time
          </Button>
        </Form.Group>
      </div>
      {fetchAJobLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((x) => {
                return (
                  <div className="mb-3">
                    <ViewJobCard
                      markedJobs={markedJobs}
                      markJobLoading={markJobLoading}
                      unmarkJobLoading={unmarkJobLoading}
                      unmarkJob={unmarkJob}
                      markJob={markJob}
                      avatar={true}
                      user={user}
                      data={x}
                      setData={setData}
                    />
                  </div>
                );
              })
            ) : (
              <div>No jobs added yet.</div>
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
