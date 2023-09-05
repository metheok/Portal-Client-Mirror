import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./JobSeekerSkills.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { AiFillCloseCircle } from "react-icons/ai";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";

const JobSeekerSkills = ({
  jobSeekerProfileUpdate,
  dispatch,
  clearErrors,
  profileData,
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
    const values = user.profile?.skills;

    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setDegreeData(copiedValues || []);
    setFormValues({});
  }, [user]);

  React.useEffect(() => {
    let changed = !isEqual(degreeData, initialValues);
    setIsFromChanged(changed);
  }, [degreeData, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);

    let updatedErrors = { ...validationErrors };

    switch (name) {
      case "experience":
        updatedErrors[name] = !moment(value, "YY/MM").isValid()
          ? "Invalid year format. YY/MM."
          : null;
        if (!updatedErrors.experience) {
          updatedErrors = validationErrors;
          delete updatedErrors.experience;
        }
        break;
      case "skill":
        if (!value) {
          updatedErrors[name] = "Please provide skill name";
        } else {
          updatedErrors = validationErrors;
          delete updatedErrors.skill;
        }
        break;
      case "description":
        if (!value) {
          updatedErrors[name] = "Please provide description";
        } else {
          updatedErrors = validationErrors;
          delete updatedErrors[name];
        }
        break;

      default:
        break;
    }

    setValidationErrors(updatedErrors);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRemove = (index) => {
    // Make a copy of the degreeData array to modify it without directly changing the state
    const updatedData = [...degreeData];
    updatedData.splice(index, 1); // Remove the entry at the specified index

    // Update the state with the modified array
    setDegreeData(updatedData);
  };

  const handleSubmit = async (e, next) => {
    e.preventDefault();
    const formData = {
      skills: degreeData,
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
  const handleAdd = () => {
    if (
      !formValues.skill ||
      !formValues.experience ||
      !formValues.description ||
      Object.keys(validationErrors).length > 0
    ) {
      setShowValidation(true);
      return;
    }

    // Check if the number of rows is already 5
    if (degreeData.length >= 4) {
      alert("You can only add up to 4 skills.");
      return;
    }

    const newEntry = {
      skill: formValues.skill,
      experience: formValues.experience,
      description: formValues.description,
    };

    setDegreeData([...degreeData, newEntry]);
    setFormValues({
      ...formValues,
      skill: "",
      experience: "",
      description: "",
    });
    setShowValidation(false);
  };

  const previousTab = () => {
    navigate("/dashboard/profile/professional");
  };

  const nextTab = () => {
    navigate("/dashboard/profile/additional");
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: "2.5rem" }} className="mt-4">
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      <Form style={{ backgroundColor: "white" }} onSubmit={handleSubmit}>
        <Col sm={{ span: 10, offset: 0 }}>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="skill">
                <Form.Label className={css.labelChange}>
                  Name Of Skills/Technology :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="skill"
                  value={formValues.skill}
                  onChange={handleChange}
                  isInvalid={showValidation && !formValues.skill}
                  required
                  style={{ borderRadius: "2px" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide organization name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="experience">
                <Form.Label className={css.labelChange}>
                  Experience in that skill :
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="yy/mm"
                  value={formValues.experience}
                  name="experience"
                  onChange={handleChange}
                  //isInvalid={}  Apply isInvalid class based on dobIsValid state
                  required
                  style={{ borderRadius: "2px" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide date of Joining.
                </Form.Control.Feedback>
                {validationErrors.experience && (
                  <Form.Text className="text-danger">
                    {validationErrors.experience}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label className={css.labelChange}>
              Brief about project :
            </Form.Label>
            <Form.Control
              type="text"
              name="description"
              as="textarea"
              rows={4}
              value={formValues.description}
              onChange={handleChange}
              isInvalid={showValidation && !formValues.description}
              required
              style={{ borderRadius: "2px", resize: "none" }}
            />
          </Form.Group>

          <Button
            className={`${css.customButton} mb-5`}
            variant="primary"
            onClick={handleAdd}
            disabled={profileUpdateLoading}
          >
            + Add New
          </Button>

          <Row>
            <Col>
              <Table striped bordered hover>
                <thead className={css.table}>
                  <tr>
                    <th>Name Of Skills/ Technology</th>
                    <th> Experience in that skill</th>
                    <th>Brief project using that skill</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className={css.tableBody}>
                  {degreeData.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.skill}</td>
                      <td>{entry.experience}</td>
                      <td>
                        {entry.description.length > 150
                          ? `${entry.description.substring(0, 150)}...`
                          : entry.description}
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
            onClick={handleSubmit}
            type="button"
            variant="primary"
            style={{ width: "9rem" }}
            className="d-inline"
          >
            {profileUpdateLoading ? "Saving" : "Save Changes"}
          </Button>

          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={!isFormChanged || profileUpdateLoading}
          >
            {profileUpdateLoading ? "Saving" : "Save & Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobSeekerSkills;
