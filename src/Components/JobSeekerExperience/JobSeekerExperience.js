import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./JobSeekerExperience.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";

const JobSeekerExperience = ({
  jobSeekerProfileUpdate,
  dispatch,
  clearErrors,
  profileData,
}) => {
  const {
    user,
    profileLoading,
    profileUpdateSuccess,
    profileUpdateLoading,
    profileUpdateError,
  } = useSelector((state) => state.user);

  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});

  const [degreeData, setDegreeData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [totalExperienceValue, setTotalExperienceValue] = useState("");

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);
  const [experienced, setexperienced] = useState(true);

  const [showValidation, setShowValidation] = useState(false);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    /* 	if (profileUpdateSuccess || profileUpdateError) {
        setEditingField(null);
      } */
    if (profileUpdateError) {
      setFormValues(initialValues);
    }
  }, [profileUpdateSuccess, profileUpdateError, initialValues]);
  React.useEffect(() => {
    if (profileUpdateSuccess && formSubmitSuccess) {
      setFormSubmitSuccess(false);
      nextTab();
      return;
    }
  }, [profileUpdateSuccess, navigate, formSubmitSuccess]);
  React.useEffect(() => {
    const values = user.profile?.experience;
    user.profile?.isExperienced ? setexperienced(true) : setexperienced(false);

    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setDegreeData(copiedValues || []);
    setFormValues({});
  }, [user]);

  React.useEffect(() => {
    let changed =
      !isEqual(degreeData, initialValues) ||
      user.profile?.isExperienced != experienced;
    setIsFromChanged(changed);
  }, [degreeData, initialValues, experienced]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);

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
              moment(formValues.joiningDate, "MM/YYYY"),
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
          setFormValues({ ...formValues, [name]: value, relievingDate: "" });

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
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCancel = () => {
    setShowValidation(false);
  };

  const handleRemove = (index) => {
    // Make a copy of the degreeData array to modify it without directly changing the state
    const updatedData = [...degreeData];
    updatedData.splice(index, 1); // Remove the entry at the specified index

    // Update the state with the modified array
    setDegreeData(updatedData);

    // Call the API to update the data on the server
    /* updateApiCall(updatedData); */
  };
  const calculateTotalExpInMonths = (expArray) => {
    let exp = 0;
    expArray.forEach((each, idx) => {
      try {
        const start = moment(each.joiningDate, "MM/YYYY");
        const end = moment(each.relievingDate, "MM/YYYY");
        const diffDays = end.diff(start, "days");
        const months = parseInt(diffDays / 30) + (diffDays % 30 > 14 ? 1 : 0);
        exp += months;
      } catch (e) {}
    });
    return String(exp);
  };
  const handleSubmit = async (e, next) => {
    e.preventDefault();

    if (!experienced) {
      setDegreeData([]);
      const formData = {
        isExperienced: experienced,
        experience: [],
        totalExperience: "0",
      };
      try {
        await dispatch(jobSeekerProfileUpdate(formData));
      } catch (error) {
        console.error("Error submitting the form:", error);
        setShowErrorAlert(true);
        setErrorMessage("Failed to update profile. Please try again later.");
      }
    } else {
      const formData = {
        isExperienced: experienced,
        experience: degreeData,
      };
      try {
        await dispatch(jobSeekerProfileUpdate(formData));
      } catch (error) {
        console.error("Error submitting the form:", error);
        setShowErrorAlert(true);
        setErrorMessage("Failed to update profile. Please try again later.");
      }
    }
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
    const startDate = parseDate(formValues.joiningDate);
    const endDate = parseDate(formValues.relievingDate);

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
  }, [formValues.joiningDate, formValues.relievingDate]);

  const handleAdd = () => {
    if (
      !formValues.organizationName ||
      !formValues.designation ||
      !formValues.responsibilities ||
      !formValues.joiningDate ||
      Object.keys(validationErrors).length > 0
    ) {
      setShowValidation(true);
      return;
    }
    if (!formValues.isCurrentlyWorking && !formValues.relievingDate) {
      setShowValidation(true);
      return;
    }
    // Check if the number of rows is already 5
    if (degreeData.length >= 4) {
      alert("You can only add up to 4 entries.");
      return;
    }

    const newEntry = {
      organizationName: formValues.organizationName,
      designation: formValues.designation, // Add the designation field
      responsibilities: formValues.responsibilities,
      joiningDate: formValues.joiningDate,
      isCurrentlyWorking: formValues.isCurrentlyWorking,
      relievingDate: formValues.isCurrentlyWorking
        ? ""
        : formValues.relievingDate,
      totalExperienceValue: totalExperienceValue, // Use the calculated totalExperienceValue from the state
    };

    setDegreeData([...degreeData, newEntry]);
    setFormValues({
      ...formValues,
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

  const previousTab = () => {
    navigate("/dashboard/profile/education");
  };

  const nextTab = () => {
    navigate("/dashboard/profile/skills");
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
    } else {
      setexperienced(true);
    }
  };

  return (
    <div style={{ paddingLeft: "2.5rem" }} className="mt-4">
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      <Form style={{ backgroundColor: "white" }} onSubmit={handleSubmit}>
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
                      value={formValues.organizationName}
                      onChange={handleChange}
                      isInvalid={showValidation && !formValues.organizationName}
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
                      value={formValues.designation}
                      onChange={handleChange}
                      isInvalid={showValidation && !formValues.designation}
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
                  value={formValues.responsibilities}
                  onChange={handleChange}
                  isInvalid={showValidation && !formValues.responsibilities}
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
                      value={formValues.isCurrentlyWorking}
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
                      value={formValues.joiningDate}
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
                      value={formValues.relievingDate}
                      name="relievingDate"
                      onChange={handleChange}
                      //isInvalid={}  Apply isInvalid class based on dobIsValid state
                      disabled={!experienced || formValues.isCurrentlyWorking}
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
                disabled={!experienced || profileUpdateLoading}
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
                              disabled={profileUpdateLoading}
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
            disabled={profileUpdateLoading}
          >
            Previous
          </Button>

          <Button
            disabled={
              !isFormChanged || profileUpdateLoading /*||
					 		(validationErrors &&
								Object.keys(validationErrors).length > 0) ||
							editingField */
            }
            type="button"
            onClick={handleSubmit}
            variant="primary"
            style={{ width: "9rem" }}
            className="d-inline"
          >
            {profileUpdateLoading ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            disabled={!isFormChanged || profileUpdateLoading}
            onClick={(e) => handleSubmit(e, true)}
          >
            {profileUpdateLoading ? "Saving" : "Save & Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobSeekerExperience;
