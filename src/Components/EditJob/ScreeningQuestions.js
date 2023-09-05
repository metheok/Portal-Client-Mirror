import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function ScreeningQuestions({
  currentTab,
  handleSubmit,
  data,
  setData,
  handleBack,
  questionForm,
  disabled,
  setDisabled,
}) {
  useEffect(() => {
    if (data.screeningQuestions) {
      var isArrayFilled = data.screeningQuestions.every((obj) => {
        return Object.keys(obj).every((key) => {
          const value = obj[key];
          return (
            key === "delete" ||
            key === "mustHave" ||
            (typeof value === "string" && value.trim() !== "")
          );
        });
      });
    }
    if (isArrayFilled) {
      setDisabled((pValue) => {
        return {
          ...pValue,
          questions: false,
        };
      });
    } else {
      setDisabled((pValue) => {
        return {
          ...pValue,
          questions: true,
        };
      });
    }
  }, [data]);

  return (
    <>
      {currentTab === "screening-questions" && (
        <Form
          ref={questionForm}
          className="job-form w-60"
          noValidate
          onSubmit={(e) => handleSubmit(e, "draft", "save")}
        >
          <div className="w-100  mt-5">
            <h5 className="mb-4">Applicant Must Answer Each Question</h5>
            {data.screeningQuestions &&
              data.screeningQuestions.map((x, index) => {
                return (
                  <div
                    key={index}
                    className={x.delete ? "d-flex" : "d-flex pe-4"}
                  >
                    <div className="d-flex justify-content-center me-3">
                      {index + 1}
                    </div>
                    <div>
                      <Form.Group className="mb-4">
                        <Form.Label>Write Question Here</Form.Label>
                        <Form.Control
                          value={x.question}
                          type="text"
                          onChange={(e) => {
                            const newQuestion = [...data.screeningQuestions];
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
                        <Form.Group className="mb-4">
                          <Form.Label>Answer Type</Form.Label>
                          <Form.Select
                            onChange={(e) => {
                              const newQuestion = [...data.screeningQuestions];
                              newQuestion[index].answerType = e.target.value;
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
                        <Form.Group className="mb-4 ms-3">
                          <Form.Check
                            className="d-flex"
                            type="checkbox"
                            label="Must Have Qualification"
                            value={x.mustHave}
                            onChange={(e) => {
                              const newQuestion = [...data.screeningQuestions];
                              newQuestion[index].mustHave = e.target.checked;
                              setData({
                                ...data,
                                screeningQuestions: newQuestion,
                              });
                            }}
                          />
                        </Form.Group>
                      </div>
                      <Form.Group className="mb-4">
                        <Form.Label className="me-3">Ideal Answer:</Form.Label>
                        {x.answerType === "yes/no" ? (
                          <>
                            <Form.Check
                              inline
                              label="Yes"
                              name={`yesNoRadio${index}`}
                              type="radio"
                              id={`inline-radio-1-${index}`}
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
                              name={`yesNoRadio${index}`}
                              type="radio"
                              id={`inline-radio-2-${index}`}
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
                        ) : (
                          <Form.Control
                            onChange={(e) => {
                              const newQuestion = [...data.screeningQuestions];
                              newQuestion[index].idealAnswer = e.target.value;
                              setData({
                                ...data,
                                screeningQuestions: newQuestion,
                              });
                            }}
                            value={x.idealAnswer}
                            type={
                              x.answerType === "one line" ? "text" : "number"
                            }
                            required
                          />
                        )}
                      </Form.Group>
                    </div>
                    {x.delete && (
                      <div
                        onClick={() => {
                          setData((pValue) => {
                            const newArray = pValue.screeningQuestions.filter(
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
                  </div>
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
                      answerType: "yes/no",
                      mustHave: false,
                      idealAnswer: "yes",
                      delete: true,
                    },
                  ],
                });
              }}
              className="d-flex justify-content-end mt-2 text-primary cursor-pointer"
            >
              + Add Question
            </div>
          </div>
          {currentTab !== "" && (
            <div className="d-flex justify-content-center">
              <div className="mb-4 mt-5 d-flex">
                <Button
                  onClick={handleBack}
                  className="border-black"
                  variant="light"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="ms-3"
                  onClick={(e) => handleSubmit(e, "draft", "draft")}
                >
                  Save To Draft
                </Button>
                <Button
                  disabled={disabled.questions}
                  type="submit"
                  className="ms-3"
                >
                  Save and Next
                </Button>
              </div>
            </div>
          )}
        </Form>
      )}
    </>
  );
}
