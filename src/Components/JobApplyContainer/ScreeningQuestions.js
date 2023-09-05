import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import css from "./JobApplyContainer.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";

export default function ScreeningQuestions({
  formData,
  setFormData,
  jobData,
  errorMessages,

  jobseekerJobApplyState,
  showErrorAlert,
}) {
  const [jobQuestionArray, setJobQuestionArray] = useState([]);

  useEffect(() => {
    if (jobData?.screeningQuestions?.length > 0) {
      const arr = jobData.screeningQuestions.map((each) => {
        return {
          _id: each._id,
          question: each.question,
          answerType: each.answerType,

          mustHave: each.mustHave,
        };
      });
      setJobQuestionArray((pVal) => [...arr]);
      setFormData((pValue) => {
        return {
          ...pValue,
          screeningQuestions: arr,
        };
      });
    }
  }, [jobData?.screeningQuestions]);
  console.log({ jobQuestionArray });

  const handleChange = (name, value, idx) => {
    let data = [...jobQuestionArray];
    data[idx][name] = value;
    setJobQuestionArray(data);
    setFormData((pValue) => {
      return {
        ...pValue,
        screeningQuestions: data,
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
          <h2 className={css.title}>Screening Questions</h2>
          <p className={css.p}>
            Minimum Requirements (Add required skills and experience in
            particular skills) :
          </p>
        </Row>
        <Col>
          {jobQuestionArray.map((each, idx) => {
            return (
              <Form.Group
                className="mb-3"
                key={idx + each._id}
                controlId={each._id}
              >
                <Form.Label className={css.labelChange}>
                  {idx + 1 + ".    "}{" "}
                  {String(each.question).charAt(0).toUpperCase() +
                    String(each.question).slice(1) +
                    ": "}
                  {each.mustHave ? "*" : ""}
                </Form.Label>
                {each.answerType === "yes/no" ? (
                  <Form.Select
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value, idx)
                    }
                    value={formData.screeningQuestions[idx]?.answer}
                    name="answer"
                    required
                  >
                    <option value="">Select One</option>

                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                ) : each.answerType === "numbers" ? (
                  <Form.Control
                    type="number"
                    name={"answer"}
                    value={formData.screeningQuestions[idx]?.answer}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value, idx)
                    }
                    required
                    placeholder="Number"
                    style={{ borderRadius: "2px" }}
                  />
                ) : (
                  <Form.Control
                    type="text"
                    name={"answer"}
                    value={formData.screeningQuestions[idx]?.answer}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value, idx)
                    }
                    required
                    isInvalid={
                      showErrorAlert &&
                      !formData.screeningQuestions[idx]?.experience
                    }
                    placeholder="Answer"
                    style={{ borderRadius: "2px" }}
                  />
                )}
                {errorMessages.screeningQuestions &&
                  each.mustHave &&
                  showErrorAlert && (
                    <Form.Text className="text-danger">
                      {errorMessages.screeningQuestions}
                    </Form.Text>
                  )}
              </Form.Group>
            );
          })}
        </Col>
      </Col>
    </Form>
  );
}
