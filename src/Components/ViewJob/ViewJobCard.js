import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Avatar from "../../components/Avatar/AvatarProfile";
import css from "./ViewJobCard.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ViewJobCard = ({
  user,
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
  page
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (favourite) {
      setMarked(true);
      return;
    }
    if (id && markedJobs) {
      const isMarked = markedJobs.some((x) => x.jobId === id);
      console.log(isMarked, "1111111");
      setMarked(isMarked);
    } else if (markedJobs && !id) {
      const isMarked = markedJobs.some((x) => x.jobId === data.jobId);
      console.log(isMarked, "222222");
      setMarked(isMarked);
    }
  }, [markedJobs]);

  console.log({ data });

  return (
    <Card className={css.CardBody}>
      <Card.Body className={css.cardBodySection}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            {avatar && (
              <div style={{ margin: "0.5rem" }}>
                <Avatar user={user} size={45} />
              </div>
            )}
            <div className="mt-3 ms-1">
              <span className={css.userName}>{data.jobTitle}</span>
              <span className={css.subTitle} >
                {data.workplaceType}
              </span>
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

            </div>
          </div>
          <div className="align-self-start">
            {(status === "live" ||
              status === "under-review" ||
              status === "paused") &&
              avatar ? (
              <div className="d-flex align-items-center flex-column">
                <div className={css.status}>Job Status</div>
                <div className={css.currentStatus}>{data.status}</div>
              </div>
            ) : user.user.userType === "recruiter" ? (
              <div className="d-flex flex-column">
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
                <Button
                  style={{ borderRadius: "5px", fontSize: "12px" }}
                  type="button"
                  variant="secondary"
                  className="mb-2"
                  onClick={() => navigate(`/dashboard/refer-job/${data.jobId}`)}
                  disabled={markJobLoading || unmarkJobLoading}
                >
                  Refer Candidate
                </Button>
                {marked ? (
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
                )}
              </div>
            ) : user.user.userType === "jobseeker" ? (
              show && (
                <div className="d-flex flex-column">
                  {location.pathname.includes("/dashboard/search-jobs/") ? (
                    <Button
                      style={{ borderRadius: "5px", fontSize: "12px" }}
                      type="button"
                      variant="primary"
                      className="mb-2"
                      disabled={favouriteJobLoading || unfavouriteJobLoading}
                      onClick={() =>
                        navigate(`/dashboard/apply-job/${data.jobId}`)
                      }
                    >
                      Apply
                    </Button>
                  ) : (
                    <Button
                      style={{ borderRadius: "5px", fontSize: "12px" }}
                      type="button"
                      variant="secondary"
                      className="mb-2"
                      onClick={() => {
                        location.pathname.includes("/dashboard/search-jobs")
                          ? navigate(`/dashboard/search-jobs/${data.jobId}`)
                          : navigate(`/dashboard/jobs/${data.jobId}`);
                      }}
                      disabled={favouriteJobLoading || unfavouriteJobLoading}
                    >
                      View Details
                    </Button>
                  )}

                  {marked ? (
                    <Button
                      style={{ borderRadius: "5px", fontSize: "12px" }}
                      type="button"
                      variant={
                        location.pathname.includes("/dashboard/search-jobs/")
                          ? "secondary"
                          : "primary"
                      }
                      onClick={() => {
                        unFavouriteJob(data.jobId);
                      }}
                      disabled={favouriteJobLoading || unfavouriteJobLoading}
                    >
                      {unfavouriteJobLoading ? "..." : "Remove From Favourite"}
                    </Button>
                  ) : (
                    <Button
                      style={{ borderRadius: "5px", fontSize: "12px" }}
                      type="button"
                      variant={
                        location.pathname.includes("/dashboard/search-jobs/")
                          ? "secondary"
                          : "primary"
                      }
                      onClick={() => {
                        favouriteJob(data.jobId);
                      }}
                      disabled={favouriteJobLoading || unfavouriteJobLoading}
                    >
                      {favouriteJobLoading ? "..." : "Add To Favourite"}
                    </Button>
                  )}
                </div>
              )
            ) : (
              <div className="d-flex flex-column">
                {status === "draft" ? (
                  <Button
                    style={{ borderRadius: "5px", fontSize: "12px" }}
                    type="button"
                    variant={avatar ? "secondary" : "primary"}
                    className="mb-2"
                    onClick={() =>
                      navigate(`/dashboard/job/edit-job/${data.jobId}/post-job`)
                    }
                  >
                    Complete Draft
                  </Button>
                ) : (
                  <Button
                    style={{ borderRadius: "5px", fontSize: "12px" }}
                    type="button"
                    variant={avatar ? "secondary" : "primary"}
                    className="mb-2"
                  >
                    View Applications
                  </Button>
                )}
                {!id && (
                  <Button
                    style={{ borderRadius: "5px", fontSize: "12px" }}
                    type="button"
                    variant="secondary"
                    className="mb-2"
                    onClick={() => navigate(`/dashboard/jobs/${data.jobId}`)}
                  >
                    View Job
                  </Button>
                )}
                {status === "draft" ? (
                  <Button
                    style={{ borderRadius: "5px", fontSize: "12px" }}
                    type="button"
                    variant="secondary"
                    onClick={() => statusChange("deleted", data)}
                  >
                    Delete Draft
                  </Button>
                ) : status === "closed" ? (
                  <Button
                    style={{ borderRadius: "5px", fontSize: "12px" }}
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      navigate(
                        `/dashboard/job/edit-job/new/review-and-submit`,
                        { state: { data: data } }
                      )
                    }
                  >
                    Repost Job
                  </Button>
                ) : (
                  <Button
                    style={{ borderRadius: "5px", fontSize: "12px" }}
                    type="button"
                    variant="secondary"
                    onClick={() => statusChange("closed", data)}
                  >
                    Close Job
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={` ${css.jobButton} d-flex justify-content-center`}>
          {(status === "live" ||
            status === "under-review" ||
            status === "paused") &&
            avatar ? (
            <div className="mt-4">
              {!id && (
                <Button
                  type="button"
                  variant="secondary"
                  className={`${css.job} me-1`}
                  onClick={() => navigate(`/dashboard/jobs/${data.jobId}`)}
                >
                  View Job
                </Button>
              )}
              {status !== "under-review" && (
                <Button
                  type="button"
                  variant={avatar ? "secondary" : "primary"}
                  className={`${css.job} me-1`}
                >
                  View Applications
                </Button>
              )}
              <Button
                className={`${css.job} me-1`}
                type="button"
                variant="secondary"
                onClick={() => statusChange("closed", data)}
              >
                Close Job
              </Button>
            </div>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ViewJobCard;
