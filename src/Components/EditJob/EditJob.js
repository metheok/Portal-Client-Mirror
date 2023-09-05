import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab, Button, Form, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import css from "./EditJob.module.css";
import { cloneDeep } from "lodash";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import moment from "moment";

export default function EditJob({
  id,
  currentTab,
  state,
  updateJob,
  createJob,
  dispatch,
  navigate,
  tabs,
  jobData,
  clearJobForm,
}) {
  const { user, profileLoading: userLoading } = state.user;
  const {
    addAJobLoading,
    addAJobSuccess,
    addAJobError,
    fetchAJobLoading,
    fetchAJobSuccess,
    fetchAJobError,
  } = state.employerJobs;
  useEffect(() => {
    dispatch(clearJobForm());
  }, [currentTab, dispatch]);

  const [error, setError] = useState(null);
  const questionForm = useRef(null);
  const [data, setData] = useState({});
  const [experienceError, setExperienceError] = useState(null);
  const [payout, setPayout] = useState("percentage");
  const [questionType, setQuestionType] = useState("yes/no");

  useEffect(() => {
    console.log(data);
  }, [data])

  const seeTabValidation = (tab) => {
    if (tab === "post-job") {
      return true;
    }
    if (tab === "add-details") {
      return (
        jobData &&
        jobData.jobTitle &&
        jobData.workplaceType &&
        jobData.country &&
        jobData.city &&
        jobData.jobType
      );
    }
    if (tab === "screening-questions") {
      return (
        jobData &&
        jobData.description &&
        jobData.responsibilities &&
        jobData.qualifications
      );
    }
    if (tab === "payout-details") {
      return (
        jobData &&
        jobData.screeningQuestions &&
        jobData.screeningQuestions.length >= 3 &&
        jobData.screeningQuestions.filter(
          (e) => e.question && e.answerType && e.idealAnswer
        ).length === jobData.screeningQuestions.length
      );
    }
    if (tab === "review-and-submit") {
      return (
        jobData &&
        jobData.annualCtcRange &&
        jobData.minimumCtc &&
        jobData.maximumBudget &&
        jobData.NoOfVacancies &&
        jobData.NoOfApplications &&
        jobData.FulFillmentPayoutType &&
        jobData.FulFillmentPayout
      );
    }
    return false;
  };

  useEffect(() => {
    const initialValues = cloneDeep(jobData || {});

    const hasEmptyValues = Object.keys(data).some((currentTab) => {
      return !data[currentTab] && data[currentTab] !== 0;
    });
    setData({
      ...data,
      jobTitle: initialValues.jobTitle,
      workplaceType: initialValues.workplaceType,
      country: initialValues.country,
      city: initialValues.city,
      jobType: initialValues.jobType,
      description: initialValues.description,
      responsibilities: initialValues.responsibilities,
      qualifications: initialValues.qualifications,
      minimumRequirements: initialValues.minimumRequirements || [
        { skill: "", experience: "" },
      ],
      screeningQuestions:
        initialValues.screeningQuestions?.length > 0
          ? initialValues.screeningQuestions
          : [
            {
              question: "",
              answerType: "",
              mustHave: false,
              idealAnswer: "",
            },
            {
              question: "",
              answerType: "",
              mustHave: false,
              idealAnswer: "",
            },
            {
              question: "",
              answerType: "",
              mustHave: false,
              idealAnswer: "",
            },
          ],
      annualCtcRange: initialValues.annualCtcRange,
      minimumCtc: initialValues.minimumCtc,
      maximumBudget: initialValues.maximumBudget,
      NoOfVacancies: initialValues.NoOfVacancies,
      NoOfApplications: initialValues.NoOfApplications,
      FulFillmentPayoutType: initialValues.FulFillmentPayoutType,
      FulFillmentPayout: initialValues.FulFillmentPayout,
      totalExperience: initialValues.totalExperience
    });
  }, [jobData]);

  useEffect(() => {
    if (
      id !== "new" &&
      !fetchAJobLoading &&
      fetchAJobSuccess &&
      jobData.status
    ) {
      switch (currentTab) {
        case "post-job":
          break;
        case "add-details":
          if (seeTabValidation("add-details")) {
            break;
          } else {
            if (id) {
              navigate(`/dashboard/job/edit-job/${id}/post-job`);
            } else {
              navigate("/dashboard/job/edit-job/new/post-job");
            }
            break;
          }
        case "screening-questions":
          if (seeTabValidation("screening-questions")) {
            break;
          } else {
            if (id) {
              navigate(`/dashboard/job/edit-job/${id}/add-details`);
            } else {
              navigate("/dashboard/job/edit-job/new/add-details");
            }
            break;
          }
        case "payout-details":
          if (seeTabValidation("payout-details")) {
            break;
          } else {
            if (id) {
              navigate(`/dashboard/job/edit-job/${id}/screening-questions`);
            } else {
              navigate("/dashboard/job/edit-job/new/screening-questions");
            }
            break;
          }
        case "review-and-submit":
          if (seeTabValidation("review-and-submit")) {
            break;
          } else {
            if (id) {
              navigate(`/dashboard/job/edit-job/${id}/payout-details`);
            } else {
              navigate("/dashboard/job/edit-job/new/payout-details");
            }
            break;
          }
        default:
          if (id) {
            navigate(`/dashboard/job/edit-job/${id}/post-job`);
          } else {
            navigate("/dashboard/job/edit-job/new/post-job");
          }
          break;
      }
    }
  }, [currentTab, fetchAJobSuccess, fetchAJobLoading, jobData, id, navigate]);
  if (id !== "new") {
    if (fetchAJobLoading) return <Loading />;
    if (fetchAJobError) return <Navigate to="/not-found" />;
    if (jobData.status && jobData.status !== "draft") {
      return (
        <div className=" text-center">
          {addAJobSuccess && <p>Job submitted successfully!</p>}
          <p>Job status {jobData.status}. Cannot edit.</p>
        </div>
      );
    }
  }

  function handleBack() {
    if (currentTab === "add-details") {
      navigate(`/dashboard/job/edit-job/${id}/post-job`);
    } else if (currentTab === "screening-questions") {
      navigate(`/dashboard/job/edit-job/${id}/add-details`);
    } else if (currentTab === "payout-details") {
      navigate(`/dashboard/job/edit-job/${id}/screening-questions`);
    } else if (currentTab === "review-and-submit") {
      navigate(`/dashboard/job/edit-job/${id}/payout-details`);
    }
  }

  function handleChange(e, float) {
    const { name, value } = e.target;

    if (name === "minimumCtc" || name === "maximumBudget") {
      const minCtc = name === "minimumCtc" ? value : data.minimumCtc;
      const maxBudget = name === "maximumBudget" ? value : data.maximumBudget;

      if (minCtc && maxBudget && parseFloat(minCtc) > parseFloat(maxBudget)) {
        setError("Minimum CTC cannot be greater than Maximum Budget.");
      } else {
        setError("");
      }
    }

    if (e.target.type === "number") {
      setData((pValue) => {
        return {
          ...pValue,
          [name]: float ? parseFloat(value) : parseInt(value),
        };
      });
    } else {
      setData((pValue) => {
        return {
          ...pValue,
          [name]: value,
        };
      });
    }
  }

  const handleExperience = (e, status, feature) => {
    const getTotalMonths = (experience) => {
      const [years, months] = experience.split('/');
      return parseInt(years) * 12 + parseInt(months);
    };

    var largestMonths = 0;
    var largestIndex = -1;

    data.minimumRequirements.forEach((x, i) => {
      const totalMonths = getTotalMonths(x.experience);
      if (totalMonths > largestMonths) {
        largestMonths = totalMonths;
        largestIndex = i;
      }
    });

    handleSubmit(e, status, feature, largestMonths);
  }

  const handleSubmit = async (e, status, feature, experience) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return;
    }
    if (id === "new") {
      await createJob(data, status, feature, experience);
    } else {
      await updateJob(data, status, feature, experience);
    }
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
              font-size: 13px;
              padding: 5px;
              font-family:'Open Sans', sans-serif;
              white-space: normal;
              text-align: center;
              max-width:250px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-weight: bold;
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
        id="controlled-tab-example"
        activeKey={currentTab}
        onSelect={(k) => {
          if (tabs.includes(k)) {
            navigate(`/dashboard/job/edit-job/${id}/${k}`);
          } else {
            navigate(`/dashboard/job/edit-job/${id}/add-details`);
          }
        }}
        className={"mb-3 bg profileTabs"}
      >
        <Tab
          eventKey="post-job"
          title="Post a Job"
          disabled={!seeTabValidation("post-job")}
        >
          {currentTab === "post-job" &&
            (
              <Col xs={10}>
                <Form
                  className="job-form"
                  noValidate
                  onSubmit={(e) => handleSubmit(e, "draft", "save")}
                >
                  {addAJobError && (
                    <ErrorAlert message={"Something went wrong"} />
                  )}

                  <div className=" mt-4">
                    <Form.Group className={`mb-4 ${css.formGroup}`}>
                      <Form.Label>Job Title :</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name="jobTitle"
                        value={data.jobTitle}
                        type="text"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={`mb-4 ${css.formGroup}`}>
                      <Form.Label>Workplace Type :</Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        name="workplaceType"
                        value={data.workplaceType}
                        required
                      >
                        <option value=""></option>
                        <option value="On-Site">On-Site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={`mb-4 ${css.formGroup}`}>
                      <Form.Label>Country :</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name="country"
                        value={data.country}
                        type="text"
                        required
                      />
                    </Form.Group>
                    <Form.Group className={`mb-4 ${css.formGroup}`}>
                      <Form.Label>City :</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name="city"
                        value={data.city}
                        type="text"
                        required
                      />
                    </Form.Group>
                    <Form.Control.Feedback type="invalid">
                      Required field
                    </Form.Control.Feedback>
                    <Form.Group className={`mb-4 ${css.formGroup}`}>
                      <Form.Label>Job Type :</Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        name="jobType"
                        value={data.jobType}
                        required
                      >
                        <option></option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Intership">Intership</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div className="mb-4 mt-5 d-flex">
                      <Button
                        onClick={() => {
                          navigate("/dashboard");
                        }}
                        className="border-black"
                        variant="light"
                        disabled={addAJobLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        className="ms-3"
                        disabled={
                          addAJobLoading ||
                          !(
                            data.jobTitle &&
                            data.workplaceType &&
                            data.country &&
                            data.city &&
                            data.jobType
                          )
                        }
                        onClick={(e) => handleSubmit(e, "draft", "draft")}
                      >
                        {addAJobLoading ? "saving..." : "Save To Draft"}
                      </Button>
                      <Button
                        disabled={
                          addAJobLoading ||
                          !(
                            data.jobTitle &&
                            data.workplaceType &&
                            data.country &&
                            data.city &&
                            data.jobType
                          )
                        }
                        type="submit"
                        className="ms-3"
                      >
                        {addAJobLoading ? "saving..." : "Save and Next"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Col>
            )}
        </Tab>

        <Tab
          eventKey="add-details"
          title="Add Details"

          disabled={!seeTabValidation("add-details")}
        >
          {currentTab === "add-details" && (
            <Col xs={10}>
              {addAJobError && <ErrorAlert message={"Something went wrong"} />}

              <Form
                className="job-form mt-3"
                noValidate
                onSubmit={(e) => {
                  handleExperience(e, "draft", "save");
                }}
              >
                <div>
                  <Form.Group className={`mb-4 ${css.formGroup}`}>
                    <Form.Label>Description : </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="description"
                      value={data.description}
                      as="textarea"
                      rows={3}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Required field
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className={`mb-4 ${css.formGroup}`}>
                    <Form.Label>Responsibilities : </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="responsibilities"
                      value={data.responsibilities}
                      as="textarea"
                      rows={3}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Required field
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className={`mb-4 ${css.formGroup}`}>
                    <Form.Label>Qualifications : </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="qualifications"
                      value={data.qualifications}
                      as="textarea"
                      rows={3}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Required field
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className={`mb-4 ${css.formGroup}`}>
                    <Form.Label>
                      Minimum Requirements{" "}
                      <span
                        style={{
                          fontSize: "11px",
                          color: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        {" "}
                        (Add required skills and experience in particular
                        skills)
                      </span>{" "}
                      :
                    </Form.Label>
                    {data.minimumRequirements?.map((x, index) => {
                      return (
                        <div key={index} className={"d-flex mb-4"}>
                          <div className="d-flex justify-content-center me-3">
                            {index + 1}
                          </div>
                          <div className="d-flex">
                            <Form.Control
                              className="me-3"
                              type="text"
                              placeholder="Skills"
                              value={x.skill}
                              onChange={(e) => {
                                const newSkill = [...data.minimumRequirements];
                                newSkill[index].skill = e.target.value;
                                setData({
                                  ...data,
                                  minimumRequirements: newSkill,
                                });
                              }}
                              required
                            />
                            <Form.Control
                              type="text"
                              placeholder="Experience (yy/mm)"
                              value={x.experience}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                const isValidFormat = /^\d{2}\/(0?[1-9]|1[0-2])$/.test(inputValue);

                                if (isValidFormat || inputValue === "") {
                                  setExperienceError(null);
                                } else {
                                  setExperienceError("Invalid year format. YY/MM.");
                                }
                                const newSkill = [...data.minimumRequirements];
                                newSkill[index].experience = inputValue;
                                setData({
                                  ...data,
                                  minimumRequirements: newSkill,
                                });
                              }}
                              required
                            />
                          </div>

                          <div
                            onClick={() => {
                              setData((pValue) => {
                                const newArray =
                                  pValue.minimumRequirements.filter(
                                    (item, i) => i !== index
                                  );
                                return {
                                  ...pValue,
                                  minimumRequirements: newArray,
                                };
                              });
                            }}
                            className={`d-flex justify-content-center align-items-center ms-3 ${css.pointerCursor}`}
                          >
                            X
                          </div>
                        </div>
                      );
                    })}
                    <div
                      onClick={() => {
                        setData({
                          ...data,
                          minimumRequirements: [
                            ...data.minimumRequirements,
                            { skill: "", experience: "" },
                          ],
                        });
                      }}
                      className={`d-flex justify-content-end text-primary ${css.pointerCursor}`}
                    >
                      + Add Another Skill
                    </div>
                  </Form.Group>
                  {experienceError && (
                    <Form.Text className="text-danger">{experienceError}</Form.Text>
                  )}
                </div>

                <div className="d-flex justify-content-center">
                  <div className="mb-4 mt-5 d-flex">
                    <Button
                      onClick={handleBack}
                      className="border-black"
                      variant="light"
                      disabled={addAJobLoading}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="ms-3"
                      onClick={(e) => {
                        handleExperience(e, "draft", "draft");
                      }}
                      disabled={
                        addAJobLoading ||
                        !(
                          data.description &&
                          data.responsibilities &&
                          data.qualifications &&
                          !experienceError
                        )
                      }
                    >
                      {addAJobLoading ? "saving..." : " Save To Draft"}
                    </Button>
                    <Button
                      disabled={
                        addAJobLoading ||
                        !(
                          data.description &&
                          data.responsibilities &&
                          data.qualifications &&
                          !experienceError
                        )
                      }
                      type="submit"
                      className="ms-3"
                    >
                      {addAJobLoading ? "saving..." : "Save and Next"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          )}
        </Tab>
        <Tab
          eventKey="screening-questions"
          title="Screening Questions"

          disabled={!seeTabValidation("screening-questions")}
        >
          {currentTab === "screening-questions" && (
            <Col xs={10}>
              {addAJobError && <ErrorAlert message={"Something went wrong"} />}

              <Form
                ref={questionForm}
                className="job-form mt-3"
                noValidate
                onSubmit={(e) => handleSubmit(e, "draft", "save")}
              >
                <div>
                  <h5 className="mb-4" style={{ fontWeight: "700" }}>
                    Applicant Must Answer Each Question.
                  </h5>
                  {data.screeningQuestions?.map((x, index) => {
                    return (
                      <Row
                        key={index}
                        className={x.delete ? "d-flex" : "d-flex"}
                      >
                        <Col sm={1} className="d-flex justify-content-center ">
                          {index + 1}.
                        </Col>
                        <Col>
                          <Form.Group className={`mb-4 ${css.formGroup}`}>
                            <Form.Label>Write Question Here :</Form.Label>
                            <Form.Control
                              value={x.question}
                              type="text"
                              onChange={(e) => {
                                const newQuestion = [
                                  ...data.screeningQuestions,
                                ];
                                newQuestion[index].question = e.target.value;
                                setData({
                                  ...data,
                                  screeningQuestions: newQuestion,
                                });
                              }}
                              required
                            />
                          </Form.Group>
                          <div className="d-flex justify-content-between align-items-center">
                            <Form.Group className={`mb-4 ${css.formGroup}`}>
                              <Form.Label>Answer Type :</Form.Label>
                              <Form.Select
                                onChange={(e) => {
                                  setQuestionType(e.target.value);
                                  const newQuestion = [
                                    ...data.screeningQuestions,
                                  ];
                                  newQuestion[index].answerType =
                                    e.target.value;
                                  setData({
                                    ...data,
                                    screeningQuestions: newQuestion,
                                  });
                                }}
                                value={x.answerType}
                                required
                              >
                                <option value="yes/no">Yes/No</option>
                                <option value="numbers">Numbers</option>
                                <option value="one line">One Line</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className={`${css.formGroup} `}>
                              <input
                                type="checkbox"
                                className={` ${css.pointerCursor}`}
                                onChange={(e) => {
                                  const newQuestion = [
                                    ...data.screeningQuestions,
                                  ];
                                  newQuestion[index].mustHave =
                                    e.target.checked;
                                  setData({
                                    ...data,
                                    screeningQuestions: newQuestion,
                                  });
                                }}
                                checked={x.mustHave}
                              />
                              <span className={css.checkLabel}>
                                Must Have Qualifications
                              </span>
                              {/*  <Form.Check
                                className={`d-flex ${css.customCheckbox}`}
                                type="checkbox"
                                label="Must Have Qualifications"

                                onChange={(e) => {
                                  const newQuestion = [
                                    ...data.screeningQuestions,
                                  ];
                                  newQuestion[index].mustHave =
                                    e.target.checked;
                                  setData({
                                    ...data,
                                    screeningQuestions: newQuestion,
                                  });
                                }}
                                checked={x.mustHave}
                              /> */}
                            </Form.Group>
                          </div>
                          <Form.Group className={`mb-4 ${css.formGroup}`}>
                            <Form.Label className="me-3">
                              Ideal Answer:
                            </Form.Label>
                            {x.answerType !== "yes/no" && (
                              <Form.Control
                                onChange={(e) => {
                                  const newQuestion = [
                                    ...data.screeningQuestions,
                                  ];
                                  newQuestion[index].idealAnswer =
                                    e.target.value;
                                  setData({
                                    ...data,
                                    screeningQuestions: newQuestion,
                                  });
                                }}
                                value={x.idealAnswer}
                                type={
                                  x.answerType === "one line"
                                    ? "text"
                                    : "number"
                                }
                                required
                              />
                            )}
                            {x.answerType === "yes/no" && (
                              <>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  name="Yes"
                                  type="radio"
                                  id="inline-radio-1"
                                  checked={x.idealAnswer === "yes"}
                                  onChange={(e) => {
                                    const newQuestion = [
                                      ...data.screeningQuestions,
                                    ];
                                    newQuestion[index].idealAnswer = "yes";

                                    setData({
                                      ...data,
                                      screeningQuestions: newQuestion,
                                    });
                                  }}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  name="No"
                                  type="radio"
                                  id="inline-radio-2"
                                  checked={x.idealAnswer === "no"}
                                  onChange={(e) => {
                                    const newQuestion = [
                                      ...data.screeningQuestions,
                                    ];
                                    newQuestion[index].idealAnswer = "no";
                                    setData({
                                      ...data,
                                      screeningQuestions: newQuestion,
                                    });
                                  }}
                                />
                              </>
                            )}
                          </Form.Group>
                        </Col>
                        {index > 2 && (
                          <div
                            onClick={() => {
                              setData((pValue) => {
                                const newArray =
                                  pValue.screeningQuestions.filter(
                                    (item, i) => i !== index
                                  );
                                return {
                                  ...pValue,
                                  screeningQuestions: newArray,
                                };
                              });
                            }}
                            className="d-flex justify-content-center ms-3"
                          >
                            X
                          </div>
                        )}
                      </Row>
                    );
                  })}
                  <div
                    onClick={() => {
                      setData({
                        ...data,
                        screeningQuestions: [
                          ...data.screeningQuestions,
                          {
                            question: "",
                            answerType: "",
                            mustHave: false,
                            idealAnswer: "",
                            delete: true,
                          },
                        ],
                      });
                    }}
                    className={`d-flex justify-content-end mt-2 text-primary ${css.pointerCursor}`}
                  >
                    + Add Question
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="mb-4 mt-5 d-flex">
                    <Button
                      onClick={handleBack}
                      className="border-black"
                      variant="light"
                      disabled={addAJobLoading}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="ms-3"
                      onClick={(e) => handleSubmit(e, "draft", "draft")}
                      disabled={
                        addAJobLoading ||
                        !(
                          data.screeningQuestions &&
                          data.screeningQuestions.length >= 3 &&
                          data.screeningQuestions.filter(
                            (e) => e.question && e.answerType && e.idealAnswer
                          ).length == data.screeningQuestions.length
                        )
                      }
                    >
                      {addAJobLoading ? "saving..." : "Save to Draft"}
                    </Button>
                    <Button
                      type="submit"
                      className="ms-3"
                      disabled={
                        addAJobLoading ||
                        !(
                          data.screeningQuestions &&
                          data.screeningQuestions.length >= 3 &&
                          data.screeningQuestions.filter(
                            (e) => e.question && e.answerType && e.idealAnswer
                          ).length == data.screeningQuestions.length
                        )
                      }
                    >
                      {addAJobLoading ? "saving..." : "Save and Next"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          )}
        </Tab>

        <Tab
          eventKey="payout-details"
          title="Payout Details"

          disabled={!seeTabValidation("payout-details")}
        >
          {currentTab === "payout-details" && (
            <Col xs={10}>
              <Form
                className="job-form "
                noValidate
                onSubmit={(e) => handleSubmit(e, "draft", "save")}
              >
                {addAJobError && (
                  <ErrorAlert message={"Something went wrong"} />
                )}

                <div className="w-100  mt-5">
                  <Form.Group className={`mb-4 ${css.formGroup}`}>
                    <Form.Label>Annual CTC Range :</Form.Label>
                    <Form.Select
                      onChange={handleChange}
                      name="annualCtcRange"
                      value={data.annualCtcRange}
                      required
                    >
                      <option></option>
                      <option value="1">USD</option>
                      <option value="2">INR</option>
                      <option value="3">EUR</option>
                      <option value="3">CAD</option>
                      <option value="3">GBP</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Required field
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <Form.Group className={`mb-4 ${css.formGroup}`}>
                      <Form.Label>Minimum CTC :</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name="minimumCtc"
                        value={data.minimumCtc}
                        type="number"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={`mb-4 ms-3 ${css.formGroup}`}>
                      <Form.Label>Maximum Budget :</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name="maximumBudget"
                        value={data.maximumBudget}
                        type="number"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                      {error && (
                        <Form.Text className="text-danger">{error}</Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between align-items-end mt-2">
                    <Form.Group className={`mb-4 ${css.formGroup}`}>
                      <Form.Label>No. Of Vacancies :</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name="NoOfVacancies"
                        value={data.NoOfVacancies}
                        type="number"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={`mb-4 ms-3 ${css.formGroup}`}>
                      <Form.Label>No. Of Application Required :</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name="NoOfApplications"
                        value={data.NoOfApplications}
                        type="number"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <Form.Group className={`mb-4 ${css.formGroup}`}>
                    <Form.Label>Fulfillment Payout :</Form.Label>
                    <div className="mt-1 mb-4">
                      <Form.Check
                        inline
                        label="Percentage"
                        name="percentage"
                        type="radio"
                        id="inline-radio-1"
                        checked={payout === "percentage"}
                        onChange={() => {
                          setPayout("percentage");
                          setData((pValue) => {
                            return {
                              ...pValue,
                              FulFillmentPayoutType: "percentage",
                            };
                          });
                        }}
                      />

                      <Form.Check
                        inline
                        label="Fixed Payout"
                        name="fixed"
                        type="radio"
                        id="inline-radio-2"
                        checked={payout === "fixed"}
                        onChange={() => {
                          setPayout("fixed");
                          setData((pValue) => {
                            return {
                              ...pValue,
                              FulFillmentPayoutType: "fixed",
                            };
                          });
                        }}
                      />
                    </div>
                    <Col sm={7}>
                      <Form.Control
                        onChange={(e) =>
                          handleChange(
                            e,
                            payout === "percentage" ? "float" : null
                          )
                        }
                        name="FulFillmentPayout"
                        value={data.FulFillmentPayout}
                        type="number"
                        step={payout === "percentage" ? 0.01 : 1}
                        placeholder={
                          payout === "percentage" ? "% of annual CTC" : null
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Required field
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="mb-4 mt-5 d-flex">
                    <Button
                      onClick={handleBack}
                      className="border-black"
                      variant="light"
                      disabled={addAJobLoading}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="ms-3"
                      onClick={(e) => handleSubmit(e, "draft", "draft")}
                      disabled={
                        addAJobLoading ||
                        !(
                          data.annualCtcRange &&
                          data.minimumCtc &&
                          data.maximumBudget &&
                          data.maximumBudget >= data.minimumCtc &&
                          data.NoOfApplications &&
                          data.NoOfVacancies &&
                          data.FulFillmentPayoutType &&
                          data.FulFillmentPayout
                        )
                      }
                    >
                      {addAJobLoading ? "saving..." : "Save To Draft"}
                    </Button>
                    <Button
                      type="submit"
                      className="ms-3"
                      disabled={
                        addAJobLoading ||
                        !(
                          data.annualCtcRange &&
                          data.minimumCtc &&
                          data.maximumBudget &&
                          data.maximumBudget >= data.minimumCtc &&
                          data.NoOfApplications &&
                          data.NoOfVacancies &&
                          data.FulFillmentPayoutType &&
                          data.FulFillmentPayout
                        )
                      }
                    >
                      {addAJobLoading ? "saving..." : "Save and Next"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          )}
        </Tab>
        <Tab
          eventKey="review-and-submit"
          title="Review & Submit"

          disabled={!seeTabValidation("review-and-submit")}
        >
          {currentTab === "review-and-submit" && (
            <Col xs={10}>
              <Form
                className="job-form "
                noValidate
                onSubmit={(e) => handleSubmit(e, "under-review", "submit")}
              >
                {addAJobError && (
                  <ErrorAlert message={"Something went wrong"} />
                )}

                <div>
                  <h5>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Job : </span>{" "}
                  </h5>

                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>Title :</span>{" "}
                    {data.jobTitle}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>City : </span> {data.city}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>Country :</span>{" "}
                    {data.country}
                  </span>
                  <span className={css.title}>
                    <span className={css.subTitle}>Workplace : </span>{" "}
                    {data.workplaceType}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>Job Type : </span>{" "}
                    {data.jobType}
                  </span>

                  <h5 className="mt-3">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Details : </span>{" "}
                  </h5>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>Description :</span>{" "}
                    {data.description}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>Qualifications : </span>{" "}
                    {data.qualifications}
                  </span>
                  {data.minimumRequirements?.map((x) => (
                    <>
                      <span className={css.title}>
                        {" "}
                        <span className={css.subTitle}>Skills :</span> {x.skill}
                      </span>
                      <span className={css.title}>
                        <span className={css.subTitle}>Experience : </span>{" "}
                        {x.experience}
                      </span>
                    </>
                  ))}

                  <h5 className="mt-3">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                      Questions :{" "}
                    </span>{" "}
                  </h5>

                  {data.screeningQuestions?.map((x, index) => (
                    <div key={index} className="mb-2">
                      <span className={css.title}>
                        {" "}
                        <span className={css.subTitle}>
                          {index + 1}.Question :
                        </span>{" "}
                        {x.question}
                      </span>
                      <span className={`${css.title} ms-3`}>
                        <span className={css.subTitle}>Answer : </span>{" "}
                        {x.idealAnswer}
                      </span>
                    </div>
                  ))}

                  <h5 className="mt-3">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                      Payout Details :{" "}
                    </span>{" "}
                  </h5>

                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>
                      No. of vacancies :
                    </span>{" "}
                    {data.NoOfVacancies}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>
                      No. of Application required :{" "}
                    </span>{" "}
                    {data.NoOfApplications}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>
                      Annual CTC range :
                    </span>{" "}
                    {data.annualCtcRange}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>Max budget : </span>{" "}
                    {data.maximumBudget}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>Min CTC : </span>{" "}
                    {data.minimumCtc}
                  </span>
                  <span className={css.title}>
                    {" "}
                    <span className={css.subTitle}>
                      Fulfillment Payout :{" "}
                    </span>{" "}
                    {data.FulFillmentPayout} ({data.FulFillmentPayoutType}){" "}
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="mb-4 mt-5 d-flex">
                    <Button
                      onClick={handleBack}
                      className="border-black"
                      variant="light"
                      disabled={addAJobLoading}
                    >
                      Back to exit
                    </Button>
                    <Button
                      className="ms-3"
                      onClick={(e) => handleSubmit(e, "draft", "draft")}
                      disabled={addAJobLoading}
                    >
                      {addAJobLoading ? "saving..." : "Save To Draft"}
                    </Button>
                    <Button
                      disabled={addAJobLoading}
                      type="submit"
                      className="ms-3"
                    >
                      {addAJobLoading ? "saving..." : "Submit Job"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
