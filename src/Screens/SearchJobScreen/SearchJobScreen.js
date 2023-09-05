import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { Alert, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import JobseekerSearchJobs from "../../components/JobseekerSearchJobs/JobseekerSearchJobs";
import JobseekerViewDetails from "../../components/JobseekerSearchJobs/JobseekerViewDetails";
import axios from "axios";
import { FormGroup, Form, FormControl, Button } from "react-bootstrap";
import { setFetchAJobLoading, setFetchAJobSuccess, setFetchAJobError } from "../../state/jobseekerJob/jobseekerJobSlice";
import Select from 'react-select';
import Search from "../../images/search.svg";

const SearchJobScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const city = searchParams.get("city");
  const sort = searchParams.get("sort");
  const skills = searchParams.get("skills");
  const state = useSelector((state) => state);
  const { id } = useParams();
  const { loading, error, userToken } = useSelector((state) => state.auth);
  const { user, profileLoading, profileError } = useSelector(
    (state) => state.user
  );

  const [data, setData] = useState();
  const [inputs, setInputs] = useState({
    search: search ? search : ''
  })
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [favouriteJobs, setFavouriteJobs] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dispatch = useDispatch();

  const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'springboot', label: 'springboot' },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected)
    var skillString = ''
    selected.forEach((x, index) => {
      if (selected.length === 1 || index === selected.length - 1) {
        console.log('111111');
        skillString += `${x.value}`
      } else if (selected.length > 1) {
        skillString += `${x.value},`
      }
    })

    let queryParams = `?page=1&skills=${skillString}`;

    if (search) {
      queryParams += `&search=${search}`;
    }

    if (city) {
      queryParams += `&city=${city}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }
    navigate(`/dashboard/search-jobs${queryParams}`)
  }

  useEffect(() => {
    if (user) {
      setFavouriteJobs(user.profile.favouriteJobs)

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

      if (skills) {
        queryParams += `&skills=${skills}`;
      }

      if (id) {
        navigate(`/dashboard/search-jobs/${id}${queryParams}`);
      } else if (!id) {
        navigate(`/dashboard/search-jobs${queryParams}`);
      }
      dispatch(setFetchAJobLoading())
      axios
        .get(`/api/jobseeker/job${queryParams}&limit=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          setTotalPages(res.data.pagination.totalPages)
          setData(res.data.jobs)
          dispatch(setFetchAJobSuccess())
        })
        .catch((err) => {
          console.log(err);
          setData([]);
          dispatch(setFetchAJobError(err))
        });
    }
  }, [page, search, city, sort, skills])

  const handleFilter = (e) => {
    const FilterQuery = e.target.value;
    setInputs(pValue => {
      return {
        ...pValue,
        city: e.target.value
      }
    })
    let queryParams = `?page=${1}&${e.target.name}=${FilterQuery}`;

    if (search) {
      queryParams += `&search=${search}`;
    }
    if (sort) {
      queryParams += `&sort=${sort}`;
    }

    if (skills) {
      queryParams += `&skills=${skills}`;
    }

    if (id) {
      navigate(`/dashboard/search-jobs/${id}${queryParams}`);
    } else if (!id) {
      navigate(`/dashboard/search-jobs${queryParams}`);
    }

  }

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setInputs(pValue => {
      return {
        ...pValue,
        search: e.target.value
      }
    })
    let queryParams = `?page=${1}&search=${searchQuery}`;

    if (sort) {
      queryParams += `&sort=${sort}`;
    }

    if (city) {
      queryParams += `&city=${city}`;
    }

    if (skills) {
      queryParams += `&skills=${skills}`;
    }

    if (id) {
      navigate(`/dashboard/search-jobs/${id}${queryParams}`);
    } else if (!id) {
      navigate(`/dashboard/search-jobs${queryParams}`);
    }
  };

  if (loading || profileLoading) {
    return <Loading />;
  }
  if (!user) {
   return <Navigate to="/register" />;
  }
  if (user.user.userType!=='jobseeker') {
    navigate('/dashboard')
    return; 
  }
  let renderComponent = null;
  if (user.user.userType === "jobseeker") {
    if (id) {
      renderComponent = <JobseekerViewDetails
        dispatch={dispatch}
        allData={data}
        setAllData={setData}
        state={state}
        user={user}
        page={page}
        totalPages={totalPages}
        favouriteJobs={favouriteJobs}
        setFavouriteJobs={setFavouriteJobs}
        id={id}
        userToken={userToken}
      />
    } else if (!id) {
      renderComponent = <JobseekerSearchJobs
        dispatch={dispatch}
        data={data}
        id={id}
        setData={setData}
        state={state}
        user={user}
        page={page}
        totalPages={totalPages}
        favouriteJobs={favouriteJobs}
        setFavouriteJobs={setFavouriteJobs}
        show={true}
        userToken={userToken}
      />
    }
  }

  return (
    <>
      <Container>
        {(error, profileError) && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}

        {!error && user?.user ? (
          <>
            <Row>
              <Col>
                <div className="mt-4 mb-3">
                  Search Jobs
                </div>
                <Row>
                  <Col md={4}>
                    <Form className="d-flex" style={{ width: "100%" }}>
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
                  </Col>
                  <Col md={8}>
                    <div className="d-flex justify-content-around">
                      <Form.Group className="mb-4">
                        <Button variant='primary'>Relevance</Button>
                      </Form.Group>
                      <Form.Group placeholder="Rating" className="mb-4">
                        <Form.Select name="rating" required>
                          <option value="">Rating</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Select value={inputs.city} onChange={handleFilter} placeholder="Location" name="city" required>
                          <option value="">Location</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Mumbai">Mumbai</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Button onClick={(e) => {
                          let queryParams = `?page=${1}&sort=time`;
                          if (search) {
                            queryParams += `&search=${search}`;
                          }
                          if (city) {
                            queryParams += `&city=${city}`;
                          }

                          if (id) {
                            navigate(`/dashboard/search-jobs/${id}${queryParams}`);
                          } else if (!id) {
                            navigate(`/dashboard/search-jobs${queryParams}`);
                          }
                        }} variant='primary'>Sort By Time</Button>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Button onClick={(e) => {
                          let queryParams = `?page=${1}&sort=experience`;
                          if (search) {
                            queryParams += `&search=${search}`;
                          }
                          if (city) {
                            queryParams += `&city=${city}`;
                          }

                          if (id) {
                            navigate(`/dashboard/search-jobs/${id}${queryParams}`);
                          } else if (!id) {
                            navigate(`/dashboard/search-jobs${queryParams}`);
                          }
                        }} variant='primary'>Years of Experience</Button>
                      </Form.Group>
                      <div>
                        <Select
                          options={options}
                          isMulti
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          components={{
                            Option: ({ innerProps, label, value }) => (
                              <div {...innerProps} className="m-2 d-flex">
                                <input
                                  type="checkbox"
                                  checked={selectedOptions.some((opt) => opt.value === value)}
                                  onChange={() => {
                                    const newSelectedOptions = selectedOptions.some((opt) => opt.value === value)
                                      ? selectedOptions.filter((opt) => opt.value !== value)
                                      : [...selectedOptions, { label, value }];
                                    handleSelectChange(newSelectedOptions);
                                  }}
                                />
                                <label className="ms-2">{label}</label>
                              </div>
                            )
                          }}
                          placeholder="Skills"
                          value=""
                          menuPlacement="auto"
                          styles={{menu: (provided) => ({ ...provided, width: 'auto', zIndex: 1000 })}}
                          onChange={handleSelectChange}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-4">
              <Col xs={12} md={id ? 12 : 8}>
                {renderComponent}
              </Col>
            </Row>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default SearchJobScreen;
