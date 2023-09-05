import React, { useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import css from "./EmployerCompanyContact.module.css";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";
import { AiFillCloseCircle } from "react-icons/ai";
const EmployerCompanyContact = ({
  dispatch,
  companyData,
  createEmployerCompany,
  updateEmployerCompany,
  employerCompanyState,
  clearForm,
  nextTab,
  isMobile,
}) => {
  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});
  const [contactArray, setContactArray] = useState([]);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormChanged, setIsFromChanged] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  React.useEffect(() => {
    if (
      employerCompanyState.companySaveError ||
      employerCompanyState.companyUpdateError
    ) {
      setFormValues({});
    }
  }, [
    employerCompanyState.companyUpdateError,
    employerCompanyState.companySaveError,
    initialValues,
  ]);
  React.useEffect(() => {
    if (
      employerCompanyState.companySaveSuccess ||
      employerCompanyState.companyUpdateSuccess
    ) {
      nextTab();
      return;
    }
  }, [
    employerCompanyState.companyUpdateSuccess,
    employerCompanyState.companySaveSuccess,
    navigate,
    nextTab,
  ]);
  React.useEffect(() => {
    const values = companyData?.contactDetails || [];
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setFormValues({});
    setContactArray(copiedValues);
  }, [companyData]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(contactArray, initialValues));
  }, [contactArray, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearForm());
    setShowErrorAlert(false);

    let updatedErrors = { ...errors };

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(value);

        updatedErrors = {
          ...errors,
          ...{ email: isValidEmail ? null : "Invalid email format" },
        };

        if (isValidEmail) {
          delete updatedErrors.email;
        }
        break;
      case "number":
        const contactRegex = /^\d{10,14}$/;
        const isValidContact = contactRegex.test(value);

        updatedErrors = {
          ...errors,
          ...{ number: isValidContact ? null : "Invalid number format" },
        };
        if (isValidContact) {
          delete updatedErrors.contact;
        }
        break;

      case "title":
        if (!value) {
          updatedErrors[name] = "Please provide a title .";
        } else {
          updatedErrors = errors;
          delete updatedErrors.title;
        }
        break;
      case "designation":
        if (!value) {
          updatedErrors[name] = "Please provide designation";
        } else {
          updatedErrors = errors;
          delete updatedErrors.designation;
        }
        break;
      case "name":
        if (!value) {
          updatedErrors[name] = "Please provide name";
        } else {
          updatedErrors = errors;
          delete updatedErrors.name;
        }
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
    setFormValues({ ...formValues, [name]: value });
  };
  const handleAdd = () => {
    if (
      !formValues.title ||
      !formValues.name ||
      !formValues.number ||
      !formValues.email ||
      !formValues.designation
    ) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the fields.");

      return;
    }
    if (Object.values(errors).some((error) => error !== null)) {
      setShowErrorAlert(true);
      setErrorMessage("");
      return;
    }
    const newArr = {
      title: formValues.title,
      name: formValues.name,
      number: formValues.number,
      email: formValues.email,
      designation: formValues.designation,
    };
    setContactArray([...contactArray, newArr]);
    setFormValues({
      title: "",
      name: "",
      number: "",
      email: "",
      designation: "",
    });
    setErrorMessage(false);
    setErrors({});
  };
  const handleRemove = (index) => {
    const updatedData = [...contactArray];
    updatedData.splice(index, 1);
    setContactArray(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      contactDetails: contactArray,
    };

    if (companyData) {
      updateEmployerCompany(formData);
    } else {
      createEmployerCompany(formData);
    }
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <>
      {/* -------------mobile view------------ */}
      {isMobile ? (
        <>
          <Form style={{ backgroundColor: "white" }} onSubmit={handleSubmit}>
            {(employerCompanyState.companyUpdateSuccess ||
              employerCompanyState.companySaveSuccess) && (
              <SuccessAlert message="Data saved successfully!" />
            )}
            {showErrorAlert && errorMessage && (
              <ErrorAlert message={errorMessage} />
            )}
            {(employerCompanyState.companyUpdateError ||
              employerCompanyState.companySaveError) && (
              <ErrorAlert message={"Something went wrong"} />
            )}

            <Row>
              <Form.Label className={css.Label}>
                {" "}
                Contact Person Name{" "}
              </Form.Label>
              <Col xs={4}>
                <Form.Group controlId="title">
                  {" "}
                  <Form.Select
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    className={`${css.singleLine} custom-select`}
                    style={{ borderRadius: "2px" }}
                    isInvalid={showErrorAlert && errors.title}
                  >
                    <option key={1} value="mr">
                      Mr.
                    </option>
                    <option key={2} value="mrs">
                      Mrs.
                    </option>
                    <option key={3} value="miss">
                      Miss
                    </option>
                    <option key={4} value="ms">
                      Ms.
                    </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a title.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    className={css.singleLine}
                    isInvalid={showErrorAlert && errors.name}
                    style={{ borderRadius: "2px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="number">
              <Form.Label className={css.Label}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={formValues.number}
                onChange={handleChange}
                className={css.singleLine}
                isInvalid={showErrorAlert && errors.number}
                style={{ borderRadius: "2px" }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className={css.Label}>Email Address :</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formValues.email}
                className={css.singleLine}
                onChange={handleChange}
                isInvalid={showErrorAlert && errors.email}
                style={{ borderRadius: "2px" }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="designation">
              <Form.Label className={css.Label}>Designation :</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formValues.designation}
                className={css.singleLine}
                onChange={handleChange}
                isInvalid={showErrorAlert && errors.designation}
                style={{ borderRadius: "2px" }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid designation name.
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className={`${css.customButton} mb-5`}
              variant="primary"
              onClick={handleAdd}
              disabled={
                employerCompanyState.companyUpdateLoading ||
                employerCompanyState.companySaveLoading
              }
            >
              + Add New
            </Button>

            <Row>
              <Col sm={12}>
                <Table striped bordered hover>
                  <thead className={css.table}>
                    <tr>
                      <th>Contact Person</th>
                      <th>Contact No.</th>
                      <th>Email</th>
                      <th>Designation</th>

                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody className={css.tableBody}>
                    {contactArray.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.name}</td>
                        <td>{entry.number}</td>
                        <td>{entry.email}</td>
                        <td>{entry.designation}</td>
                        <td>
                          <Button
                            type="button"
                            className={css.removeButton}
                            onClick={() => handleRemove(index)}
                            disabled={
                              employerCompanyState.companyUpdateLoading ||
                              employerCompanyState.companySaveLoading
                            }
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
            <div className="d-flex justify-content-end  mt-5">
              <Button
                variant="secondary"
                className="mx-3"
                type="button"
                onClick={navigateToDashboard}
                disabled={
                  employerCompanyState.companyUpdateLoading ||
                  employerCompanyState.companySaveLoading
                }
              >
                Cancel
              </Button>

              {isFormChanged ? (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    employerCompanyState.companyUpdateLoading ||
                    employerCompanyState.companySaveLoading ||
                    (errors && Object.keys(errors).length > 0)
                  }
                >
                  {employerCompanyState.companyUpdateLoading ||
                  employerCompanyState.companySaveLoading
                    ? "Saving..."
                    : "Save & Next"}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="button"
                  onClick={nextTab}
                  disabled={
                    employerCompanyState.companyUpdateLoading ||
                    employerCompanyState.companySaveLoading ||
                    (errors && Object.keys(errors).length > 0)
                  }
                >
                  {"Next"}
                </Button>
              )}
            </div>
          </Form>
        </>
      ) : (
        <>
          {/* -------------laptop view------------ */}
          <Form
            style={{ padding: "1rem", backgroundColor: "white" }}
            onSubmit={handleSubmit}
          >
            {(employerCompanyState.companyUpdateSuccess ||
              employerCompanyState.companySaveSuccess) && (
              <SuccessAlert message="Data saved successfully!" />
            )}
            {showErrorAlert && errorMessage && (
              <ErrorAlert message={errorMessage} />
            )}
            {(employerCompanyState.companyUpdateError ||
              employerCompanyState.companySaveError) && (
              <ErrorAlert message={"Something went wrong"} />
            )}
            <Col sm={{ span: 10, offset: 0 }}>
              <Row>
                <Col xs={4}>
                  <Form.Group controlId="title">
                    <Form.Label className={css.labelChange}>Title :</Form.Label>
                    <Form.Select
                      name="title"
                      value={formValues.title}
                      onChange={handleChange}
                      className="custom-select"
                      style={{ borderRadius: "2px" }}
                      isInvalid={showErrorAlert && errors.title}
                    >
                      <option key={1} value="">
                        Select
                      </option>
                      <option key={2} value="mr">
                        Mr.
                      </option>
                      <option key={3} value="mrs">
                        Mrs.
                      </option>
                      <option key={4} value="miss">
                        Miss
                      </option>
                      <option key={5} value="ms">
                        Ms.
                      </option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please provide title.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={8}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label className={css.labelChange}>
                      Contact Person Name :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      isInvalid={showErrorAlert && errors.name}
                      style={{ borderRadius: "2px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="number">
                    <Form.Label className={css.labelChange}>
                      Contact Number:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="number"
                      value={formValues.number}
                      onChange={handleChange}
                      isInvalid={showErrorAlert && errors.number}
                      style={{ borderRadius: "2px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className={css.labelChange}>
                      Email Address :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      isInvalid={showErrorAlert && errors.email}
                      style={{ borderRadius: "2px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="designation">
                  <Form.Label className={css.labelChange}>
                    Designation :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={formValues.designation}
                    onChange={handleChange}
                    isInvalid={showErrorAlert && errors.designation}
                    style={{ borderRadius: "2px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid designation name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Button
                className={`${css.customButton} mb-5`}
                variant="primary"
                onClick={handleAdd}
                disabled={
                  employerCompanyState.companyUpdateLoading ||
                  employerCompanyState.companySaveLoading
                }
              >
                + Add New
              </Button>

              <Row>
                <Col sm={12}>
                  <Table striped bordered hover>
                    <thead className={css.table}>
                      <tr>
                        <th>Contact Person</th>
                        <th>Contact No.</th>
                        <th>Email</th>
                        <th>Designation</th>

                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody className={css.tableBody}>
                      {contactArray.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.name}</td>
                          <td>{entry.number}</td>
                          <td>{entry.email}</td>
                          <td>{entry.designation}</td>
                          <td>
                            <Button
                              type="button"
                              className={css.removeButton}
                              onClick={() => handleRemove(index)}
                              disabled={
                                employerCompanyState.companyUpdateLoading ||
                                employerCompanyState.companySaveLoading
                              }
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
              <div className="d-flex justify-content-end  mt-5">
                <Button
                  variant="secondary"
                  className="mx-3"
                  type="button"
                  onClick={navigateToDashboard}
                  disabled={
                    employerCompanyState.companyUpdateLoading ||
                    employerCompanyState.companySaveLoading
                  }
                >
                  Cancel
                </Button>

                {isFormChanged ? (
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={
                      employerCompanyState.companyUpdateLoading ||
                      employerCompanyState.companySaveLoading ||
                      (errors && Object.keys(errors).length > 0)
                    }
                  >
                    {employerCompanyState.companyUpdateLoading ||
                    employerCompanyState.companySaveLoading
                      ? "Saving..."
                      : "Save & Next"}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={nextTab}
                    disabled={
                      employerCompanyState.companyUpdateLoading ||
                      employerCompanyState.companySaveLoading ||
                      (errors && Object.keys(errors).length > 0)
                    }
                  >
                    {"Next"}
                  </Button>
                )}
              </div>
            </Col>
          </Form>
        </>
      )}
    </>
  );
};

export default EmployerCompanyContact;
