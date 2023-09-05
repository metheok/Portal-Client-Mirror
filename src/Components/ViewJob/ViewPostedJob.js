import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ViewJobCard from "./ViewJobCard";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Pagination, Row, Col } from "react-bootstrap";
import {
    setLiveJobLoading,
    setLiveJobSuccess,
    setLiveJobError,
    setReviewJobLoading,
    setReviewJobSuccess,
    setReviewJobError,
    setPausedJobLoading,
    setPausedJobSuccess,
    setPausedJobError,
    setDraftJobLoading,
    setDraftJobSuccess,
    setDraftJobError,
    setClosedJobLoading,
    setClosedJobSuccess,
    setClosedJobError
} from "../../state/employerJob/employerJobSlice";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import css from './ViewJobCard.module.css'
import Loading from "../Loading/Loading";

export default function ViewPostedJob({
    status,
    user,
    state,
    data,
    setData,
    statusChange,
    setShow,
    dispatch,
    page,
    userToken,
    isMobile
}) {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("live");
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);


    const {
        liveJobLoading,
        liveJobSuccess,
        liveJobError,
        pausedJobLoading,
        pausedJobSuccess,
        pausedJobError,
        reviewJobLoading,
        reviewJobSuccess,
        reviewJobError,
        draftJobLoading,
        draftJobSuccess,
        draftJobError,
        closedJobLoading,
        closedJobSuccess,
        closedJobError

    } = state.employerJobs;

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
        navigate(`/dashboard/jobs?status=${selectedTab}&page=${page || 1}`);
    };

    useEffect(() => {
        navigate(`/dashboard/jobs?status=${status}&page=${page || 1}`)
        if (status === "live") {
            dispatch(setLiveJobLoading());
        } else if (status === "under-review") {
            dispatch(setReviewJobLoading());
        } else if (status === "paused") {
            dispatch(setPausedJobLoading());
        } else if (status === "draft") {
            dispatch(setDraftJobLoading());
        } else if (status === "closed") {
            dispatch(setClosedJobLoading());
        }
        axios
            .get(`/api/employer/job?status=${status}&page=${page}&limit=${itemsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((res) => {
                setTotalPages(res.data.pagination.totalPages)
                setData(res.data.jobs);
                if (status === "live") {
                    dispatch(setLiveJobSuccess());
                } else if (status === "under-review") {
                    dispatch(setReviewJobSuccess());
                } else if (status === "paused") {
                    dispatch(setPausedJobSuccess());
                } else if (status === "draft") {
                    dispatch(setDraftJobSuccess());
                } else if (status === "closed") {
                    dispatch(setClosedJobSuccess());
                }
            })
            .catch((err) => {
                console.log(err);
                if (status === "live") {
                    dispatch(setLiveJobError(err));
                } else if (status === "under-review") {
                    dispatch(setReviewJobError(err));
                } else if (status === "paused") {
                    dispatch(setPausedJobError(err));
                } else if (status === "draft") {
                    dispatch(setDraftJobError(err));
                } else if (status === "closed") {
                    dispatch(setClosedJobError(err));
                }
                setData([]);
            });
        if (status === "live") {
            setActiveTab("live");
        } else if (status === "under-review") {
            setActiveTab("under-review");
        } else if (status === "paused") {
            setActiveTab("paused");
        } else if (status === "draft") {
            setActiveTab("draft");
        }
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

    const mobileView = () => {
        return (
            <>
                <style>
                    {`
              @media (max-width: 450px) {
             .nav-tabs .nav-link {
              font-size: 14px;
            }
          }
          @media (max-width: 375px) {
            .nav-tabs .nav-link {
              font-size: 13px;
            }
          }
          .nav-tabs {
            padding:0.2rem 0 ;
            border:1px solid rgba(0, 0, 0, 0.03);
          box-shadow: 0px 5px 5px -7px rgba(0,0,0,1);
            margin-bottom: 20px;
            border-bottom: 0
          }

          .nav-tabs .nav-link {
            border: none;
            background-color: #fff;
            color: #333;
            font-weight: bold;
            padding: 9px 5px;
            border-radius: 0;
            margin-right: 5px;
            cursor: pointer;
            font-family: Roboto;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: 0.01em;
            text-align: center;
            transition: border-bottom-color 0.3s ease-in-out;
          }

          .nav-tabs .nav-link.active {
            background-color: #fff;
            color: #000;
            border-bottom: 2px solid #ddd;
            border-bottom-color: rgba(8, 43, 93, 1);
          }

            `}
                </style>
                <div className={` ${css.TabContainer} tabContainer`}>
                    <Link to='/dashboard'>
                        <span className={css.backArrow}><BiArrowBack /></span>
                    </Link>
                    <h1>Jobs</h1>
                    <Tabs className="mb-3" activeKey={activeTab} onSelect={handleTabSelect}>
                        <Tab eventKey="live" title="live">
                            <h1>Live</h1>
                            {liveJobLoading ? (
                                <Loading />
                            ) : Array.isArray(data) && data.length > 0 ? (
                                data.map((x, index) => {
                                    return (
                                        <div key={index} className="mb-3">
                                            <ViewJobCard
                                                setShow={setShow}
                                                statusChange={statusChange}
                                                avatar={true}
                                                user={user}
                                                data={x}
                                                setData={setData}
                                                status={status}
                                                page={page}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div>No jobs added yet.</div>
                            )}
                        </Tab>
                        <Tab eventKey="under-review" title="under-review">
                            <h1>Drafts</h1>
                            {reviewJobLoading ? (
                                <Loading />
                            ) : Array.isArray(data) && data.length > 0 ? (
                                data.map((x, index) => {
                                    return (
                                        <div key={index} className="mb-3">
                                            <ViewJobCard
                                                setShow={setShow}
                                                statusChange={statusChange}
                                                avatar={true}
                                                user={user}
                                                data={x}
                                                setData={setData}
                                                status={status}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div>No jobs added yet.</div>
                            )}
                        </Tab>
                        <Tab eventKey="paused" title="paused">
                            <h1>Closed Jobs</h1>
                            {pausedJobLoading ? (
                                <Loading />
                            ) : Array.isArray(data) && data.length > 0 ? (
                                data.map((x, index) => {
                                    return (
                                        <div key={index} className="mb-3">
                                            <ViewJobCard
                                                setShow={setShow}
                                                statusChange={statusChange}
                                                avatar={true}
                                                user={user}
                                                data={x}
                                                setData={setData}
                                                status={status}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div>No jobs added yet.</div>
                            )}
                        </Tab>
                        <Tab eventKey="draft" title="Draft">
                            <h1>Draft Jobs</h1>
                            {draftJobLoading ? (
                                <Loading />
                            ) : (
                                <>
                                    <div>
                                        {Array.isArray(data) && data.length > 0 ? (
                                            data.map((x) => {
                                                return (
                                                    <div className="mb-3">
                                                        <ViewJobCard
                                                            setShow={setShow}
                                                            statusChange={statusChange}
                                                            avatar={true}
                                                            user={user}
                                                            data={x}
                                                            setData={setData}
                                                            status={status}
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div>No jobs added yet.</div>
                                        )}
                                    </div>
                                </>
                            )}

                        </Tab>
                        <Tab eventKey="closed" title="closed">
                            <h1>closed Jobs</h1>
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
                                </>}
                        </Tab>
                    </Tabs>
                    {Array.isArray(data) && data.length > 0 && (
                        <Row className="justify-content-center">
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
                        </Row>
                    )}
                </div>
            </>)
    }

    const desktopView = () => {
        return (
            <>
                <Tabs className="mb-3" activeKey={activeTab} onSelect={handleTabSelect}>
                    <Tab eventKey="live" title="Live">
                        {liveJobLoading ? (
                            <Loading />
                        ) : Array.isArray(data) && data.length > 0 ? (
                            data.map((x, index) => {
                                return (
                                    <div key={index} className="mb-3">
                                        <ViewJobCard
                                            setShow={setShow}
                                            statusChange={statusChange}
                                            avatar={true}
                                            user={user}
                                            data={x}
                                            setData={setData}
                                            status={status}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div>No jobs added yet.</div>
                        )}
                    </Tab>
                    <Tab eventKey="under-review" title="Under Review">
                        {reviewJobLoading ? (
                            <Loading />
                        ) : Array.isArray(data) && data.length > 0 ? (
                            data.map((x, index) => {
                                return (
                                    <div key={index} className="mb-3">
                                        <ViewJobCard
                                            setShow={setShow}
                                            statusChange={statusChange}
                                            avatar={true}
                                            user={user}
                                            data={x}
                                            setData={setData}
                                            status={status}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div>No jobs added yet.</div>
                        )}
                    </Tab>
                    <Tab eventKey="paused" title="Paused">
                        {pausedJobLoading ? (
                            <Loading />
                        ) : Array.isArray(data) && data.length > 0 ? (
                            data.map((x, index) => {
                                return (
                                    <div key={index} className="mb-3">
                                        <ViewJobCard
                                            setShow={setShow}
                                            statusChange={statusChange}
                                            avatar={true}
                                            user={user}
                                            data={x}
                                            setData={setData}
                                            status={status}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div>No jobs added yet.</div>
                        )}
                    </Tab>
                </Tabs>
                {Array.isArray(data) && data.length > 0 && (
                    <Row className="justify-content-center">
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
                    </Row>

                )}
            </>)
    }

    return (
        <div>
            {isMobile ? (<>{mobileView()}</>) : (<>{desktopView()}</>)}
        </div>
    );
}
