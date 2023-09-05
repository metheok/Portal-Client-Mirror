import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Pagination, Form, FormControl, Button } from "react-bootstrap";
import ViewCandidateCard from "./ViewCandidateCard";
import { useNavigate } from "react-router-dom";
import Search from "../../images/search.svg";
import Loading from "../Loading/Loading";
import { userFetch } from "../../state/user/userActions";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { setFetchCandidateLoading, setFetchCandidateSuccess, setFetchCandidateError } from "../../state/recruiterCandidate/recruiterCandidateSlice";

export default function ViewCandidate({ user, state, data, setData, dispatch, page, search, city, sort, userToken }) {

    const {
        fetchCandidateLoading,
        fetchCandidateSuccess,
        fetchCandidateError,
    } = state.candidateList;

    const [inputs, setInputs] = useState({
        search: search,
        city: city && city.charAt(0).toUpperCase() + city.slice(1)
    })
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);

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
        navigate(`/dashboard/candidate/search${queryParams}`);

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
            navigate(`/dashboard/candidate/search${queryParams}`);
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
            navigate(`/dashboard/candidate/search${queryParams}`);
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

        navigate(`/dashboard/candidate/search${queryParams}`);
        dispatch(setFetchCandidateLoading());
        axios
            .get(`/api/recruiter/candidate${queryParams}&limit=${itemsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((res) => {
                setTotalPages(res.data.pagination.totalPages)
                setData(res.data.candidates)
                dispatch(setFetchCandidateSuccess());
            })
            .catch((err) => {
                console.log(err);
                setData([])
                dispatch(setFetchCandidateError(err));
            });
    }, [page, city, sort, search])

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

        navigate(`/dashboard/candidate/search${queryParams}`);

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

        if (city) {
            queryParams += `&city=${city}`;
        }
        if (sort) {
            queryParams += `&sort=${sort}`;
        }

        navigate(`/dashboard/candidate/search${queryParams}`);
    };

    return (
        <>
            <h5 className="font-weight-bolder mb-3">Search</h5>
            <Form className="d-flex mx-auto " style={{ width: "100%" }}>
                <div className="search-wrapper" style={{ width: "100%" }}>
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
            <h5 className="font-weight-bolder mb-3 mt-3">Filter</h5>
            <div className="d-flex justify-content-around">
                <Form.Group className="mb-4">
                    <Button onClick={(e) => {
                        let queryParams = ''
                        sort === 'experience' ? queryParams = `?page=${1}` : queryParams = `?page=${1}&sort=experience`
                        if (search) {
                            queryParams += `&search=${search}`;
                        }
                        if (city) {
                            queryParams += `&city=${city}`;
                        }

                        navigate(`/dashboard/candidate/search${queryParams}`);
                    }} variant='primary'>Years of Experience{sort === 'experience' ? <BiSolidUpArrow className="ms-2" style={{ fontSize: '12px' }} /> : <BiSolidDownArrow className="ms-2" style={{ fontSize: '12px' }} />}</Button>
                </Form.Group>
                <Form.Group className="mb-4 position-relative">
                        <Form.Select className="filter-select" style={{ backgroundColor: 'rgba(19, 61, 122, 1)', color: 'white' }} name="rating">
                            <option value="">Rating</option>
                        </Form.Select>
                        <BiSolidDownArrow className="filter-arrow text-white" />
                </Form.Group>
                <Form.Group className="mb-4 position-relative">
                        <Form.Select className="filter-select" style={{ backgroundColor: 'rgba(19, 61, 122, 1)', color: 'white' }} value={inputs.city} onChange={handleFilter} name="city">
                            <option value="">Location</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                        </Form.Select>
                        <BiSolidDownArrow className="filter-arrow text-white" />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Button onClick={(e) => {
                        let queryParams = ''
                        sort === 'time' ? queryParams = `?page=${1}` : queryParams = `?page=${1}&sort=time`
                        if (search) {
                            queryParams += `&search=${search}`;
                        }
                        if (city) {
                            queryParams += `&city=${city}`;
                        }

                        navigate(`/dashboard/candidate/search${queryParams}`);
                    }} variant='primary'>Sort By Time{sort === 'time' ? <BiSolidUpArrow className="ms-2" style={{ fontSize: '12px' }} /> : <BiSolidDownArrow className="ms-2" style={{ fontSize: '12px' }} />}</Button>
                </Form.Group>
            </div>
            {fetchCandidateLoading ? <Loading /> : <>
                <div>
                    {Array.isArray(data) && data.length > 0 ? data.map((x) => {
                        return (
                            <div className="mb-3">
                                <ViewCandidateCard user={user} data={x} setData={setData} />
                            </div>
                        );
                    }) : <div>No jobs added yet.</div>}
                </div>
                {(Array.isArray(data) && data.length > 0) && <Row className="justify-content-center">
                    <Col xs="auto">
                        <Pagination>
                            <Pagination.Prev onClick={handlePreviousPage} disabled={page === 1} />
                            {Array.from({ length: totalPages }).map((_, index) => {
                                if (
                                    index === 0 ||
                                    index === parseInt(page) - 1 ||
                                    index === totalPages - 1 ||
                                    (index >= parseInt(page) - 2 && index <= parseInt(page) + 2)
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
                                    (index === totalPages - 2 && parseInt(page) + 3 < totalPages)
                                ) {
                                    return <Pagination.Ellipsis key={index} />;
                                }
                                return null;
                            })}
                            <Pagination.Next onClick={handleNextPage} disabled={parseInt(page) === totalPages} />
                        </Pagination>
                    </Col>
                </Row>}
            </>}
        </>
    );
}
