import React from "react";
import { Button, Card } from "react-bootstrap";
import Avatar from "../../components/Avatar/AvatarProfile";
import css from "./ProfileViewCard.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ProfileViewCard = ({ user }) => {
  const navigate = useNavigate();

  const [currentlyWorkingString, SetCurrentlyWorkingString] =
    React.useState("");
  const [totalExp, SetTotalExp] = React.useState("");
  React.useEffect(() => {
    let experience = 0;
    let str = "";
    user.profile.experience.forEach((each, idx) => {
      try {
        if (each.isCurrentlyWorking) {
          str = `${each.designation} at ${each.organizationName}`;
        }
        const start = moment(each.joiningDate, "MM/YYYY");
        const end = !each.isCurrentlyWorking
          ? moment(each.relievingDate, "MM/YYYY")
          : moment();
        const diffDays = end.diff(start, "days");

        const months = parseInt(diffDays / 30) + (diffDays % 30 > 14 ? 1 : 0);
        experience += months;
      } catch (e) {}
    });

    const years = Math.floor(experience / 12);
    const months = experience % 12;

    SetCurrentlyWorkingString(str);
    SetTotalExp(
      years > 0 || months > 0 ? `${years} years & ${months} months` : ""
    );
  }, [user.profile]);
  return (
    <Card className={css.CardBody}>
      <Card.Body>
        <div className="d-flex justify-content-between  align-items-center">
          <div className="d-flex">
            <div style={{ margin: "0.5rem" }}>
              <Avatar user={user} size={55} />
            </div>
            <div>
              <span className={css.userName}>
                {user.profile.nameTitle}. {user.profile.name}
              </span>
              <span className={css.userExperience}>
                {!user.profile.isExperienced ? `No Experience` : totalExp}
              </span>
              <span>{user.profile.currentCity}</span>
              <span
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {currentlyWorkingString}
              </span>
            </div>
          </div>
          <div>
            <Button
              style={{ borderRadius: "5px", fontSize: "14px", width: "6rem" }}
              onClick={() => navigate("/dashboard/profile")}
              type="button"
              variant="primary"
            >
              Update
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProfileViewCard;
