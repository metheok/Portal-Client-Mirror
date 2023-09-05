import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./CandidateExperience.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";

const CandidateExperience = ({
  dispatch,
  clearErrors,
  formValues,
  setFormValues,
  nextTab,
  previousTab,
}) => {
  const { profileLoading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const [degreeData, setDegreeData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [totalExperienceValue, setTotalExperienceValue] = useState("");

  const [experienced, setexperienced] = useState(true);

  const [showValidation, setShowValidation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());

    let updatedErrors = { ...validationErrors };

    switch (name) {
      case "joiningDate":
        updatedErrors[name] = !moment(value, "MM/YYYY").isValid()
          ? "Invalid year format. MM/YYYY."
          : null;
        if (updatedErrors[name]) {
          break;
        }
        updatedErrors[name] =
          moment().diff(moment(value, "MM/YYYY"), "months") < 1
            ? "Joining date should be less than current date"
            : null;

        if (!updatedErrors.joiningDate) {
          updatedErrors = validationErrors;
          delete updatedErrors.joiningDate;
        }

        break;
      case "relievingDate":
        updatedErrors[name] = !moment(value, "MM/YYYY").isValid()
          ? "Invalid year format. MM/YYYY."
          : moment(value, "MM/YYYY").diff(
              moment(formData.joiningDate, "MM/YYYY"),
              "months"
            ) < 0
          ? "relieving date is more than joining date"
          : null;
        if (updatedErrors[name]) {
          break;
        }
        updatedErrors[name] =
          moment().diff(moment(value, "MM/YYYY"), "months") < 1
            ? "Releiving date should be less than current date"
            : null;
        if (!updatedErrors.relievingDate) {
          updatedErrors = validationErrors;
          delete updatedErrors.relievingDate;
        }

        break;
      case "organizationName":
        if (!value) {
          updatedErrors[name] = "Please provide organization name";
        } else {
          updatedErrors = validationErrors;
          delete updatedErrors.organizationName;
        }
        break;

      case "isCurrentlyWorking":
        if (value) {
          setFormData({ ...formData, [name]: value, relievingDate: "" });

          return;
        }
        break;

      case "designation":
        if (!value) {
          updatedErrors[name] = "Please provide your designation";
        } else {
          updatedErrors = validationErrors;
          delete updatedErrors[name];
        }
        break;
      case "responsibilities":
        if (!value) {
          updatedErrors[name] = "Please describe responsibilities";
        } else {
          updatedErrors = validationErrors;
          delete updatedErrors.name;
        }
        break;
      default:
        break;
    }

    setValidationErrors(updatedErrors);
    setFormData({ ...formData, [name]: value });
  };

  const handleRemove = (index) => {
    const updatedData = [...degreeData];
    updatedData.splice(index, 1);

    setDegreeData(updatedData);
    setFormValues({ ...formValues, experience: updatedData });
  };

  const parseDate = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
      return null;
    }

    const dateParts = dateString.split("/");
    if (dateParts.length !== 2) {
      return null;
    }

    const [month, year] = dateParts;
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    if (isNaN(monthNumber) || isNaN(yearNumber)) {
      return null;
    }

    // Use the first day of the month as the date to construct valid date objects
    return new Date(yearNumber, monthNumber - 1, 1);
  };

  const calculateTotalExperience = () => {
    const startDate = parseDate(formData.joiningDate);
    const endDate = parseDate(formData.relievingDate);

    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
      const diffMonths = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
      );
      setTotalExperienceValue(`${diffYears} Years ${diffMonths} Months`);
    } else {
      setTotalExperienceValue("");
    }
  };

  React.useEffect(() => {
    calculateTotalExperience();
  }, [formData.joiningDate, formData.relievingDate]);

  const handleAdd = () => {
    if (
      !formData.organizationName ||
      !formData.designation ||
      !formData.responsibilities ||
      !formData.joiningDate ||
      Object.keys(validationErrors).length > 0
    ) {
      setShowValidation(true);
      return;
    }
    if (!formData.isCurrentlyWorking && !formData.relievingDate) {
      setShowValidation(true);
      return;
    }
    // Check if the number of rows is already 5
    if (degreeData.length >= 4) {
      alert("You can only add up to 4 entries.");
      return;
    }

    const newEntry = {
      organizationName: formData.organizationName,
      designation: formData.designation, // Add the designation field
      responsibilities: formData.responsibilities,
      joiningDate: formData.joiningDate,
      isCurrentlyWorking: formData.isCurrentlyWorking,
      relievingDate: formData.isCurrentlyWorking ? "" : formData.relievingDate,
      totalExperienceValue: totalExperienceValue, // Use the calculated totalExperienceValue from the state
    };

    setDegreeData([...degreeData, newEntry]);
    setFormValues({ ...formValues, experience: [...degreeData, newEntry] });

    setFormData({
      ...formData,
      organizationName: "",
      designation: "", // Reset the designation field
      responsibilities: "",
      joiningDate: "",
      isCurrentlyWorking: false,
      relievingDate: "",
    });
    setTotalExperienceValue("");
    setShowValidation(false);
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleExperience = (event) => {
    if (event.target.name === "experienceNo") {
      setexperienced(false);
      setFormValues({ ...formValues, experience: [], isExperienced: false });
      setFormData({});
      setValidationErrors({});

      setDegreeData([]);
    } else {
      setexperienced(true);
      setDegreeData([]);
      setFormValues({ ...formValues, experience: [], isExperienced: true });
      setFormData({});
      setValidationErrors({});
    }
  };

  return (
    <div style={{ paddingLeft: "2.5rem" }} className="mt-4">
      <Form style={{ backgroundColor: "white" }}>
        <Col sm={{ span: 11, offset: 0 }}>
          <Form.Group className="mb-3" controlId="experience">
            <div className="d-flex justify-content-start">
              <Form.Label className={css.labelChange}>
                Total Experience :
              </Form.Label>
              <Form.Check
                type="radio"
                id="experienceYes"
                className={`${css.labelChange} mx-3`}
                label="Yes"
                name="role"
                value={true}
                checked={experienced}
                onChange={handleExperience}
              />

              <Form.Check
                type="radio"
                id="experience"
                className={`${css.labelChange} mx-3`}
                label="No"
                name="experienceNo"
                value={false}
                checked={!experienced}
                onChange={handleExperience}
              />
            </div>
          </Form.Group>
          {
            <>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="organizationName">
                    <Form.Label className={css.labelChange}>
                      Organization Name :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      isInvalid={showValidation && !formData.organizationName}
                      required
                      disabled={!experienced}
                      style={{ borderRadius: "2px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide organization name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="designation">
                    <Form.Label className={css.labelChange}>
                      Designation :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      isInvalid={showValidation && !formData.designation}
                      disabled={!experienced}
                      required
                      style={{ borderRadius: "2px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide designation.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="responsibilities">
                <Form.Label className={css.labelChange}>
                  Responsibilities :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="responsibilities"
                  as="textarea"
                  rows={3}
                  value={formData.responsibilities}
                  onChange={handleChange}
                  isInvalid={showValidation && !formData.responsibilities}
                  disabled={!experienced}
                  required
                  style={{ borderRadius: "2px", resize: "none" }}
                />
              </Form.Group>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="relievingDate">
                    <Form.Label className={css.labelChange}>
                      Is Currently Working
                    </Form.Label>

                    <Form.Select
                      name="isCurrentlyWorking"
                      value={formData.isCurrentlyWorking}
                      onChange={handleChange}
                      disabled={!experienced}
                      style={{ borderRadius: "2px" }}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="joiningDate">
                    <Form.Label className={css.labelChange}>
                      Joining Date(mm/yyyy)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="mm/yyyy"
                      value={formData.joiningDate}
                      name="joiningDate"
                      onChange={handleChange}
                      //isInvalid={}  Apply isInvalid class based on dobIsValid state
                      disabled={!experienced}
                      required
                      style={{ borderRadius: "2px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide date of Joining.
                    </Form.Control.Feedback>
                    {validationErrors.joiningDate && (
                      <Form.Text className="text-danger">
                        {validationErrors.joiningDate}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="relievingDate">
                    <Form.Label className={css.labelChange}>
                      Relieving Date(mm/yyyy)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="mm/yyyy"
                      value={formData.relievingDate}
                      name="relievingDate"
                      onChange={handleChange}
                      //isInvalid={}  Apply isInvalid class based on dobIsValid state
                      disabled={!experienced || formData.isCurrentlyWorking}
                      required
                      style={{ borderRadius: "2px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide relieving date.
                    </Form.Control.Feedback>
                    {validationErrors.relievingDate && (
                      <Form.Text className="text-danger">
                        {validationErrors.relievingDate}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="totalExperience">
                <Form.Label className={css.labelChange}>
                  Total Experience :
                </Form.Label>

                <Form.Text>{totalExperienceValue}</Form.Text>
              </Form.Group>
              <Button
                className={`${css.customButton} mb-5`}
                variant="primary"
                onClick={handleAdd}
                disabled={!experienced}
              >
                + Add New
              </Button>

              <Row>
                <Col sm={11}>
                  <Table striped bordered hover>
                    <thead className={css.table}>
                      <tr>
                        <th>Degree Name</th>
                        <th>Year of Passing</th>
                        <th>College /University</th>
                        <th>Total Experience</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody className={css.tableBody}>
                      {degreeData.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.organizationName}</td>
                          <td>{entry.designation}</td>
                          <td>
                            {entry.responsibilities.length > 150
                              ? `${entry.responsibilities.substring(0, 150)}...`
                              : entry.responsibilities}
                          </td>
                          <td>
                            {entry.joiningDate} - {entry.relievingDate}
                          </td>
                          <td>
                            <Button
                              type="button"
                              className={css.removeButton}
                              onClick={() => handleRemove(index)}
                            >
                              <AiFillCloseCircle className={css.close} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          }
        </Col>
        <div className="d-flex justify-content-end  mt-5">
          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            onClick={previousTab}
            disabled={
              (formValues.isExperienced &&
                !formValues.experience?.length > 0) ||
              (validationErrors && Object.keys(validationErrors).length > 0)
            }
          >
            Previous
          </Button>

          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            disabled={
              (formValues.isExperienced &&
                !formValues.experience?.length > 0) ||
              (validationErrors && Object.keys(validationErrors).length > 0)
            }
            onClick={(e) => nextTab()}
          >
            {" Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CandidateExperience;
