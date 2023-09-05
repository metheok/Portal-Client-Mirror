import { React, useEffect, useState } from "react";
import ViewJobCard from "../ViewJob/ViewJobCard";
import { Button, Card, Row, Col } from "react-bootstrap";
import css from "../../components/JobseekerProfileView/JobseekerProfileView.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmptyCard from "../EmptyCard/EmptyCard";
import JobseekerSearchJobs from "./JobseekerSearchJobs";
import Loading from "../Loading/Loading";
import { userFetch } from "../../state/user/userActions";
import { BiArrowBack } from "react-icons/bi";
import { setViewJobLoading, setViewJobSuccess, setViewJobError, setFavouriteJobLoading, setFavouriteJobError, setFavouriteJobSuccess, setUnfavouriteJobError, setUnfavouriteJobLoading, setUnfavouriteJobSuccess } from "../../state/jobseekerJob/jobseekerJobSlice";

const JobseekerViewDetails = ({
    user,
    id,
    allData,
    setAllData,
    page,
    totalPages,
    favouriteJobs,
    setFavouriteJobs,
    dispatch,
    state,
    userToken
}) => {
    const [company, setCompany] = useState({});
    const [data, setData] = useState({});
    const [showMore, setShowMore] = useState(false);

    const navigate = useNavigate();

    const { viewJobLoading,
        viewJobSuccess,
        viewJobError, favouriteJobLoading, favouriteJobSuccess, favouriteJobError, unfavouriteJobLoading, unfavouriteJobSuccess, unfavouriteJobError } = state.jobseekerJobs;

    useEffect(() => {
        dispatch(setViewJobLoading());
        axios.get(`/api/jobseeker/job/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                setData(res.data.job);
                setCompany(res.data.company)
                setFavouriteJobs(user.profile.favouriteJobs)
                dispatch(setViewJobSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(setViewJobError(err));
            })
    }, [id])

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
            <Row>
                {allData && <Col xs={4} md={3}>
                    <JobseekerSearchJobs
                        dispatch={dispatch}
                        data={allData}
                        setData={setAllData}
                        state={state}
                        user={user}
                        page={page}
                        totalPages={totalPages}
                        favouriteJobs={favouriteJobs}
                        setFavouriteJobs={setFavouriteJobs}
                        show={false}
                    />
                </Col>}
                <Col xs={12} md={allData ? 6 : 12}>
                    {allData && <div role="button">
                        <BiArrowBack className="mb-2" onClick={() => navigate('/dashboard/search-jobs')} style={{ fontSize: '30px' }} />
                    </div>}
                    {data && <div className="row">
                        {viewJobLoading ? <Loading /> : <div className='mb-4'>
                            <ViewJobCard id={id} show={true} markedJobs={favouriteJobs} favouriteJobLoading={favouriteJobLoading} unfavouriteJobLoading={unfavouriteJobLoading} favouriteJob={favouriteJob} unFavouriteJob={unFavouriteJob} avatar={true} user={user} data={data} setData={setData} />
                            <Card className={`${css.Card} p-2 mb-3 mt-3`} >
                                <div>
                                    <span className='mb-4 d-block'>{data.jobTitle}</span>
                                    <span className='mb-1 d-block' style={{ fontWeight: 'normal' }}>{data.country}, {data.city}</span>
                                    <span className='mb-1 d-block' style={{ fontWeight: 'normal' }}>{data.workplaceType}</span>
                                    <span className='mb-4 d-block' style={{ fontWeight: 'normal' }}>{data.jobType}</span>
                                    <span className='mb-4 d-block'>Details</span>
                                    <span className='d-block'>Description</span>
                                    <span className='mb-2 d-block' style={{ fontWeight: 'normal' }}>{data.description}</span>
                                    <span className='d-block'>Responsibilities</span>
                                    <span className='mb-1' style={{ fontWeight: 'normal' }}>{data.responsibilities}</span>
                                </div>
                            </Card>
                            {company && <Card className={`${css.Card} p-2 mb-3`} >
                                <div>
                                    <div className='mb-4 d-flex justify-content-between align-items-center'>
                                        <span>View Company</span>
                                        <button onClick={() => setShowMore(pValue => { return !pValue })} className="text-primary bg-transparent" style={{ fontSize: '30px', border: 'none' }}>{showMore ? '-' : '+'}</button>
                                    </div>

                                    <span className='mb-2 d-block'>{company.companyName}</span>
                                    <span className='mb-3 d-block' style={{ fontWeight: 'normal' }}>{company.description}</span>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <span className='mb-2 d-block'>Industry type</span>
                                            {showMore && <span className='d-block' style={{ fontWeight: 'normal' }}>{company.industry}</span>}
                                        </Col>
                                        <Col md={4}>
                                            <span className='mb-2 d-block'>Company type</span>
                                            {showMore && <span className='d-block' style={{ fontWeight: 'normal' }}>{company.companyType}</span>}
                                        </Col>
                                        <Col md={4}>
                                            <span className='mb-2 d-block'>No of employee</span>
                                            {showMore && <span className='d-block' style={{ fontWeight: 'normal' }}>{company.employeeStrength}</span>}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <span className='mb-2 d-block'>Website</span>
                                            {showMore && <span className='d-block' style={{ fontWeight: 'normal' }}>{company.website}</span>}
                                        </Col>
                                        <Col md={4}>
                                            <span className='mb-2 d-block'>Registration number</span>
                                            {showMore && <span className='d-block' style={{ fontWeight: 'normal' }}>{company.companyRegistrationNumber}</span>}
                                        </Col>
                                        <Col md={4}>
                                            <span className='mb-2 d-block'>Established</span>
                                            {showMore && <span className='d-block' style={{ fontWeight: 'normal' }}>{company.companyYearOfRegistration}</span>}
                                        </Col>
                                    </Row>
                                    {showMore && <Row className="mb-3">
                                        <Col md={12}>
                                            <span className='mb-2 d-block'>Registrated Address</span>
                                            <span className='d-block' style={{ fontWeight: 'normal' }}>{company.registeredAddressLine1}</span>
                                            <span className='d-block' style={{ fontWeight: 'normal' }}>{company.registeredAddressLine2}</span>
                                            <span className='d-block' style={{ fontWeight: 'normal' }}>{company.registeredAddressState}</span>
                                            <span className='d-block' style={{ fontWeight: 'normal' }}>{company.registeredAddressCountry}</span>
                                            <span className='d-block' style={{ fontWeight: 'normal' }}>{company.registeredAddressPin}</span>
                                        </Col>
                                    </Row>}
                                    {showMore && <div>
                                        {company.offices && <Row>
                                            <Col md={12}>
                                                <span className='mb-2 d-block'>Office location</span>
                                                {company.offices.map((x) => {
                                                    return (
                                                        <span className='mb-1 d-block' style={{ fontWeight: 'normal' }}>{x.city}, {x.country}</span>
                                                    )
                                                })}
                                            </Col>
                                        </Row>}
                                    </div>}
                                </div>
                            </Card>}
                            <Card className={`${css.Card} p-2 mb-3`} >
                                <div>
                                    <span className=' d-block'>Qualifications</span>
                                    <span className='mb-3 d-block' style={{ fontWeight: 'normal' }}>{data.qualifications}</span>
                                    <span className='mb-4 d-block'>Skills, Experience</span>
                                    <div style={{ fontWeight: 'normal' }} className='mb-4'>
                                        {data.minimumRequirements && data.minimumRequirements.map((x) => {
                                            return (
                                                <span className=' d-block'><span style={{ fontWeight: 'bolder' }}>{x.skill}:</span> {x.experience}</span>
                                            )
                                        })}
                                    </div>
                                </div>
                                {allData && <Button onClick={() => navigate('/dashboard/search-jobs')} className="mx-auto mb-2" style={{ width: '25%' }} variant="secondary">Back</Button>}
                            </Card>
                        </div>}
                    </div>}
                </Col>
                {allData && <Col xs={4} md={3}>
                    <EmptyCard />
                </Col>}
            </Row>
        </>
    )
}

export default JobseekerViewDetails;
