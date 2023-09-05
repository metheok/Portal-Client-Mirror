import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ViewJobCard from "./ViewJobCard";
import { Tabs, Tab, Pagination, Row, Col } from "react-bootstrap";
import {
    setClosedJobLoading,
    setClosedJobSuccess,
    setClosedJobError,
} from "../../state/employerJob/employerJobSlice";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router";

export default function ViewClosedJob({
    status,
    user,
    state,
    data,
    setData,
    statusChange,
    setShow,
    dispatch,
    page,
    userToken
}) {
    const [activeTab, setActiveTab] = useState("live");
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [markedJobs, setMarkedJobs] = useState([])

    const navigate = useNavigate();


  const { closedJobLoading, closedJobSuccess, closedJobError } =
    state.employerJobs;


    useEffect(() => {
        navigate(`/dashboard/jobs?status=${status}&page=${page || 1}`)
        dispatch(setClosedJobLoading());
        axios
            .get(`/api/employer/job?status=${status}&page=${page}&limit=${itemsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((res) => {
                setTotalPages(res.data.pagination.totalPages)
                setData(res.data.jobs);
                dispatch(setClosedJobSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(setClosedJobError(err));
                setData([]);
            });
    }, [status, page]);

    const handlePageChange = (pageNumber) => {
        navigate(`/dashboard/jobs?status=${status}&page=${pageNumber}`)
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            navigate(`/dashboard/jobs?status=${status}&page=${parseInt(page) + 1}`)
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            navigate(`/dashboard/jobs?status=${status}&page=${parseInt(page) - 1}`)
        }
    };

    return (
        <>
        <h3 className="font-weight-bolder mb-3 text-center">Closed</h3>
        {closedJobLoading ? <Loading /> :
            <>
                <div>
                    {Array.isArray(data) && data.length > 0 ? data.map((x) => {
                        return (
                            <div className="mb-3">
                                <ViewJobCard setShow={setShow} statusChange={statusChange} avatar={true} user={user} data={x} setData={setData} status={status} />
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
