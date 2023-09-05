import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./JobSeekerEducation.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";
import { AiFillCloseCircle } from "react-icons/ai";
const JobSeekerEducation = ({
  jobSeekerProfileUpdate,
  dispatch,
  clearErrors,
}) => {
  const {
    user,
    profileLoading,
    profileUpdateLoading,
    profileUpdateSuccess,
    profileUpdateError,
  } = useSelector((state) => state.user);

  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});
  const [degreeData, setDegreeData] = useState([]);

  // validations states
  const [validationErrors, setValidationErrors] = useState({});

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);

  const [showValidation, setShowValidation] = useState(false);

  const navigate = useNavigate();
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  React.useEffect(() => {
    if (profileUpdateSuccess && formSubmitSuccess) {
      setFormSubmitSuccess(false);
      nextTab();
      return;
    }
  }, [profileUpdateSuccess, navigate, formSubmitSuccess]);
  React.useEffect(() => {
    if (profileUpdateError) {
      setFormValues(initialValues);
    }
  }, [profileUpdateSuccess, profileUpdateError, initialValues]);

  React.useEffect(() => {
    const values = user.profile?.education;
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setFormValues({});
    setDegreeData(copiedValues || []);
  }, [user]);
  React.useEffect(() => {
    setIsFromChanged(!isEqual(degreeData, initialValues));
  }, [degreeData, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);

    let updatedErrors = { ...validationErrors };

    switch (name) {
      case "yearOfPassing":
        const currentYear = moment().year();
        const yearValue = moment(value, "YYYY");
        const year = parseInt(value, 10);

        if (!yearValue.isValid() || year < 1980 || year > currentYear) {
          updatedErrors[name] =
            "Invalid year format or year out of range (1990 - current year).";
        } else {
          delete updatedErrors.yearOfPassing;
        }
        break;
      case "degree":
        if (!value) {
          updatedErrors[name] = "Please provide a valid degree name.";
        } else {
          updatedErrors = validationErrors;
          delete updatedErrors.degree;
        }
        break;
      case "institute":
        if (!value) {
          updatedErrors[name] = "Please provide a valid college/university.";
        } else {
          updatedErrors = validationErrors;
          delete updatedErrors.institute;
        }
        break;
      default:
        break;
    }

    setValidationErrors(updatedErrors);
    setFormValues({ ...formValues, [name]: value });
  };
  const handleAdd = () => {
    if (
      !formValues.degree ||
      !formValues.yearOfPassing ||
      !formValues.institute
    ) {
      setShowValidation(true);
      return;
    }

    const newDegreeData = {
      degree: formValues.degree,
      yearOfPassing: formValues.yearOfPassing,
      institute: formValues.institute,
    };
    setDegreeData([...degreeData, newDegreeData]);
    setFormValues({
      degree: "",
      yearOfPassing: "",
      institute: "",
    });
    setShowValidation(false);
  };

  const handleRemove = (index) => {
    const updatedData = [...degreeData];
    updatedData.splice(index, 1);
    setDegreeData(updatedData);
  };

  const handleSubmit = async (e, next) => {
    e.preventDefault();
    const formData = {
      education: degreeData,
    };

    try {
      await dispatch(jobSeekerProfileUpdate(formData));
      if (next) setFormSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const previousTab = () => {
    navigate("/dashboard/profile/general");
  };

  const nextTab = () => {
    navigate("/dashboard/profile/professional");
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: "2.5rem" }} className="mt-3">
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      <Form style={{ backgroundColor: "white" }} onSubmit={handleSubmit}>
        <Col sm={{ span: 11, offset: 0 }}>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="degree">
              <Form.Label className={css.labelChange}>Degree Name :</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={formValues.degree}
                onChange={handleChange}
                isInvalid={showValidation && !formValues.degree}
                style={{ borderRadius: "2px" }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid degree name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="yearOfPassing">
              <Form.Label className={css.labelChange}>
                Year of Passing :
              </Form.Label>
              <Form.Control
                type="text"
                name="yearOfPassing"
                value={formValues.yearOfPassing}
                onChange={handleChange}
                placeholder="yyyy"
                isInvalid={
                  showValidation &&
                  (!formValues.yearOfPassing ||
                    formValues.yearOfPassing < 1990 ||
                    formValues.yearOfPassing > new Date().getFullYear())
                }
                style={{ borderRadius: "2px" }}
              />
              {validationErrors.yearOfPassing && (
                <Form.Text className="text-danger">
                  {validationErrors.yearOfPassing}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="institute">
              <Form.Label className={css.labelChange}>
                College/University :
              </Form.Label>
              <Form.Control
                type="text"
                name="institute"
                value={formValues.institute}
                onChange={handleChange}
                isInvalid={showValidation && !formValues.institute}
                style={{ borderRadius: "2px" }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid degree name.
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className={`${css.customButton} mb-5`}
              variant="primary"
              onClick={handleAdd}
              disabled={profileUpdateLoading}
            >
              + Add New
            </Button>
          </Col>
          <Row>
            <Col sm={11}>
              <Table striped bordered hover>
                <thead className={css.table}>
                  <tr>
                    <th>Degree Name</th>
                    <th>Year of Passing</th>
                    <th>College /University</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className={css.tableBody}>
                  {degreeData.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.degree}</td>
                      <td>{entry.yearOfPassing}</td>
                      <td>{entry.institute}</td>
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
              !isFormChanged || profileUpdateLoading
              /*||
					 		(validationErrors &&
								Object.keys(validationErrors).length > 0) ||
							editingField */
            }
            type="submit"
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

export default JobSeekerEducation;
