import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./CandidateEducation.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";
import { AiFillCloseCircle } from "react-icons/ai";
const CandidateEducation = ({
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
      case "yearOfPassing":
        const currentYear = moment().year();
        const yearValue = moment(value, "YYYY");
        const year = parseInt(value, 10);

        if (!yearValue.isValid() || year < 1980 || year > currentYear) {
          updatedErrors[name] =
            "Invalid year format or year out of range (1980 - current year).";
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
    setFormData({ ...formData, [name]: value });
  };
  const handleAdd = () => {
    if (
      !formData.degree ||
      !formData.yearOfPassing ||
      !formData.institute ||
      Object.keys(validationErrors).length > 0
    ) {
      setShowValidation(true);
      return;
    }

    const newDegreeData = {
      degree: formData.degree,
      yearOfPassing: formData.yearOfPassing,
      institute: formData.institute,
    };
    setDegreeData([...degreeData, newDegreeData]);
    setFormValues({ ...formValues, education: [...degreeData, newDegreeData] });
    setFormData({
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
    setFormValues({ ...formValues, education: updatedData });
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
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}
      <Form style={{ backgroundColor: "white" }}>
        <Col sm={{ span: 11, offset: 0 }}>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="degree">
              <Form.Label className={css.labelChange}>Degree Name :</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                isInvalid={showValidation && !formData.degree}
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
                value={formData.yearOfPassing}
                onChange={handleChange}
                placeholder="yyyy"
                isInvalid={
                  showValidation &&
                  (!formData.yearOfPassing ||
                    formData.yearOfPassing < 1980 ||
                    formData.yearOfPassing > new Date().getFullYear())
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
                value={formData.institute}
                onChange={handleChange}
                isInvalid={showValidation && !formData.institute}
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
            variant="secondary"
            className="mx-3"
            type="button"
            disabled={
              validationErrors && Object.keys(validationErrors).length > 0
            }
            onClick={(e) => nextTab()}
          >
            {"Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CandidateEducation;
