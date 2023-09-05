import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export default function ReviewAndSubmit({
  currentTab,
  handleSubmit,
  data,
  handleBack,
}) {
  return (
    <>
      {currentTab === "review-and-submit" && (
        <Form
          className="job-form w-60"
          noValidate
          onSubmit={(e) => handleSubmit(e, "under review", "save")}
        >
          <div className="w-100  mt-5">
            <h5>{data.jobTitle}</h5>
            <p>
              {data.country}, {data.city}
            </p>
            <p>{data.workplaceType}</p>
            <p>{data.jobType}</p>
            <h5>Details</h5>
            <p>{data.description}</p>
            <p>{data.qualifications}</p>
            {data.minimumRequirements.map((x, index) => {
              return (
                <p key={index}>
                  {x.skill}, {x.experience}
                </p>
              );
            })}
            <h5>Questions</h5>
            {data.screeningQuestions.map((x, index) => {
              return (
                <div key={index}>
                  <p>{x.question}</p>
                  <p>{x.idealAnswer}</p>
                </div>
              );
            })}
            <h5>Payout Details</h5>
            <p>{data.NoOfVacancies}</p>
            <p>{data.NoOfApplications}</p>
            <p>{data.annualCtcRange}</p>
            <p>
              {data.minimumCtc}-{data.maximumBudget}
            </p>
            <p>
              {data.FulFillmentPayout} ({data.FulFillmentPayoutType})
            </p>
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
                  className="ms-3"
                  onClick={(e) => handleSubmit(e, "draft", "draft")}
                >
                  Save To Draft
                </Button>
                <Button type="submit" className="ms-3">
                  Save Job
                </Button>
              </div>
            </div>
          )}
        </Form>
      )}
    </>
  );
}
