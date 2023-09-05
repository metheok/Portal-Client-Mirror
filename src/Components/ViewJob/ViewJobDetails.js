import { React, useEffect, useState } from "react";
import ViewJobCard from "./ViewJobCard";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setJobDetailsLoading,
  setJobDetailsSuccess,
  setJobDetailsError,
} from "../../state/employerJob/employerJobSlice";
import Loading from "../Loading/Loading";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import css from './ViewJobCard.module.css'

const ViewJobDetails = ({
  user,
  id,
  data,
  setData,
  statusChange,
  dispatch,
  state,
  userToken
}) => {
  const navigate = useNavigate();

  const { jobDetailsLoading, jobDetailsSuccess, jobDetailsError } =
    state.employerJobs;

  useEffect(() => {
    dispatch(setJobDetailsLoading());
    axios
      .get(`/api/employer/job/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setData(res.data.job);
        dispatch(setJobDetailsSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setJobDetailsError(err));
      });
  }, []);

  return (
    <div className={css.TabContainer}>
      <Link to={`/dashboard/jobs?status=${data.status}&page=1`}>
        <span className={css.backArrow}><BiArrowBack /></span>
      </Link>
      <h1>{data.jobTitle}</h1>
      {jobDetailsLoading ? (
        <Loading />
      ) : (data && (
        <div className="row">
          <div className="mb-3">
            <ViewJobCard
              statusChange={statusChange}
              avatar={true}
              user={user}
              status={data.status}
              id={id}
              data={data}
            />
          </div>
          <div className="mb-4">
            <Card className={`${css.Card} p-2`}>
              <div>
                <h1 className="mb-4">{data.jobTitle}</h1>
                <p className="mb-1">
                  Country : <span>{data.country} </span>, city :
                  <span>{data.city}</span>
                </p>
                <p className="mb-1">
                  Workplace : <span>{data.workplaceType}</span>
                </p>
                <p className="mb-4">
                  Job type :  <span>{data.jobType}</span>
                </p>
                <h1 className="mb-2">Details</h1>
                <p className="mb-1">
                  Description: <span>{data.description}</span>
                </p>
                <p className="mb-1">
                  Qualifications: <span>{data.qualifications}</span>
                </p>
                <div className="mb-4">
                  <p className="mb-1">
                    skills,Experience
                  </p>
                  {data.minimumRequirements &&

                    data.minimumRequirements.map((x, index) => {
                      return (
                        <span key={index}>

                          <span >
                            {x.skill},
                          </span>
                          {x.experience}
                        </span>
                      );
                    })
                  }
                </div>
                <h1 className="mb-4">Questions</h1>

                <div className="mb-3">
                  {data.screeningQuestions &&
                    data.screeningQuestions.map((x, index) => {
                      return (
                        <div
                          style={{ fontWeight: "normal" }}
                          className="d-flex mb-1"
                          key={index}
                        >
                          <p>{index + 1}.</p>
                          <div className="d-flex flex-column">
                            <p>{x.question}</p>

                            <p>
                              Answer: <span>{x.idealAnswer} </span>
                            </p>


                          </div>
                        </div>
                      );
                    })}
                </div>
                <h1 className="mb-4">Payout Details</h1>
                <p className="mb-1" >
                  No. of Vacancies: <span>{data.NoOfVacancies}</span>
                </p>
                <p className="mb-1" >
                  No. of Applications required: <span>{data.NoOfApplications}</span>
                </p>
                <p className="mb-1" >
                  Annual CTC Range: <span>{data.annualCtcRange}</span>
                </p>
                <p className="mb-1" >
                  Maximum Budget: <span>{data.maximumBudget}</span>
                </p>
                <p className="mb-1" >
                  Minimum CTC: <span>{data.minimumCtc}</span>
                </p>
                <p className="mb-1" >
                  FulFillmentPayout ({data.FulFillmentPayoutType}):<span> {data.FulFillmentPayout}</span>
                </p>
              </div>
            </Card>
          </div>
          {!user.user.userType === "recruiter" && data.status && (
            <div className="d-flex justify-content-center">
              {data.status === "closed" ? (
                <Button
                  style={{ borderRadius: "5px", fontSize: "12px" }}
                  type="button"
                  variant="secondary"
                  className="me-3"
                  onClick={() => navigate(`/dashboard/job/edit-job/new/review-and-submit`, { state: { data: data } })}
                >
                  Repost Job
                </Button>
              ) : data.status === "draft" ? (
                <Button
                  style={{ borderRadius: "5px", fontSize: "12px" }}
                  type="button"
                  variant="secondary"
                  onClick={() => statusChange("deleted", data)}
                >
                  Delete Draft
                </Button>
              ) : (
                <Button
                  style={{ borderRadius: "5px", fontSize: "12px" }}
                  type="button"
                  variant="secondary"
                  className="me-3"
                  onClick={() => statusChange("closed", data)}
                >
                  Close Job
                </Button>
              )}
              {data.status === "draft" ? (
                <Button
                  style={{ borderRadius: "5px", fontSize: "12px" }}
                  type="button"
                  variant="primary"
                  className="me-3"
                  onClick={() => navigate(`/dashboard/jobs/${data.jobId}`)}
                >
                  Complete Draft
                </Button>
              ) : (
                <Button
                  style={{ borderRadius: "5px", fontSize: "12px" }}
                  type="button"
                  variant="primary"
                >
                  View Applications
                </Button>
              )}
            </div>
          )}
        </div>
      )
      )}
    </div>
  );
};

export default ViewJobDetails;
