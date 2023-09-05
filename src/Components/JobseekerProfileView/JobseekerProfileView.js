import { React, useState } from "react";
import ProfileViewCard from "../ProfileViewCard/ProfileViewCard";
import { Button, Card } from "react-bootstrap";
import css from "./JobseekerProfileView.module.css";
import { BsPersonGear } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { LiaPencilRulerSolid } from "react-icons/lia";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";

const JobseekerProfileView = ({ user }) => {
  const navigate = useNavigate();
  const initialCardsToShow = 2;
  const [experienceCardsToShow, setExperienceCardsToShow] =
    useState(initialCardsToShow);
  const [educationCardsToShow, setEducationCardsToShow] =
    useState(initialCardsToShow);
  const [skillsCardsToShow, setSkillsCardsToShow] =
    useState(initialCardsToShow);

  const handleShowMoreExperience = () => {
    setExperienceCardsToShow((prev) => prev + 2);
  };
  const handleShowMoreEducation = () => {
    setEducationCardsToShow((prev) => prev + 2);
  };
  const handleShowMoreSkills = () => {
    setSkillsCardsToShow((prev) => prev + 2);
  };

  const handleNavigate = () => {
    navigate("/dashboard/profile/general");
  };

  const experienceCount = user?.profile?.experience?.length || 0;
  const educationCount = user?.profile?.education?.length || 0;
  const skillsCount = user?.profile?.skills?.length || 0;

  const duration = user?.profile?.totalExperience;

  if (user.user.userType !== "jobseeker") {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="row">
      <div className="mb-3">
        <ProfileViewCard
          user={user}
          handleNavigate={handleNavigate}
          duration={duration}
        />
      </div>
      <div>
        <Card className={`${css.Card} p-2`}>
          <Card.Title className={css.Title}>Experience</Card.Title>
          {user?.profile?.isExperienced === false ? (
            <div className="d-flex justify-content-center">
              <span style={{ color: " rgba(0, 0, 0, 0.4)" }}>
                No Experience Found
              </span>
            </div>
          ) : (
            <>
              {user?.profile?.experience
                ?.slice(0, experienceCardsToShow)
                .map((card, index) => (
                  <div key={index}>
                    <Card.Body className={css.CardBody}>
                      <div className="d-flex align-items-center">
                        <div style={{ marginRight: "10px" }}>
                          <BsPersonGear size={40} />
                        </div>
                        <div>
                          <span className={css.name}>{card.designation}</span>
                          <span className={css.company}>
                            {card.organizationName}
                          </span>
                          <span className={css.period}>
                            {moment(card.joiningDate, "MM/YYYY").format(
                              "MM/YYYY"
                            )}{" "}
                            -{" "}
                            {card.isCurrentlyWorking
                              ? "Present"
                              : moment(card.relievingDate, "MM/YYYY").format(
                                  "MM/YYYY"
                                )}
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </div>
                ))}
            </>
          )}
          {experienceCardsToShow < experienceCount && (
            <span>
              {" "}
              <Button
                className={css.cardButton}
                variant="primary"
                size="small"
                onClick={handleShowMoreExperience}
              >
                show more Experience <MdOutlineKeyboardArrowDown size={22} />
              </Button>
            </span>
          )}
        </Card>
      </div>

      <div>
        <Card className={`${css.Card} p-2`}>
          <Card.Title className={css.Title}>Education</Card.Title>
          {educationCount === 0 ? (
            <div className="d-flex justify-content-center">
              <span style={{ color: " rgba(0, 0, 0, 0.4)" }}>
                No Education Found
              </span>
            </div>
          ) : (
            <>
              {user?.profile?.education
                ?.slice(0, educationCardsToShow)
                .map((card, index) => (
                  <div key={index}>
                    <Card.Body className={css.CardBody}>
                      <div className="d-flex align-items-center">
                        <div style={{ marginRight: "10px" }}>
                          <FaGraduationCap size={40} />
                        </div>
                        <div>
                          <span className={css.name}>{card.degree}</span>
                          <span className={css.company}>{card.institute}</span>
                          <span className={css.period}>
                            {card.yearOfPassing}
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </div>
                ))}
            </>
          )}
          {educationCardsToShow < educationCount && (
            <span>
              {" "}
              <Button
                className={css.cardButton}
                variant="primary"
                size="small"
                onClick={handleShowMoreEducation}
              >
                show more Education
                <MdOutlineKeyboardArrowDown size={22} />
              </Button>
            </span>
          )}
        </Card>
      </div>
      <div>
        <Card className={`${css.Card} p-2`}>
          <Card.Title className={css.Title}>Skills</Card.Title>
          {skillsCount === 0 ? (
            <div className="d-flex justify-content-center">
              <span style={{ color: " rgba(0, 0, 0, 0.4)" }}>
                No Skill Found
              </span>
            </div>
          ) : (
            <>
              {" "}
              {user?.profile?.skills
                ?.slice(0, skillsCardsToShow)
                .map((card, index) => (
                  <div key={index}>
                    <Card.Body className={css.CardBody}>
                      <div className="d-flex align-items-center">
                        <div style={{ marginRight: "10px" }}>
                          <LiaPencilRulerSolid size={40} />
                        </div>
                        <div>
                          <span className={css.name}>{card.skill}</span>
                          <span className={css.company}>
                            {card.description}
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </div>
                ))}
            </>
          )}
          {skillsCardsToShow < skillsCount && (
            <span>
              {" "}
              <Button
                className={css.cardButton}
                variant="primary"
                size="small"
                onClick={handleShowMoreSkills}
              >
                show more skills
                <MdOutlineKeyboardArrowDown size={22} />
              </Button>
            </span>
          )}
          <div className="d-flex justify-content-center align-item-center mt-4 mb-2">
            <Button
              variant="primary"
              style={{ borderRadius: "5px" }}
              onClick={handleNavigate}
            >
              Update Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobseekerProfileView;
