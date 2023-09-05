import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Alert, Tab, Tabs, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

//general components
import Loading from "../../components/Loading/Loading";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

//slice
import { clearForm } from "../../state/recruiterCandidate/recruiterCandidateSlice";
import { recruiterCandidateCreate } from "../../state/recruiterCandidate/recruiterCandidateActions";

//css
import css from "./AddCandidateScreen.module.css";

//6 tabs
import CandidateEducation from "../../components/CandidateEducation/CandidateEducation";
import CandidateAdditional from "../../components/CandidateAdditional/CandidateAdditional";
import CandidateContact from "../../components/CandidateContact/CandidateContact";
import CandidateExperience from "../../components/CandidateExperience/CandidateExperience";
import CandidateGeneralProfile from "../../components/CandidateGeneralProfile/CandidateGeneralProfile";
import CandidateSkills from "../../components/CandidateSkills/CandidateSkills";

const AddCandidateScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams();
  const [formValues, setFormValues] = useState({});
  const [key, setKey] = useState(null);
  const { loading, error } = useSelector((state) => state.auth);
  const { user, userLoading, userError } = useSelector((state) => state.user);

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 800);
  const [removeEmpty, setRemoveEmpty] = React.useState(window.innerWidth <= 1200);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setRemoveEmpty(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const recruiterCandidateState = useSelector(
    (state) => state.recruiterCandidate
  );
  const tabsArray = [
    "general",
    "education",
    "professional",
    "skills",
    "additional",
    "contact",
  ];
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!tabsArray.includes(tab)) {
      return navigate("/dashboard/candidate/add/general");
    }

    setKey(tab);
  }, [tab]);
  React.useEffect(() => {
    if (recruiterCandidateState.recruiterCandidateCreateSuccess) {
      clearForm();
      navigate(`/dashboard`, {
        state: { message: "Candidate Created Successfully" },
      });
    }
  }, [recruiterCandidateState.recruiterCandidateCreateSuccess]);
  React.useEffect(() => {
    return navigate("/dashboard/candidate/add/general");
  }, []);
  const nextTab = () => {
    const idx = tabsArray.indexOf(key);
    if (idx > -1) {
      const nextTabVal = tabsArray[idx + 1];
      if (nextTabVal) {
        navigate(`/dashboard/candidate/add/${nextTabVal}`);
      }
    }
  };

  const previousTab = () => {
    const idx = tabsArray.indexOf(key);
    if (idx > -1) {
      const nextTabVal = tabsArray[idx - 1];
      if (nextTabVal) {
        navigate(`/dashboard/candidate/add/${nextTabVal}`);
      }
    }
  };

  if (loading || userLoading) {
    return <Loading />;
  }
  console.log({ user });

  if (!user.user) {
    return <Navigate to="/register" />;
  }
  if (user.user?.userType !== "recruiter") {
    return <Navigate to="/dashboard" />;
  }

  const showLoading = recruiterCandidateState.recruiterCandidateCreateLoading;

  const onCreateRecruiterCandidate = async (data) => {
    if (
      !(
        (data.isExperienced && data.experience && data.experience.length > 0) ||
        data.isExperienced == false
      ) &&
      !data.validatedEmail &&
      !data.email &&
      !data.nameTitle &&
      !data.name &&
      !data.dob &&
      !data.currentCity &&
      !data.resume &&
      !data.contactDetails?.contact &&
      !(data.openToRelocate === true || data.openToRelocate === false) &&
      !(data.openToRemoteWork === true || data.openToRemoteWork === false) &&
      !(
        data.openToBringYourOwnDevice === true ||
        data.openToBringYourOwnDevice === false
      ) &&
      !(typeof data.currentCtc == "string" && data.currentCtc.length > 0) &&
      !(typeof data.minimumCtc == "string" && data.minimumCtc.length > 0) &&
      !(data.passport === true || data.passport === false) &&
      !(data.passport ? data.validityPassport : true)
    ) {
      console.log("error");
      return;
    }
    const { email, ...rest } = data;
    await dispatch(
      recruiterCandidateCreate({
        candidateProfile: {
          ...rest,
          ...{
            currentCtc: parseFloat(data.currentCtc),
            minimumCtc: parseFloat(data.minimumCtc),
          },
        },
        user: { email },
      })
    );
  };
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
    <>
      <Container>
        {error && (
          <Alert variant="danger">Error occurred while loading data.</Alert>
        )}
        {!error && user?.user ? (
          <Row>
            {!isMobile && <Col xs={4} md={3} xl={3} xxl={3}>
              <ProfileCard user={user} location={location} />
            </Col>}
            <Col className={css.middleContent} xs={12} md={8} xl={6} xxl={6}>
              <div>
                <style>
                  {` .candidaeTabs  .nav-tabs {
              display: flex;
              flex-wrap: nowrap;
              overflow-x: auto;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .candidaeTabs .nav-tabs::-webkit-scrollbar {
              display: none;
            }
            .candidaeTabs .nav-link {
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
            .candidaeTabs .nav-link.active {
              font-weight: bold;
            }
            .candidaeTabs .tab-content {
              white-space: pre-line;
            }`}
                </style>

                <Tabs
                  id="controlled-tab"
                  className={"candidaeTabs"}
                  activeKey={key}
                  onSelect={(k) => {
                    switch (k) {
                      case "general":
                        navigate(`/dashboard/candidate/add/${k}`);
                        return;

                      case "education":
                        if (
                          formValues.validatedEmail &&
                          formValues.email &&
                          formValues.nameTitle &&
                          formValues.name &&
                          formValues.dob &&
                          formValues.currentCity &&
                          formValues.resume
                        ) {
                          navigate(`/dashboard/candidate/add/${k}`);
                        }
                        break;
                      case "professional":
                        if (
                          formValues.validatedEmail &&
                          formValues.email &&
                          formValues.nameTitle &&
                          formValues.name &&
                          formValues.dob &&
                          formValues.currentCity &&
                          formValues.resume
                        ) {
                          navigate(`/dashboard/candidate/add/${k}`);
                        }
                        break;
                      case "skills":
                        if (
                          ((formValues.isExperienced &&
                            formValues.experience &&
                            formValues.experience.length > 0) ||
                            formValues.isExperienced == false) &&
                          formValues.validatedEmail &&
                          formValues.email &&
                          formValues.nameTitle &&
                          formValues.name &&
                          formValues.dob &&
                          formValues.currentCity &&
                          formValues.resume
                        ) {
                          navigate(`/dashboard/candidate/add/${k}`);
                        }
                        break;
                      case "additional":
                        if (
                          ((formValues.isExperienced &&
                            formValues.experience &&
                            formValues.experience.length > 0) ||
                            formValues.isExperienced == false) &&
                          formValues.validatedEmail &&
                          formValues.email &&
                          formValues.nameTitle &&
                          formValues.name &&
                          formValues.dob &&
                          formValues.currentCity &&
                          formValues.resume
                        ) {
                          navigate(`/dashboard/candidate/add/${k}`);
                        }
                        break;
                      case "contact":
                        if (
                          ((formValues.isExperienced &&
                            formValues.experience &&
                            formValues.experience.length > 0) ||
                            formValues.isExperienced == false) &&
                          formValues.validatedEmail &&
                          formValues.email &&
                          formValues.nameTitle &&
                          formValues.name &&
                          formValues.dob &&
                          formValues.currentCity &&
                          formValues.resume &&
                          (formValues.openToRelocate === true ||
                            formValues.openToRelocate === false) &&
                          (formValues.openToRemoteWork === true ||
                            formValues.openToRemoteWork === false) &&
                          (formValues.openToBringYourOwnDevice === true ||
                            formValues.openToBringYourOwnDevice === false) &&
                          typeof formValues.currentCtc == "string" &&
                          formValues.currentCtc.length > 0 &&
                          typeof formValues.minimumCtc == "string" &&
                          formValues.minimumCtc.length > 0 &&
                          (formValues.passport === true ||
                            formValues.passport === false) &&
                          (formValues.passport
                            ? formValues.validityPassport
                            : true)
                        ) {
                          navigate(`/dashboard/candidate/add/${k}`);
                        }
                        break;
                      default:
                        return;
                    }
                  }}
                >
                  <Tab
                    eventKey="general"
                    title={<MultiLineTabTitle title="General Details" />}
                  >
                    <div>
                      <CandidateGeneralProfile
                        dispatch={dispatch}
                        recruiterCandidateState={recruiterCandidateState}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        createCandidate={onCreateRecruiterCandidate}
                        clearErrors={clearForm}
                        nextTab={nextTab}
                      />
                    </div>
                  </Tab>
                  <Tab
                    eventKey="education"
                    title={<MultiLineTabTitle title="Educational Details" />}
                  >
                    <div>
                      <CandidateEducation
                        dispatch={dispatch}
                        recruiterCandidateState={recruiterCandidateState}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        createCandidate={onCreateRecruiterCandidate}
                        clearErrors={clearForm}
                        nextTab={nextTab}
                        previousTab={previousTab}
                      />
                    </div>
                  </Tab>
                  <Tab
                    eventKey="professional"
                    title={
                      <MultiLineTabTitle title="Professional Experience" />
                    }
                  >
                    <div>
                      <CandidateExperience
                        dispatch={dispatch}
                        recruiterCandidateState={recruiterCandidateState}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        createCandidate={onCreateRecruiterCandidate}
                        clearErrors={clearForm}
                        nextTab={nextTab}
                        previousTab={previousTab}
                      />
                    </div>
                  </Tab>
                  <Tab
                    eventKey="skills"
                    title={<MultiLineTabTitle title="Skills and Expertise" />}
                  >
                    <div>
                      <CandidateSkills
                        dispatch={dispatch}
                        recruiterCandidateState={recruiterCandidateState}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        createCandidate={onCreateRecruiterCandidate}
                        clearErrors={clearForm}
                        nextTab={nextTab}
                        previousTab={previousTab}
                      />
                    </div>
                  </Tab>
                  <Tab
                    eventKey="additional"
                    title={<MultiLineTabTitle title="Additional Details" />}
                  >
                    <div>
                      <CandidateAdditional
                        dispatch={dispatch}
                        recruiterCandidateState={recruiterCandidateState}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        createCandidate={onCreateRecruiterCandidate}
                        clearErrors={clearForm}
                        nextTab={nextTab}
                        previousTab={previousTab}
                      />
                    </div>
                  </Tab>
                  <Tab
                    eventKey="contact"
                    title={<MultiLineTabTitle title="Contact Details" />}
                  >
                    <div>
                      <CandidateContact
                        dispatch={dispatch}
                        recruiterCandidateState={recruiterCandidateState}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        createCandidate={onCreateRecruiterCandidate}
                        clearErrors={clearForm}
                        nextTab={nextTab}
                        previousTab={previousTab}
                      />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
            {!removeEmpty && <Col xs={1} sm={1} md={1} xl={2}>
              <EmptyCard />
            </Col>}
          </Row>
        ) : null}
      </Container>
    </>
  );
};

export default AddCandidateScreen;
