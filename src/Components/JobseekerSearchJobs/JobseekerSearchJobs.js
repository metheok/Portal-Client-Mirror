import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Pagination, Form, FormControl, Button } from "react-bootstrap";
import ViewJobCard from "../ViewJob/ViewJobCard";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../../images/search.svg";
import Loading from "../Loading/Loading";
import { userFetch } from "../../state/user/userActions";
import { setFavouriteJobLoading, setFavouriteJobError, setFavouriteJobSuccess, setUnfavouriteJobError, setUnfavouriteJobLoading, setUnfavouriteJobSuccess } from "../../state/jobseekerJob/jobseekerJobSlice";

export default function JobseekerSearchJobs({ user, userToken, state, data, setData, dispatch, page, totalPages, favouriteJobs, setFavouriteJobs, show, id }) {

    const { fetchAJobLoading,
        fetchAJobSuccess,
        fetchAJobError, favouriteJobLoading, favouriteJobSuccess, favouriteJobError, unfavouriteJobLoading, unfavouriteJobSuccess, unfavouriteJobError } = state.jobseekerJobs;

    const navigate = useNavigate();
    const location = useLocation();

    const handlePageChange = (pageNumber) => {
        let queryParams = `?page=${pageNumber}`;

        if (id) {
            navigate(`/dashboard/search-jobs/${id}${queryParams}`);
        } else if (!id) {
            navigate(`/dashboard/search-jobs${queryParams}`);
        }

    };

    const handleNextPage = () => {
        let queryParams = `?page=${parseInt(page) + 1}`;

        if (page < totalPages) {
            if (id) {
                navigate(`/dashboard/search-jobs/${id}${queryParams}`);
            } else if (!id) {
                navigate(`/dashboard/search-jobs${queryParams}`);
            }
        }
    };

    const handlePreviousPage = () => {
        let queryParams = `?page=${parseInt(page) - 1}`;

        if (page < totalPages) {
            if (id) {
                navigate(`/dashboard/search-jobs/${id}${queryParams}`);
            } else if (!id) {
                navigate(`/dashboard/search-jobs${queryParams}`);
            }
        }
    };

    const favouriteJob = (id) => {
        dispatch(setFavouriteJobLoading());
        axios
            .post('/api/jobseeker/job', { jobId: id }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((res) => {
                setFavouriteJobs(res.data.jobseeker.favouriteJobs)
                dispatch(userFetch());
                dispatch(setFavouriteJobSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(setFavouriteJobError(err));
            });
    }

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
            {fetchAJobLoading ? <Loading /> : <>
                <div>
                    {Array.isArray(data) && data.length > 0 ? data.map((x) => {
                        return (
                            <div onClick={location.pathname.includes('/dashboard/search-jobs/') ? () => navigate(`/dashboard/search-jobs/${x.jobId}`) : null} role={location.pathname.includes('/dashboard/search-jobs/') ? "button" : null} className="mb-3">
                                <ViewJobCard show={show} markedJobs={favouriteJobs} favouriteJobLoading={favouriteJobLoading} unfavouriteJobLoading={unfavouriteJobLoading} favouriteJob={favouriteJob} unFavouriteJob={unFavouriteJob} avatar={true} user={user} data={x} setData={setData} />
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
