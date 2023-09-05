import { React, useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import GeneralProfile from "../JobseekerGeneralProfile/JobseekerGeneralProfile";
import Education from "../JobSeekerEducation/JobSeekerEducation";
import Experience from "../JobSeekerExperience/JobSeekerExperience";
import Skill from "../JobSeekerSkills/JobSeekerSkills";
import Additional from "../JobSeekerAdditional/JobSeekerAdditional";
import Contact from "../JobSeekerContact/JobSeekerContact";
import { clearErrors } from "../../state/auth/authSlice";
import { useDispatch } from "react-redux";
import { jobseekerProfileUpdate } from "../../state/jobseekerProfile/jobseekerProfileActions";
/* import {
  jobSeekerProfileFetch,
  jobSeekerProfileUpdate,
} from "../../state/auth/employerProfileActions"; */
const SeekerProfile = ({ location }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  /*  useEffect(() => {
     dispatch(jobSeekerProfileFetch());
   }, [dispatch]); */

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/profile/general":
        setKey("general");
        break;
      case "/dashboard/profile/education":
        setKey("education");

        break;
      case "/dashboard/profile/professional":
        setKey("professional");

        break;
      case "/dashboard/profile/skills":
        setKey("skills");

        break;
      case "/dashboard/profile/additional":
        setKey("additional");

        break;
      case "/dashboard/profile/contact":
        setKey("contact");

        break;
      default:
        break;
    }
  }, [location]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [key, dispatch]);

  if (
    location.pathname === "/dashboard/profile" ||
    location.pathname === "/dashboard/profile/"
  ) {
    return <Navigate to="/dashboard/profile/general" />;
  }

  const MultiLineTabTitle = ({ title }) => {
    const splitTitle = title.split(" ");
    return (
      <>
        <span style={{ marginBottom: "-4px" }}>{splitTitle[0]}</span>
        <span>{splitTitle.slice(1).join(" ")}</span>
      </>
    );
  };

  return (
    <div>
      <style>
        {` .profileTabs  .nav-tabs {
              display: flex;
              flex-wrap: nowrap;
              overflow-x: auto;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .profileTabs .nav-tabs::-webkit-scrollbar {
              display: none;
            }
            .profileTabs .nav-link {
              font-size: 12px;
              padding: 10px;
              white-space: normal;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 35px;
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
            }
            .profileTabs .nav-link.active {
              font-weight: bold;
            }
            .profileTabs .tab-content {
              white-space: pre-line;
            }`}
      </style>

      <Tabs
        id="controlled-tab"
        className={"profileTabs"}
        activeKey={key}
        onSelect={(k) => {
          switch (k) {
            case "general":
              navigate("/dashboard/profile/general");
              break;
            case "education":
              navigate("/dashboard/profile/education");

              break;

            case "professional":
              navigate("/dashboard/profile/professional");

              break;
            case "skills":
              navigate("/dashboard/profile/skills");

              break;
            case "additional":
              navigate("/dashboard/profile/additional");

              break;
            case "contact":
              navigate("/dashboard/profile/contact");

              break;
            default:
              navigate("/dashboard/profile/general");

              break;
          }
          return;
        }}
      >
        <Tab
          eventKey="general"
          title={<MultiLineTabTitle title="General Details" />}
        >
          <div>
            <GeneralProfile
              Navigate={Navigate}
              dispatch={dispatch}
              jobSeekerProfileUpdate={jobseekerProfileUpdate}
              clearErrors={clearErrors}
            />
          </div>
        </Tab>
        <Tab
          eventKey="education"
          title={<MultiLineTabTitle title="Educational Details" />}
        >
          <div>
            <Education
              Navigate={Navigate}
              dispatch={dispatch}
              jobSeekerProfileUpdate={jobseekerProfileUpdate}
              clearErrors={clearErrors}
            />
          </div>
        </Tab>
        <Tab
          eventKey="professional"
          title={<MultiLineTabTitle title="Professional Experience" />}
        >
          <div>
            <Experience
              Navigate={Navigate}
              jobSeekerProfileUpdate={jobseekerProfileUpdate}
              dispatch={dispatch}
              clearErrors={clearErrors}
            />
          </div>
        </Tab>
        <Tab
          eventKey="skills"
          title={<MultiLineTabTitle title="Skills and Expertise" />}
        >
          <div>
            <Skill
              Navigate={Navigate}
              jobSeekerProfileUpdate={jobseekerProfileUpdate}
              dispatch={dispatch}
              clearErrors={clearErrors}
            />
          </div>
        </Tab>
        <Tab
          eventKey="additional"
          title={<MultiLineTabTitle title="Additional Details" />}
        >
          <div>
            <Additional
              Navigate={Navigate}
              dispatch={dispatch}
              jobSeekerProfileUpdate={jobseekerProfileUpdate}
              clearErrors={clearErrors}
            />
          </div>
        </Tab>
        <Tab
          eventKey="contact"
          title={<MultiLineTabTitle title="Contact Details" />}
        >
          <div>
            <Contact
              Navigate={Navigate}
              dispatch={dispatch}
              jobSeekerProfileUpdate={jobseekerProfileUpdate}
              clearErrors={clearErrors}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default SeekerProfile;
