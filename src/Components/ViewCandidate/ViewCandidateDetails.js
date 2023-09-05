import { React, useEffect, useState } from "react";
import ViewCandidateCard from "./ViewCandidateCard";
import { Button, Card, Table } from "react-bootstrap";
import css from "../../components/JobseekerProfileView/JobseekerProfileView.module.css";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import Avatar from "../Avatar/AvatarProfile";
import { setViewCandidateLoading, setViewCandidateSuccess, setViewCandidateError } from "../../state/recruiterCandidate/recruiterCandidateSlice";
import Loading from "../Loading/Loading";

const ViewCandidateDetails = ({
    user,
    id,
    data,
    setData,
    dispatch,
    state,
    userToken
}) => {
    const navigate = useNavigate();

    const {
        ViewCandidateLoading,
        ViewCandidateSuccess,
        ViewCandidateError,
    } = state.candidateList;

    useEffect(() => {
        dispatch(setViewCandidateLoading());
        axios.get(`/api/recruiter/candidate/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                setData(res.data.candidate);
                dispatch(setViewCandidateSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(setViewCandidateError(err));
            })
    }, [])

    return (
        <>
            {data && <div className="row">
                {ViewCandidateLoading ? <Loading /> : <div className='mb-4'>
                    <div role="button">
                        <BiArrowBack className="mb-2" onClick={() => navigate('/dashboard/candidate/search')} style={{ fontSize: '30px' }} />
                    </div>
                    <div className="mb-3">
                        <ViewCandidateCard user={user} id={id} data={data} setData={setData} />
                    </div>
                    <Card className={`${css.Card} p-2`} >
                        <span className='mb-3 d-block'>Insights from Profile</span>
                        {data.experience && data.experience.length > 0 && <div className="mb-2">
                            <span style={{ fontWeight: 'bolder' }} className='mb-3 d-block'>Experience</span>
                            {data.experience.map((x) => {
                                return (<div className="mb-2">
                                    <small className='d-block'>{x.designation}</small>
                                    <small className='text-muted d-block'>{x.organizationName}</small>
                                    <small className='text-muted d-block'>{x.joiningDate.split('/')[1]} - {!x.relievingDate || x.relievingDate === "" ? 'Present' : x.relievingDate.split('/')[1]}</small>
                                </div>)
                            })}
                        </div>}
                        {data.experience && data.experience.length > 0 && <Table bordered size="sm">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Organization Name</th>
                                    <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Designation</th>
                                    <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Responsibilities</th>
                                    <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Total Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.experience.map((x) => {
                                    return (<tr>
                                        <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.organizationName}</td>
                                        <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.designation}</td>
                                        <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.responsibilities ? x.responsibilities : 'None'}</td>
                                        <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.totalExperience}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>}
                        {data.education && data.education.length > 0 && <div className="mb-3 mt-2">
                            <span style={{ fontWeight: 'bolder' }} className='mb-3 d-block'>Education</span>
                            {data.education.map((x) => {
                                return (<div className="mb-2">
                                    <small className='d-block'>{x.degree}</small>
                                    <small className='text-muted d-block'>{x.institute}</small>
                                    <small className='text-muted d-block'>{x.yearOfPassing}</small>
                                </div>)
                            })}
                            <Table className="mt-3" bordered size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Degree Name</th>
                                        <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Year of Passing</th>
                                        <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">College/University</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.education.map((x) => {
                                        return (<tr>
                                            <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.degree}</td>
                                            <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.yearOfPassing}</td>
                                            <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.institute}</td>
                                        </tr>)
                                    })}
                                </tbody>
                            </Table>
                        </div>}
                        {data.skills && data.skills.length > 0 && <div className="mb-3">
                            <span style={{ fontWeight: 'bolder' }} className='mb-3 d-block'>Skills</span>
                            {data.skills.map((x) => {
                                return (<div className="mb-2">
                                    <small className='d-block'>{x.skill}</small>
                                    {/* <small className='text-muted d-block'>{x.organizationName}</small> */}
                                </div>)
                            })}
                            <Table className="mt-3" bordered size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Name of skill/technology</th>
                                        <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Experience in taht skill</th>
                                        <th style={{ backgroundColor: "#d4d4d4" }} className="text-center text-muted">Brief project using that skill</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.skills.map((x) => {
                                        return (<tr>
                                            <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.skill}</td>
                                            <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">{x.experience.split('/')[0]} years {x.experience.split('/')[1]} months</td>
                                            <td style={{ backgroundColor: "#F2F2F2" }} className="text-center text-muted">none</td>
                                        </tr>)
                                    })}
                                </tbody>
                            </Table>
                        </div>}
                    </Card>
                    <div className="mt-2 d-flex justify-content-end">
                        <Button variant="secondary" onClick={() => navigate('/dashboard/candidate/search')}>Back</Button>
                        <Button className="ms-2" variant="primary">Connect</Button>
                    </div>
                </div>}
            </div>}
        </>
    )
}

export default ViewCandidateDetails;
