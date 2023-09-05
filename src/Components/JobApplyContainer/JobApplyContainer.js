import React, { useEffect, useState } from "react";
import css from "./JobApplyContainer.module.css";
import { useDispatch } from "react-redux";
import {
  setViewJobError,
  setViewJobLoading,
  setViewJobSuccess,
} from "../../state/recruiterJob/recruiterJobSlice";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Navigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import BasicDetails from "./BasicDetails";
import EduAndExpDetails from "./EduAndExpDetails";
import Skills from "./Skills";
import ScreeningQuestions from "./ScreeningQuestions";

import {
  isLoading,
  clearErrors,
} from "../../state/jobseekerJobApply/jobseekerJobApplySlice";
import moment from "moment";
import UploadResumeApplication from "./UploadResumeApplication";
import UploadCoverLetterApplication from "./UploadCoverLetterApplication";
import { jobseekerApplicationCreate } from "../../state/jobseekerJobApply/jobseekerJobApplyActions";
export default function JobApplyContainer({
  authState,
  userState,
  jobseekerJobApplyState,
  recruiterJobsState,
  navigate,
  state,
  jobId,
}) {
  const { profile, user } = userState?.user || {};
  const dispatch = useDispatch();
  const { userToken } = authState;
  const { viewJobLoading, viewJobSuccess, viewJobError } = recruiterJobsState;
  const {
    createApplicationLoading,
    createApplicationSuccess,
    createApplicationError,
  } = jobseekerJobApplyState;

  const [jobData, setJobData] = useState(null);
  const [formData, setFormData] = useState({
    skills: [],
    experience: [],
    screeningQuestions: [],
    education: [],
    contact: profile.contactDetails.contact,
    name: profile.name,
    email: user.email,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [resumeName, setResumeName] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [coverName, setCoverName] = useState(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const loading =
    isLoading(state) ||
    resumeUploading ||
    coverUploading ||
    createApplicationLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    console.log({ errors });
    if (Object.keys(errors).length > 0) {
      return setShowErrorAlert(true);
    }
    const {
      name,
      email,
      contact,

      skills,
      experience,
      isExperienced,
      education,
      screeningQuestions,
      remarks,
      resume,
      coverLetter,
    } = formData;
    if (!name || !email || !contact || !resume) {
      console.log("missing fields");
      return;
    }
    const skillsArray = skills?.map((each) => ({
      skill: each.skill,
      experience: each.experience,
    }));
    const experienceArray = isExperienced
      ? experience.map((each) => ({
          organizationName: each.organizationName,
          designation: each.designation,
          responsibilities: each.responsibilities,
          isCurrentlyWorking: each.isCurrentlyWorking,
          relievingDate: each.relievingDate,
          joiningDate: each.joiningDate,
        }))
      : [];
    const screeningQuestionsArray = screeningQuestions.map((each) => ({
      question: each.question,
      answer: each.answer,
    }));
    const educationArray = education.map((each) => ({
      degree: each.degree,
      yearOfPassing: each.yearOfPassing,
      institute: each.institute,
    }));
    let candidateData = {},
      applicationData = {
        job: jobData._id,
        skills: skillsArray,
        experience: experienceArray,
        isExperienced: isExperienced,
        education: educationArray,
        screeningQuestions: screeningQuestionsArray,
        resume,
        coverLetter,
        remarks,
      };

    await dispatch(
      jobseekerApplicationCreate({
        candidateData,
        applicationData,
      })
    );
  };
  const clearForm = () => {
    setFormData({
      skills: [],
      experience: [],
      screeningQuestions: [],
    });
    setCoverName(null);
    setResumeName(null);
  };
  const validateFormData = (formData) => {
    const errors = {};
    const { email, skills, resume, screeningQuestions } = formData;

    if (!resume) {
      errors.resume = "Resume is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }

    if (!skills.length) {
      errors.skills = "Skills is required";
    }
    if (skills.length > 0) {
      if (!skills.every((each) => each.skill && each.experience)) {
        errors.skills = "Please fill up the skills data";
      } else if (
        !skills.every((each) => moment(each.experience, "YY/MM").isValid())
      ) {
        errors.skills =
          "Please fill up the skills experience according to the format";
      }
    }
    if (screeningQuestions.length > 0) {
      if (
        !screeningQuestions.every((each) =>
          each.mustHave
            ? each.answer || typeof each.answer === "number" || each.answer == 0
            : true
        )
      ) {
        errors.screeningQuestions =
          "Please fill up required screening questions";
      }
    }
    setErrorMessages((prevState) => ({
      ...errors,
    }));
    return errors;
  };
  useEffect(() => {
    setShowErrorAlert(false);

    validateFormData(formData);
  }, [formData]);
  useEffect(() => {
    if (resumeName) {
      setFormData((pValue) => {
        return { ...pValue, resume: resumeName };
      });
    }
  }, [resumeName]);
  useEffect(() => {
    if (coverName) {
      setFormData((pValue) => {
        return { ...pValue, coverLetter: coverName };
      });
    }
  }, [coverName]);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(setViewJobLoading());
    axios
      .get(`/api/jobseeker/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setJobData(res.data.job);
        dispatch(setViewJobSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setViewJobError(err));
      });
  }, []);
  if (viewJobLoading) {
    return <Loading />;
  }
  if (viewJobError) {
    return (
      <div>
        <p className={css.error}>Failed to fetch the Job</p>
      </div>
    );
  }

  const onFillFromUser = () => {
    setFormData((pValue) => {
      return {
        ...pValue,
        experience: profile.experience,
        education: profile.education,
        isExperienced: profile.isExperienced,
      };
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((pValue) => {
      return {
        ...pValue,
        [name]: value,
      };
    });
  };
  return (
    <div>
      {viewJobSuccess && (
        <div className={css.mainContainer}>
          <Col>
            <Row
              className={`mb-2 mt-5 flex justify-content-start ${css.container}`}
            >
              <BiArrowBack
                className={css.backButton}
                onClick={() => navigate(`/dashboard/search-jobs/${jobId}`)}
              />
              <h2 className={css.title}>Apply Job</h2>
            </Row>
            <BasicDetails
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              jobseekerJobApplyState={jobseekerJobApplyState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              user={user}
              profile={profile}
              onFillFromUser={onFillFromUser}
            />
            <EduAndExpDetails
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              jobseekerJobApplyState={jobseekerJobApplyState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              onFillFromUser={onFillFromUser}
            />
            <Skills
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              jobseekerJobApplyState={jobseekerJobApplyState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              onFillFromUser={onFillFromUser}
            />
            <ScreeningQuestions
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              jobseekerJobApplyState={jobseekerJobApplyState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              onFillFromUser={onFillFromUser}
            />
            <Col
              style={{ padding: "1rem 2.5rem 0", backgroundColor: "white" }}
              sm={{ span: 10, offset: 0 }}
            >
              <div className="mb-3">
                <h2 className={css.title}>Resume Upload</h2>

                <UploadResumeApplication
                  disabled={loading}
                  dispatch={dispatch}
                  fileName={resumeName}
                  setFileName={setResumeName}
                  fileUploading={resumeUploading}
                  setFileUploading={setResumeUploading}
                />

                <div
                  className="mt-0 mb-2 text-center w-10"
                  style={{ width: "200px" }}
                >
                  {" "}
                  or{" "}
                </div>
                <div>
                  <Form.Check
                    type="radio"
                    disabled={loading || !profile.resume}
                    id="resumeFromCandidate"
                    className={`${css.labelChange} ${css.radioButton} mb-4 mx-3`}
                    style={{ width: "400px" }}
                    label="Upload from candidate's profile"
                    name="resumeFromCandidate"
                    value={true}
                    checked={formData.resumeFromCandidate === true}
                    onChange={(e) => {
                      const val = e.target.checked;
                      if (val) {
                        setFormData((pValue) => {
                          return {
                            ...pValue,
                            resumeFromCandidate: true,
                            resume: profile?.resume,
                          };
                        });
                        setResumeName(profile?.resume);
                      } else {
                        setFormData((pValue) => {
                          return {
                            ...pValue,
                            resumeFromCandidate: false,
                            resume: null,
                          };
                        });
                        setResumeName(null);
                      }
                    }}
                  />
                </div>
                {showErrorAlert && errorMessages.resume && (
                  <Form.Text className="text-danger">
                    {errorMessages.resume}
                  </Form.Text>
                )}
              </div>
              <div className="mb-3">
                <h2 className={css.title}>Cover letter Upload</h2>

                <UploadCoverLetterApplication
                  disabled={loading}
                  fileName={coverName}
                  setFileName={setCoverName}
                  dispatch={dispatch}
                  fileUploading={coverUploading}
                  setFileUploading={setCoverUploading}
                />
                {showErrorAlert && errorMessages.coverLetter && (
                  <Form.Text className="text-danger">
                    {errorMessages.coverLetter}
                  </Form.Text>
                )}
              </div>
            </Col>
            <Col
              style={{ padding: "1rem 2.5rem 0", backgroundColor: "white" }}
              sm={{ span: 10, offset: 0 }}
            >
              <Form.Group className="mb-3" controlId="remarks">
                <Form.Label className={css.labelChange}>
                  Any special remarks/Requests :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="remarks"
                  as="textarea"
                  rows={3}
                  value={formData.remarks}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((pValue) => {
                      return {
                        ...pValue,
                        remarks: val,
                      };
                    });
                  }}
                  style={{ borderRadius: "2px", resize: "none" }}
                />
              </Form.Group>
            </Col>
          </Col>
          <div className="d-flex justify-content-end  mt-5">
            <Button
              variant="secondary"
              className="mx-3"
              type="button"
              onClick={clearForm}
              disabled={
                isLoading(state) ||
                resumeUploading ||
                coverUploading ||
                createApplicationLoading
              }
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              className="mx-3"
              type="button"
              disabled={
                isLoading(state) ||
                resumeUploading ||
                coverUploading ||
                createApplicationLoading
              }
              onClick={handleSubmit}
            >
              {createApplicationLoading ? "Applying..." : "Apply"}
            </Button>
          </div>
          {createApplicationError && (
            <p className={css.error}>Failed to Create an application</p>
          )}
          {createApplicationSuccess && (
            <p className={css.success}>Created Successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}
