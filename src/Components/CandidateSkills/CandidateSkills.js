import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./CandidateSkills.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { AiFillCloseCircle } from "react-icons/ai";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";

const CandidateSkills = ({
  dispatch,
  clearErrors,
  formValues,
  setFormValues,
  nextTab,
  previousTab,
}) => {
  const {
    user,
    profileLoading,
    profileUpdateLoading,
    profileUpdateSuccess,
    profileUpdateError,
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const [degreeData, setDegreeData] = useState([]);

  // validations states
  const [validationErrors, setValidationErrors] = useState({});

  const [showValidation, setShowValidation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());

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
    setFormData({ ...formData, [name]: value });
  };

  const handleRemove = (index) => {
    const updatedData = [...degreeData];
    updatedData.splice(index, 1);
    setFormValues({ ...formValues, skills: updatedData });

    setDegreeData(updatedData);
  };

  const handleAdd = () => {
    if (
      !formData.skill ||
      !formData.experience ||
      !formData.description ||
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
      skill: formData.skill,
      experience: formData.experience,
      description: formData.description,
    };

    setDegreeData([...degreeData, newEntry]);
    setFormValues({ ...formValues, skills: [...degreeData, newEntry] });

    setFormData({
      ...formData,
      skill: "",
      experience: "",
      description: "",
    });
    setShowValidation(false);
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
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      <Form style={{ backgroundColor: "white" }}>
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
                  value={formData.skill}
                  onChange={handleChange}
                  isInvalid={showValidation && !formData.skill}
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
                  value={formData.experience}
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
              value={formData.description}
              onChange={handleChange}
              isInvalid={showValidation && !formData.description}
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
            disabled={
              validationErrors && Object.keys(validationErrors).length > 0
            }
          >
            Previous
          </Button>

          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            disabled={
              validationErrors && Object.keys(validationErrors).length > 0
            }
            onClick={nextTab}
          >
            {"Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CandidateSkills;
