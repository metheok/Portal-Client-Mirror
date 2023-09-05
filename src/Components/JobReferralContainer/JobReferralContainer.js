import React, { useEffect, useState } from "react";
import css from "./JobReferralContainer.module.css";
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
  setVerifyEmailError,
  setVerifyEmailLoading,
  setVerifyEmailSuccess,
  clearErrors,
} from "../../state/recruiterJobReferral/recruiterJobReferralSlice";
import moment from "moment";
import UploadResumeApplication from "./UploadResumeApplication";
import UploadCoverLetterApplication from "./UploadCoverLetterApplication";
import { recruiterApplicationCreate } from "../../state/recruiterJobReferral/recruiterJobReferralActions";
export default function JobReferralContainer({
  authState,
  userState,
  recruiterJobReferralState,
  recruiterJobsState,
  navigate,
  state,
  jobId,
}) {
  const dispatch = useDispatch();
  const { userToken } = authState;
  const { viewJobLoading, viewJobSuccess, viewJobError } = recruiterJobsState;
  const {
    createReferralLoading,
    createReferralSuccess,
    createReferralError,
    verifyEmailLoading,
    verifyEmailSuccess,
    verifyEmailError,
    // resumeUploadLoading,
    // resumeUploadSuccess,
    // resumeUploadError,
    // coverLetterUploadLoading,
    // coverLetterUploadSuccess,
    // coverLetterUploadError,
  } = recruiterJobReferralState;

  const [jobData, setJobData] = useState(null);
  const [formData, setFormData] = useState({
    skills: [],
    experience: [],
    screeningQuestions: [],
    education: [],
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [applicantData, setApplicantData] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [resumeName, setResumeName] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [coverName, setCoverName] = useState(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const loading =
    isLoading(state) ||
    resumeUploading ||
    coverUploading ||
    createReferralLoading ||
    verifyEmailLoading;

  console.log({ formData });
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
      validatedEmail,
      hasDBData,
      fromDB,
      skills,
      experience,
      isExperienced,
      education,
      screeningQuestions,
      remarks,
      resume,
      coverLetter,
    } = formData;
    if (!name || !email || !contact || !resume || validatedEmail !== email) {
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
        education: educationArray,
        isExperienced: isExperienced,
        screeningQuestions: screeningQuestionsArray,
        resume,
        coverLetter,
        remarks,
      };
    if (hasDBData && validatedEmail === email) {
      candidateData = {
        newUser: false,
        profile: { _id: applicantData.profile._id },
      };
    } else if (validatedEmail === email) {
      candidateData = {
        newUser: true,
        user: { email },
        profile: {
          name,
          contactDetails: { contact },
          skills: skillsArray,
          experience: experienceArray,
          education: educationArray,
          isExperienced,
          resume: resume,
        },
      };
    }

    console.log({ candidateData, applicationData });
    await dispatch(
      recruiterApplicationCreate({
        candidateData,
        applicationData,
      })
    );
    console.log({ formData });
  };
  const clearForm = () => {
    setFormData({
      skills: [],
      experience: [],
      screeningQuestions: [],
    });
    setCoverName(null);
    setResumeName(null);
    setApplicantData(null);
  };
  const validateFormData = (formData) => {
    const errors = {};
    const {
      name,
      email,
      contact,
      skills,
      resume,
      screeningQuestions,
      validatedEmail,
      fromDB,
    } = formData;

    if (!name) {
      errors.name = "Name is required";
    }
    if (!resume) {
      errors.resume = "Resume is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const test = emailRegex.test(email);
      if (!test) {
        errors.email = "Invalid email format";
      }
    }
    if (email !== validatedEmail) {
      errors.validateEmail = "Please validate them email address first";
    }
    if (!contact) {
      errors.contact = "Contact is required";
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
    console.log({ formData });
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
  console.log({ jobData });

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(setViewJobLoading());
    axios
      .get(`/api/recruiter/job/fetch/${jobId}`, {
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
  if (createReferralSuccess) {
    // clearForm();
  }

  const onVerifyEmail = () => {
    dispatch(setVerifyEmailLoading());
    setApplicantData(null);
    axios
      .get(
        `/api/recruiter/application/get-applicant-by-email/${formData.email}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        const status = res.status;
        const code = res.data.code;

        if (status === 200) {
          if (code === 100) {
            dispatch(
              setVerifyEmailSuccess("User of the email address does not exist")
            );
            setFormData((pValue) => {
              return {
                ...pValue,
                emailValid: "User of the email address does not exist",
                fromDB: false,
                hasDBData: false,
                validatedEmail: formData.email,
              };
            });
            return;
          }
          if (code === 101 && res.data.applicant) {
            dispatch(
              setVerifyEmailSuccess(
                "Jobseeker with given email id and referred by you exists"
              )
            );
            setFormData((pValue) => {
              return {
                ...pValue,
                fromDB: false,
                hasDBData: true,
                emailValid:
                  "Jobseeker with given email id and referred by you exists",
                validatedEmail: formData.email,
                contact: res.data.applicant.profile.contactDetails.contact,
                name: res.data.applicant.profile.name,
                email: res.data.applicant.user.email,
              };
            });
            setApplicantData(res.data.applicant);
            return;
          }
        }
        throw "";
      })
      .catch((err) => {
        const status = err.response.status;
        const code = err.response.data.code;
        console.log({ code, status, err });

        if (status === 403 || status === 500) {
          dispatch(setVerifyEmailError("Something went wrong"));
          return;
        }
        if (status === 400) {
          if (code === 200) {
            dispatch(
              setVerifyEmailError(
                "Email already exists for user other than a jobseeker"
              )
            );
            setErrorMessages((prevState) => ({
              ...prevState,
              emailValid:
                "Email already exists for user other than a jobseeker",
              hasDBData: false,

              validatedEmail: "",
              fromDB: false,
            }));
            return;
          }
          if (code === 201) {
            dispatch(
              setVerifyEmailError(
                "Jobseeker of email with different referral ID that yours is already present"
              )
            );
            setErrorMessages((prevState) => ({
              ...prevState,
              validatedEmail: "",
              fromDB: false,
              hasDBData: false,

              emailValid:
                "Jobseeker of email with different referral ID that yours is already present",
            }));
            return;
          }
        }

        console.log(err);
        dispatch(setVerifyEmailError("Something went wrong"));
        setErrorMessages((prevState) => ({
          ...prevState,
          fromDB: false,
          hasDBData: false,
          validatedEmail: "",

          emailValid: "Something went wrong",
        }));
      });
  };
  const onFillFromUser = () => {
    if (!applicantData) {
      return;
    }
    setFormData((pValue) => {
      return {
        ...pValue,
        contact: applicantData.profile.contactDetails.contact,
        name: applicantData.profile.name,
        email: applicantData.user.email,
        experience: applicantData.profile.experience,
        education: applicantData.profile.education,
        isExperienced: applicantData.profile.isExperienced,
      };
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    if (name === "email") {
      setErrorMessages((prevState) => ({
        ...prevState,
        emailValid: "",
      }));
      setFormData((pValue) => {
        return {
          ...pValue,
          emailValid: "",
        };
      });
    }
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
                onClick={() => navigate(`/dashboard/jobs`)}
              />
              <h2 className={css.title}>Refer Candidate</h2>
            </Row>
            <BasicDetails
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              recruiterJobReferralState={recruiterJobReferralState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              onVerifyEmail={onVerifyEmail}
              onFillFromUser={onFillFromUser}
              applicantData={applicantData}
              clearErrors={clearErrors}
              verifyEmailError={verifyEmailError}
            />
            <EduAndExpDetails
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              recruiterJobReferralState={recruiterJobReferralState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              onVerifyEmail={onVerifyEmail}
              onFillFromUser={onFillFromUser}
              applicantData={applicantData}
            />
            <Skills
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              recruiterJobReferralState={recruiterJobReferralState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              onVerifyEmail={onVerifyEmail}
              onFillFromUser={onFillFromUser}
              applicantData={applicantData}
            />
            <ScreeningQuestions
              dispatch={dispatch}
              jobData={jobData}
              setJobData={setJobData}
              userState={userState}
              recruiterJobReferralState={recruiterJobReferralState}
              recruiterJobsState={recruiterJobsState}
              formData={formData}
              setFormData={setFormData}
              handleFormChange={handleFormChange}
              errorMessages={errorMessages}
              loading={loading}
              showErrorAlert={showErrorAlert}
              onVerifyEmail={onVerifyEmail}
              onFillFromUser={onFillFromUser}
              applicantData={applicantData}
            />
            <Col
              style={{ padding: "1rem 2.5rem 0", backgroundColor: "white" }}
              sm={{ span: 10, offset: 0 }}
            >
              <div className="mb-3">
                <h2 className={css.title}>Resume Upload</h2>

                <UploadResumeApplication
                  dispatch={dispatch}
                  disabled={loading}
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
                    disabled={loading || !applicantData?.profile.resume}
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
                            resume: applicantData?.profile?.resume,
                          };
                        });
                        setResumeName(applicantData?.profile?.resume);
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
                  dispatch={dispatch}
                  fileName={coverName}
                  setFileName={setCoverName}
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
                createReferralLoading ||
                verifyEmailLoading
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
                createReferralLoading ||
                verifyEmailLoading
              }
              onClick={handleSubmit}
            >
              {createReferralLoading ? "Referring..." : "Refer"}
            </Button>
          </div>
          {createReferralError && (
            <p className={css.error}>Failed to Create an application</p>
          )}
          {createReferralSuccess && (
            <p className={css.success}>Created Successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}
