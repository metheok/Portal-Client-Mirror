import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddDetails({
  currentTab,
  handleSubmit,
  data,
  handleBack,
  setData,
  disabled,
  setDisabled,
}) {
  useEffect(() => {
    const isFormFilled = Object.keys(data).every((key) => {
      return (
        key === "minimumRequirements" ||
        (typeof data[key] === "string" && data[key].trim() !== "")
      );
    });
    const isArrayFilled = data.minimumRequirements.every((obj) => {
      return Object.keys(obj).every((key) => {
        const value = obj[key];
        return (
          key === "delete" || (typeof value === "string" && value.trim() !== "")
        );
      });
    });
    if (isFormFilled && isArrayFilled) {
      setDisabled((pValue) => {
        return {
          ...pValue,
          details: false,
        };
      });
    } else {
      setDisabled((pValue) => {
        return {
          ...pValue,
          details: true,
        };
      });
    }
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((pValue) => {
      return {
        ...pValue,
        [name]: value,
      };
    });
  }

  return (
    <>
      {currentTab === "add-details" && (
        <Form
          className="job-form w-60"
          noValidate
          onSubmit={(e) => handleSubmit(e, "draft", "save")}
        >
          <div className="w-100  mt-5">
            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="description"
                value={data.description}
                as="textarea"
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Responsibilities</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="responsibilities"
                value={data.responsibilities}
                as="textarea"
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Qualifications</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="qualifications"
                value={data.qualifications}
                as="textarea"
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Minimum Requirements</Form.Label>
              {data.minimumRequirements.map((x, index) => {
                return (
                  <div
                    key={index}
                    className={x.delete ? "d-flex mb-4" : "d-flex mb-4 pe-4"}
                  >
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
                          setData({ ...data, minimumRequirements: newSkill });
                        }}
                        required
                      />
                      <Form.Control
                        type="text"
                        placeholder="Experience"
                        value={x.experience}
                        onChange={(e) => {
                          const newSkill = [...data.minimumRequirements];
                          newSkill[index].experience = e.target.value;
                          setData({ ...data, minimumRequirements: newSkill });
                        }}
                        required
                      />
                    </div>
                    {x.delete && (
                      <div
                        onClick={() => {
                          setData((pValue) => {
                            const newArray = pValue.minimumRequirements.filter(
                              (item, i) => i !== index
                            );
                            return {
                              ...pValue,
                              minimumRequirements: newArray,
                            };
                          });
                        }}
                        className="d-flex justify-content-center align-items-center ms-3"
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
                    minimumRequirements: [
                      ...data.minimumRequirements,
                      { skill: "", experience: "", delete: true },
                    ],
                  });
                }}
                className="d-flex justify-content-end text-primary cursor-pointer"
              >
                + Add Another Skill
              </div>
            </Form.Group>
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
                  disabled={disabled.details}
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
