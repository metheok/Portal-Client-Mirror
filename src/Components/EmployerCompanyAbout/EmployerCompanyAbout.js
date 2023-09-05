import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from "./EmployerCompanyAbout.module.css";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { cloneDeep, isEqual } from "lodash";
import { BsPencil } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import OnScreenMenu from "../OnScreenMenu/OnScreenMenu";
import { right } from "@popperjs/core";

const EmployerCompanyAbout = ({
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
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);
  const [errors, setErrors] = useState({});
  const [mobileEdit, setMobileEdit] = useState(false);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (
      employerCompanyState.companySaveError ||
      employerCompanyState.companyUpdateError
    ) {
      setFormValues(initialValues);
    }
  }, [
    employerCompanyState.companyUpdateError,
    employerCompanyState.companySaveError,
    initialValues,
  ]);

  React.useEffect(() => {
    if (
      isMobile !== true &&
      (employerCompanyState.companySaveSuccess ||
        employerCompanyState.companyUpdateSuccess)
    ) {
      nextTab();
    }
  }, [
    employerCompanyState.companyUpdateSuccess,
    employerCompanyState.companySaveSuccess,
    nextTab,
    isMobile,
  ]);

  React.useEffect(() => {
    const values = {
      companyName: companyData?.companyName,
      industry: companyData?.industry,
      description: companyData?.description,
      website: companyData?.website,
      employeeStrength: companyData?.employeeStrength,
    };
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [companyData]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleMobileEdit = () => {
    setMobileEdit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearForm());
    setShowErrorAlert(false);

    // Validation logic goes here
    let newErrors = { ...errors };
    switch (name) {
      case "companyName":
        newErrors.companyName =
          value.trim() === "" ? "Company name is required." : null;
        if (!newErrors.companyName) {
          delete newErrors.companyName;
        }

        break;
      case "industry":
        newErrors.industry =
          value.trim() === "" ? "Industry name is required." : null;
        if (!newErrors.industry) {
          delete newErrors.industry;
        }

        break;
      case "website":
        const urlRGX =
          /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
        if (value && value.trim()) {
          const test = urlRGX.test(value.trim());
          if (!test) {
            newErrors.website = "Website is invalid.";
            break;
          }
        } else {
          newErrors.website = "Website is required.";
          break;
        }
        delete newErrors.website;

        break;

      case "description":
        newErrors.description =
          value.trim() === "" ? "description name is required." : null;
        if (!newErrors.description) {
          delete newErrors.description;
        }
        break;

      case "employeeStrength":
        const rgx = /^\d+$/;
        const test = rgx.test(value);
        newErrors.employeeStrength = !value
          ? "Employee Strength is required."
          : !test
          ? "Employee Strength should be a whole number"
          : null;

        if (!newErrors.employeeStrength) {
          delete newErrors.employeeStrength;
        }
        break;

      default:
        break;
    }
    setErrors(newErrors); // Update the errors state with the new error messages

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      companyName: formValues.companyName
        ? String(formValues.companyName).trim()
        : null,
      industry: formValues.industry ? String(formValues.industry).trim() : null,
      description: formValues.description
        ? String(formValues.description).trim()
        : null,
      website: formValues.website ? String(formValues.website).trim() : null,
      employeeStrength: parseInt(formValues.employeeStrength),
    };

    if (Object.values(errors).some((error) => error !== null)) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }
    if (companyData) {
      updateEmployerCompany(formData);
    } else {
      createEmployerCompany(formData);
    }
  };

  const MobileHandleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      companyName: formValues.companyName
        ? String(formValues.companyName).trim()
        : null,
      industry: formValues.industry ? String(formValues.industry).trim() : null,
      description: formValues.description
        ? String(formValues.description).trim()
        : null,
      website: formValues.website ? String(formValues.website).trim() : null,
      employeeStrength: parseInt(formValues.employeeStrength),
    };

    if (Object.values(errors).some((error) => error !== null)) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }
    if (companyData) {
      updateEmployerCompany(formData);
    } else {
      createEmployerCompany(formData);
    }
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const cancelHandler = () => {
    setMobileEdit(false);
  };

  return (
    <>
      {isMobile ? (
        /* -------------- mobile View ----------- */
        <>
          <div className={`${css.companyContainer}`}>
            <Form
              style={{ backgroundColor: "white" }}
              onSubmit={MobileHandleSubmit}
            >
              {(employerCompanyState.companyUpdateSuccess ||
                employerCompanyState.companySaveSuccess) && (
                <SuccessAlert message="Data saved successfully!" />
              )}
              {showErrorAlert && <ErrorAlert message={errorMessage} />}
              {(employerCompanyState.companyUpdateError ||
                employerCompanyState.companySaveError) && (
                <ErrorAlert message={"Something went wrong"} />
              )}
              <Col sm={{ span: 10, offset: 0 }}>
                <Row className="mb-3">
                  <Col style={{ paddingRight: "0" }}>
                    <Form.Group controlId="companyName">
                      <Form.Label className={css.Label}>
                        Company Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={formValues.companyName}
                        onChange={handleChange}
                        style={{ borderRadius: "2px" }}
                        className={css.singleLine}
                        required
                      />

                      {errors.companyName && (
                        <Form.Text className="text-danger">
                          {errors.companyName}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col style={{ paddingRight: "0" }}>
                    <Form.Group controlId="industry">
                      <Form.Label className={css.Label}>Industry </Form.Label>

                      <Form.Control
                        type="text"
                        name="industry"
                        value={formValues.industry}
                        onChange={handleChange}
                        required
                        className={css.singleLine}
                      />

                      {errors.industry && (
                        <Form.Text className="text-danger">
                          {errors.industry}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col style={{ paddingRight: "0" }}>
                    <Form.Group controlId="description">
                      <Form.Label className={css.Label}>Description</Form.Label>

                      <Form.Control
                        type="text"
                        as="textarea"
                        rows={1}
                        name="description"
                        value={formValues.description}
                        className={css.singleLine}
                        onChange={handleChange}
                        required
                      />
                      {/*  <p className={css.BasicReadOnly}>{formValues.description} </p> */}

                      {errors.description && (
                        <Form.Text className="text-danger">
                          {errors.description}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col xs={12} className="mb-3" style={{ paddingRight: "0" }}>
                    <Form.Group controlId="website">
                      <Form.Label className={css.Label}>Website </Form.Label>
                      <Form.Control
                        type="text"
                        name="website"
                        value={formValues.website}
                        onChange={handleChange}
                        className={css.singleLine}
                        style={{ borderRadius: "2px" }}
                      />
                      {errors.website && (
                        <Form.Text className="text-danger">
                          {errors.website}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="mb-3" style={{ paddingRight: "0" }}>
                    <Form.Group controlId="employeeStrength">
                      <Form.Label className={css.Label}>
                        Employee Strength
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="employeeStrength"
                        value={formValues.employeeStrength}
                        onChange={handleChange}
                        className={css.singleLine}
                        required
                        style={{ borderRadius: "2px" }}
                      />
                      {errors.employeeStrength && (
                        <Form.Text className="text-danger">
                          {errors.employeeStrength}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              {/* {mobileEdit && (
                <div className="d-flex justify-content-end  mt-5">
                  <Button
                    variant="secondary"
                    className="mx-3"
                    type="button"
                    onClick={cancelHandler}
                    disabled={
                      employerCompanyState.companyUpdateLoading ||
                      employerCompanyState.companySaveLoading
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="primary"
                    className="mx-3"
                    type="submit"
                    disabled={
                      !isFormChanged ||
                      employerCompanyState.companyUpdateLoading ||
                      employerCompanyState.companySaveLoading ||
                      (errors && Object.keys(errors).length > 0)
                    }
                  >
                    {employerCompanyState.companyUpdateLoading ||
                    employerCompanyState.companySaveLoading
                      ? "Saving..."
                      : "Save"}
                  </Button>
                </div>
              )} */}
              <div className="d-flex justify-content-end  mt-5">
                <Button
                  variant="secondary"
                  className="mx-4"
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
          </div>
        </>
      ) : (
        /* -------------- Desktop View ----------- */
        <>
          <Form
            style={{ padding: "1rem 0rem", backgroundColor: "white" }}
            onSubmit={handleSubmit}
          >
            {(employerCompanyState.companyUpdateSuccess ||
              employerCompanyState.companySaveSuccess) && (
              <SuccessAlert message="Data saved successfully!" />
            )}
            {showErrorAlert && <ErrorAlert message={errorMessage} />}
            {(employerCompanyState.companyUpdateError ||
              employerCompanyState.companySaveError) && (
              <ErrorAlert message={"Something went wrong"} />
            )}

            <Col sm={{ span: 10, offset: 0 }}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="companyName">
                    <Form.Label className={css.labelChange}>
                      Company Name :
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="companyName"
                      value={formValues.companyName}
                      onChange={handleChange}
                      style={{ borderRadius: "2px" }}
                      required
                    />

                    {errors.companyName && (
                      <Form.Text className="text-danger">
                        {errors.companyName}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="industry">
                    <Form.Label className={css.labelChange}>
                      Industry :
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="industry"
                      value={formValues.industry}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "2px" }}
                    />

                    {errors.industry && (
                      <Form.Text className="text-danger">
                        {errors.industry}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="description">
                    <Form.Label className={css.labelChange}>
                      Description :
                    </Form.Label>

                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formValues.description}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "2px" }}
                    />

                    {errors.description && (
                      <Form.Text className="text-danger">
                        {errors.description}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <Form.Group controlId="website">
                    <Form.Label className={css.labelChange}>
                      Website :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="website"
                      value={formValues.website}
                      onChange={handleChange}
                      style={{ borderRadius: "2px" }}
                    />
                    {errors.website && (
                      <Form.Text className="text-danger">
                        {errors.website}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="employeeStrength">
                    <Form.Label className={css.labelChange}>
                      Employee Strength :
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="employeeStrength"
                      value={formValues.employeeStrength}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "2px" }}
                    />
                    {errors.employeeStrength && (
                      <Form.Text className="text-danger">
                        {errors.employeeStrength}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end  mt-5">
                <Button
                  variant="secondary"
                  className="mx-4"
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

export default EmployerCompanyAbout;
