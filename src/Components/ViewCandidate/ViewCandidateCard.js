import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Avatar from "../Avatar/AvatarProfile";
import css from "./ViewCandidateCard.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ViewCandidateCard = ({
  user,
  data,
  id,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card className={css.CardBody}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div style={{ margin: "0.5rem" }}>
              <Avatar user={user} size={45} />
            </div>
            <div className="ms-1">
              <span className={css.userName}>{data.name} {data.totalExperience && <small className="text-muted">(Experience {parseInt(data.totalExperience) / 12} Years)</small>}</span>
              {data.currentCity && <span
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {data.currentCity}
              </span>}
              {data.experience &&
                data.experience.map((x) => {
                  if (x.isCurrentlyWorking) {
                    return (
                      <span
                        style={{
                          display: "block",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {x.designation} in {x.organizationName}
                      </span>
                    )
                  }
                })}
            </div>
          </div>

          <div className="d-flex flex-column justify-content-center">
            {!id && <Button
              style={{ borderRadius: "5px", fontSize: "12px" }}
              type="button"
              variant="secondary"
              className="mb-2"
              onClick={() => navigate(`/dashboard/candidate/search/${data._id}`)}
            >
              View Profile
            </Button>}
            <Button
              style={{ borderRadius: "5px", fontSize: "12px" }}
              type="button"
              variant="primary"
              className="mb-2"
            >
              Connect
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ViewCandidateCard;
