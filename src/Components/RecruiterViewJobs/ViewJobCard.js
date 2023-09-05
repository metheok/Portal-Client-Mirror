import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Avatar from "../../components/Avatar/AvatarProfile";
import css from "./ViewJobCard.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ViewJobCard = ({
  user,
  type,
  data,
  status,
  id,
  avatar,
  statusChange,
  markJob,
  unmarkJob,
  markJobLoading,
  unmarkJobLoading,
  markedJobs,
  favouriteJob,
  unFavouriteJob,
  favourite,
  favouriteJobLoading,
  unfavouriteJobLoading,
  show,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (type === "marked") {
      if (id && markedJobs) {
        const isMarked = markedJobs.some((x) => x.jobId === id);
        setMarked(isMarked);
      } else if (markedJobs && !id) {
        const isMarked = markedJobs.some((x) => x.jobId === data.jobId);

        setMarked(isMarked);
      }
    }
  }, [markedJobs]);
  let firstButton = (
    <Button
      style={{ borderRadius: "5px", fontSize: "12px" }}
      type="button"
      variant="secondary"
      className="mb-2"
      onClick={() => {
        navigate(`/dashboard/jobs/${data.jobId}`);
      }}
      disabled={markJobLoading || unmarkJobLoading}
    >
      View Details
    </Button>
  );
  let secondButton = (
    <Button
      style={{ borderRadius: "5px", fontSize: "12px" }}
      type="button"
      variant="secondary"
      className="mb-2"
      onClick={() => navigate(`/dashboard/refer-job/${data.jobId}`)}
      disabled={markJobLoading || unmarkJobLoading}
    >
      Refer New Candidate
    </Button>
  );
  let thirdButton = null;
  if (type === "marked") {
    thirdButton = marked ? (
      <Button
        style={{ borderRadius: "5px", fontSize: "12px" }}
        type="button"
        variant="secondary"
        onClick={() => {
          unmarkJob(data.jobId);
        }}
        disabled={markJobLoading || unmarkJobLoading}
      >
        {unmarkJobLoading ? "..." : "Unmark"}
      </Button>
    ) : (
      <Button
        style={{ borderRadius: "5px", fontSize: "12px" }}
        type="button"
        variant="secondary"
        onClick={() => {
          markJob(data.jobId);
        }}
        disabled={markJobLoading || unmarkJobLoading}
      >
        {markJobLoading ? "..." : "Mark This Job"}
      </Button>
    );
  }
  if (type === "referred") {
    thirdButton = (
      <Button
        style={{ borderRadius: "5px", fontSize: "12px" }}
        type="button"
        variant="secondary"
      >
        View Referred Candidate
      </Button>
    );
  }
  if (type === "referred-closed") {
    firstButton = null;
    secondButton = null;
    thirdButton = (
      <Button
        style={{ borderRadius: "5px", fontSize: "12px" }}
        type="button"
        variant="secondary"
      >
        View Referred Candidate
      </Button>
    );
  }

  return (
    <Card className={css.CardBody}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            {avatar && (
              <div style={{ margin: "0.5rem" }}>
                <Avatar user={user} size={45} />
              </div>
            )}
            <div className="mt-3 ms-1">
              <span className={css.userName}>{data.jobTitle}</span>
              <span
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {data.workplaceType}
              </span>
              {/* <span
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {data.NoOfApplications ? data.NoOfApplications : 0}
              </span> */}
              {data.createdAt && (
                <div className="d-flex">
                  <small className="text-muted">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </small>
                  <small className="ms-2 text-muted">
                    {new Date(data.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </div>
              )}
              {(status === "live" ||
                status === "under-review" ||
                status === "paused") &&
              avatar ? (
                <div className="mt-4">
                  {!id && (
                    <Button
                      style={{ borderRadius: "5px", fontSize: "12px" }}
                      type="button"
                      variant="secondary"
                      className="me-1"
                      onClick={() => navigate(`/dashboard/jobs/${data.jobId}`)}
                    >
                      View Job
                    </Button>
                  )}
                  {status !== "under-review" && (
                    <Button
                      style={{ borderRadius: "5px", fontSize: "12px" }}
                      type="button"
                      variant={avatar ? "secondary" : "primary"}
                      className="me-1"
                    >
                      View Applications
                    </Button>
                  )}
                  <Button
                    style={{ borderRadius: "5px", fontSize: "12px" }}
                    type="button"
                    variant="secondary"
                    onClick={() => statusChange("closed", data)}
                  >
                    Close Job
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="align-self-start">
            {(status === "live" ||
              status === "under-review" ||
              status === "paused") &&
              avatar && (
                <div className="d-flex align-items-center flex-column">
                  <div>Job Status</div>
                  <div>{data.status}</div>
                </div>
              )}
            <div className="d-flex flex-column">
              {firstButton}
              {secondButton}
              {thirdButton}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ViewJobCard;
