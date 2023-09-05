import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import css from "./JobReferralContainer.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";

export default function Skills({
  formData,
  dispatch,
  setFormData,
  handleFormChange,
  jobData,
  errorMessages,
  setJobData,
  userState,
  recruiterJobReferralState,
  recruiterJobsState,
  showErrorAlert,
  loading,
  onVerifyEmail,
  applicantData,
  onFillFromUser,
}) {
  const {
    createReferralLoading,
    createReferralSuccess,
    createReferralError,
    verifyEmailLoading,
    verifyEmailSuccess,
    verifyEmailError,
    resumeUploadLoading,
    resumeUploadSuccess,
    resumeUploadError,
    coverLetterUploadLoading,
    coverLetterUploadSuccess,
    coverLetterUploadError,
  } = recruiterJobReferralState;
  const [jobSkillArray, setJobSkillArray] = useState([]);

  useEffect(() => {
    if (jobData?.minimumRequirements?.length > 0) {
      const arr = jobData.minimumRequirements.map((each) => {
        return {
          _id: each._id,
          skill: each.skill,
          experience: "",
        };
      });
      setJobSkillArray((pVal) => [...arr]);
      setFormData((pValue) => {
        return {
          ...pValue,
          skills: arr,
        };
      });
    }
  }, [jobData?.minimumRequirements]);
  console.log({ jobSkillArray });

  const handleRemove = (index) => {
    const updatedData = [...jobSkillArray];
    updatedData.splice(index, 1);
    setJobSkillArray(updatedData);
    setFormData((pValue) => {
      return {
        ...pValue,
        skills: updatedData,
      };
    });
  };
  const handleAdd = () => {
    let updatedData = [...jobSkillArray];

    if (
      formData?.skills?.every((each) => each.skill && each.experience) &&
      !errorMessages.skills
    ) {
      updatedData.push({ skill: "", experience: "" });
      setJobSkillArray(updatedData);
      setFormData((pValue) => {
        return {
          ...pValue,
          skills: updatedData,
        };
      });
    }
  };
  const handleChange = (name, value, idx) => {
    let data = [...jobSkillArray];
    data[idx][name] = value;
    setJobSkillArray(data);
    setFormData((pValue) => {
      return {
        ...pValue,
        skills: data,
      };
    });
  };
  console.log({ errorMessages });
  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      style={{ padding: "1rem 2.5rem 0", backgroundColor: "white" }}
    >
      <Col sm={{ span: 10, offset: 0 }}>
        <Row className={`mb-1 mt-1`}>
          <h2 className={css.title}>Skills</h2>
          <p className={css.p}>
            Minimum Requirements (Add required skills and experience in
            particular skills) :
          </p>
        </Row>
        <Col>
          {jobSkillArray.map((each, idx) => {
            if (each._id) {
              return (
                <Form.Group
                  className="mb-3"
                  key={idx + each._id}
                  controlId={each._id}
                >
                  <Form.Label className={css.labelChange}>
                    {String(each.skill).charAt(0).toUpperCase() +
                      String(each.skill).slice(1)}
                    :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name={"experience"}
                    value={formData.skills[idx]?.experience}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value, idx)
                    }
                    required
                    isInvalid={
                      showErrorAlert && !formData.skills[idx]?.experience
                    }
                    placeholder="YY/MM"
                    style={{ borderRadius: "2px" }}
                  />
                </Form.Group>
              );
            } else {
              return (
                <div key={idx + each._id} className="d-flex  align-center">
                  <Form.Group className="mb-3 m-1" controlId={idx}>
                    <Form.Label className={css.labelChange}>Skill:</Form.Label>
                    <Form.Control
                      type="text"
                      name={"skill"}
                      value={formData.skills[idx]?.skill}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value, idx)
                      }
                      placeholder="Name"
                      style={{ borderRadius: "2px" }}
                      isInvalid={showErrorAlert && !formData.skills[idx]?.skill}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 m-1" key={idx} controlId={idx}>
                    <Form.Label className={css.labelChange}>
                      Experience:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name={"experience"}
                      value={formData.skills[idx]?.experience}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value, idx)
                      }
                      placeholder="YY/MM"
                      style={{ borderRadius: "2px" }}
                      required
                      isInvalid={
                        showErrorAlert && !formData.skills[idx]?.experience
                      }
                    />
                  </Form.Group>
                  <Button
                    type="button"
                    className={css.removeButton}
                    onClick={() => handleRemove(idx)}
                    //   disabled={}
                  >
                    <AiFillCloseCircle className={css.close} />
                  </Button>
                </div>
              );
            }
          })}
          <div>
            {errorMessages.skills && showErrorAlert && (
              <Form.Text className="text-danger">
                {errorMessages.skills}
              </Form.Text>
            )}
          </div>
          <Button
            className={`${css.customButton} mb-5`}
            variant="primary"
            onClick={handleAdd}
            disabled={loading}
          >
            + Add New
          </Button>
        </Col>
      </Col>
    </Form>
  );
}
