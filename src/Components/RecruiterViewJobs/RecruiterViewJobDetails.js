import { React, useEffect, useState } from "react";
import ViewJobCard from "../ViewJob/ViewJobCard";
import { Button, Card } from "react-bootstrap";
import css from "../../components/JobseekerProfileView/JobseekerProfileView.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../../components/Avatar/AvatarProfile";
import {
  setViewJobLoading,
  setViewJobSuccess,
  setViewJobError,
} from "../../state/recruiterJob/recruiterJobSlice";
import Loading from "../Loading/Loading";

const RecruiterViewJobDetails = ({
  user,
  id,

  dispatch,
  state,
  userToken,
}) => {
  const navigate = useNavigate();
  const [company, setCompany] = useState({});
  const [data, setData] = useState();

  const { viewJobLoading, viewJobSuccess, viewJobError } = state.recruiterJobs;

  useEffect(() => {
    dispatch(setViewJobLoading());
    axios
      .get(`/api/recruiter/job/fetch/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setData(res.data.job);
        setCompany(res.data.company);
        dispatch(setViewJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setViewJobError(err));
      });
  }, []);

  return (
    <>
      {data && (
        <div className="row">
          {viewJobLoading ? (
            <Loading />
          ) : (
            <div className="mb-4">
              <Card className={`${css.Card} p-2 mb-3`}>
                <div>
                  <div className="d-flex">
                    <div style={{ margin: "0.5rem" }}>
                      <Avatar user={user} size={45} />
                    </div>
                    <span className={css.userName + " mt-3"}>
                      {data.jobTitle}
                      <small className="text-muted">
                        {" "}
                        (0 out of{" "}
                        {data.NoOfApplications
                          ? data.NoOfApplications
                          : "0"}{" "}
                        applications recieved)
                      </small>
                    </span>
                  </div>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.country}, {data.city}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.workplaceType}
                  </span>
                  <span
                    className="mb-4d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.jobType}
                  </span>
                </div>
              </Card>
              <Card className={`${css.Card} p-2 mb-3`}>
                <div>
                  <span className="mb-4 d-block">Details</span>
                  <span className="d-block">Description</span>
                  <span
                    className="mb-2 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.description}
                  </span>
                  <span className="d-block">Responsibilities</span>
                  <span className="mb-1" style={{ fontWeight: "normal" }}>
                    {data.responsibilities}
                  </span>
                </div>
              </Card>
              {company && (
                <Card className={`${css.Card} p-2 mb-3`}>
                  <div>
                    <span className="mb-4 d-block">View Company</span>
                    <span className="mb-2 d-block">{company.companyName}</span>
                    <span className="d-block" style={{ fontWeight: "normal" }}>
                      {company.description}
                    </span>
                  </div>
                </Card>
              )}
              <Card className={`${css.Card} p-2 mb-3`}>
                <div>
                  <span className=" d-block">Qualifications</span>
                  <span
                    className="mb-3 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.qualifications}
                  </span>
                  <span className="mb-4 d-block">Skills, Experience</span>
                  <div style={{ fontWeight: "normal" }} className="mb-4">
                    {data.minimumRequirements &&
                      data.minimumRequirements.map((x) => {
                        return (
                          <span className=" d-block">
                            <span style={{ fontWeight: "bolder" }}>
                              {x.skill}:
                            </span>{" "}
                            {x.experience}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </Card>
              <Card className={`${css.Card} p-2 mb-3`}>
                <div>
                  <span className="mb-4 d-block">{data.jobTitle}</span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.country}, {data.city}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.workplaceType}
                  </span>
                  <span
                    className="mb-4 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    {data.jobType}
                  </span>
                  <span className="mb-4 d-block">Details</span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>Description:</span>{" "}
                    {data.description}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      Qualifications:
                    </span>{" "}
                    {data.qualifications}
                  </span>
                </div>
              </Card>
              <Card className={`${css.Card} p-2`}>
                <div>
                  <span className="mb-4 d-block">Payout Details</span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      No. of Vacancies:
                    </span>{" "}
                    {data.NoOfVacancies}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      No. of Applications required:
                    </span>{" "}
                    {data.NoOfApplications}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      Annual CTC Range:
                    </span>{" "}
                    {data.annualCtcRange}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      Maximum Budget:
                    </span>{" "}
                    {data.maximumBudget}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>Minimum CTC:</span>{" "}
                    {data.minimumCtc}
                  </span>
                  <span
                    className="mb-1 d-block"
                    style={{ fontWeight: "normal" }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      FulFillmentPayout ({data.FulFillmentPayoutType}):
                    </span>{" "}
                    {data.FulFillmentPayout}
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RecruiterViewJobDetails;
