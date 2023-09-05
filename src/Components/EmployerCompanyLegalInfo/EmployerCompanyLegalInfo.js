import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from "./EmployerCompanyLegalInfo.module.css";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";
const EmployerCompanyLegalInfo = ({
  dispatch,
  companyData,
  createEmployerCompany,
  updateEmployerCompany,
  employerCompanyState,
  clearForm,
  nextTab,
  isMobile
}) => {
  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFromChanged] = useState(false);
  const [errors, setErrors] = useState({});

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
    const values = {
      companyType: companyData?.companyType,
      companyRegistrationNumber: companyData?.companyRegistrationNumber,
      companyYearOfRegistration: companyData?.companyYearOfRegistration,
      companyGst: companyData?.companyGst,
      companyLastYearTurnover: companyData?.companyLastYearTurnover,
      registeredAddressLine1: companyData?.registeredAddressLine1,
      registeredAddressLine2: companyData?.registeredAddressLine2,
      registeredAddressCountry: companyData?.registeredAddressCountry,
      registeredAddressCity: companyData?.registeredAddressCity,
      registeredAddressPin: companyData?.registeredAddressPin,
      registeredAddressState: companyData?.registeredAddressState,
    };
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [companyData]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearForm());
    setShowErrorAlert(false);

    // Validation logic goes here
    let newErrors = { ...errors };
    switch (name) {
      case "registeredAddressCountry":
        newErrors.registeredAddressCountry =
          value.trim() === "" ? "Country is required." : null;
        if (!newErrors.registeredAddressCountry) {
          delete newErrors.registeredAddressCountry;
        }

        break;
      case "registeredAddressLine1":
        newErrors.registeredAddressLine1 =
          value.trim().length > 150 ? "Address too long" : null;
        if (!newErrors.registeredAddressLine1) {
          delete newErrors.registeredAddressLine1;
        }

        break;
      case "registeredAddressLine2":
        newErrors.registeredAddressLine2 =
          value.trim().length > 150 ? "Address too long" : null;
        if (!newErrors.registeredAddressLine2) {
          delete newErrors.registeredAddressLine2;
        }

        break;
      case "registeredAddressCity":
        newErrors.registeredAddressCity =
          value.trim().length > 100 ? "City too long" : null;
        if (!newErrors.registeredAddressCity) {
          delete newErrors.registeredAddressCity;
        }

        break;

      case "registeredAddressState":
        newErrors.registeredAddressState =
          value.trim().length > 100 ? "State too long" : null;
        if (!newErrors.registeredAddressState) {
          delete newErrors.registeredAddressState;
        }

        break;
      case "registeredAddressPin":
        newErrors.registeredAddressPin =
          value.trim().length > 50 ? "Pin too long" : null;
        if (!newErrors.registeredAddressPin) {
          delete newErrors.registeredAddressPin;
        }

        break;
      case "companyType":
        newErrors.companyType =
          value.trim() === "" ? "Company type is required." : null;
        if (!newErrors.companyType) {
          delete newErrors.companyType;
        }

        break;
      case "companyYearOfRegistration":
        const currentYear = moment().year();
        const yearValue = moment(value, "YYYY");
        const year = parseInt(value, 10);
        const rgxYear = /^\d+$/;
        const testYear = rgxYear.test(value);
        if (
          value &&
          (!yearValue.isValid() ||
            !testYear ||
            year < 1800 ||
            year > currentYear)
        ) {
          newErrors[name] =
            "Invalid year format or year out of range (1800 - current year).";
        } else {
          delete newErrors.companyYearOfRegistration;
        }
        break;
      case "companyRegistrationNumber":
        const rgxNo = /^[a-zA-Z0-9]{4,60}$/;
        const testNo = rgxNo.test(value);
        newErrors.companyRegistrationNumber =
          value && !testNo ? "Registration no. format invalid" : null;

        if (!newErrors.companyRegistrationNumber) {
          delete newErrors.companyRegistrationNumber;
        }
        break;
      case "companyGst":
        const rgxGST = /^[a-zA-Z0-9]{4,60}$/;
        const testGST = rgxGST.test(value);
        newErrors.companyGst =
          value && !testGST ? "Registration no. format invalid" : null;

        if (!newErrors.companyGst) {
          delete newErrors.companyGst;
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
      companyType: formValues?.companyType,
      companyRegistrationNumber: formValues?.companyRegistrationNumber
        ? String(formValues?.companyRegistrationNumber).trim()
        : "",
      companyYearOfRegistration: formValues?.companyYearOfRegistration
        ? parseInt(formValues?.companyYearOfRegistration)
        : null,
      companyGst: formValues?.companyGst
        ? String(formValues?.companyGst).trim()
        : "",
      companyLastYearTurnover: formValues?.companyLastYearTurnover
        ? String(formValues?.companyLastYearTurnover)
        : "",
      registeredAddressLine1: formValues?.registeredAddressLine1
        ? String(formValues?.registeredAddressLine1).trim()
        : "",
      registeredAddressLine2: formValues?.registeredAddressLine2
        ? String(formValues?.registeredAddressLine2).trim()
        : "",
      registeredAddressCountry: formValues?.registeredAddressCountry
        ? String(formValues?.registeredAddressCountry).trim()
        : "",
      registeredAddressCity: formValues?.registeredAddressCity
        ? String(formValues?.registeredAddressCity).trim()
        : "",
      registeredAddressPin: formValues?.registeredAddressPin
        ? String(formValues?.registeredAddressPin).trim()
        : "",
      registeredAddressState: formValues?.registeredAddressState
        ? String(formValues?.registeredAddressState).trim()
        : "",
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

  const mobileView = () => {
    return (
      <Form
        style={{ backgroundColor: "white" }}
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


          <Form.Group controlId="companyType" className="mb-3">
            <Form.Label className={css.Label}>
              Company Type :
            </Form.Label>
            <Form.Select
              name="companyType"
              value={formValues.companyType}
              onChange={handleChange}
              className={` ${css.singleLine} custom-select`}
              style={{ borderRadius: "2px" }}
              required
            >
              <option key={1} value="">
                Select
              </option>
              <option key={2} value="soleProprietorship">
                Sole Proprietorship
              </option>
              <option key={3} value="privateLimited">
                Private Limited
              </option>
              <option key={4} value="publicLimited">
                Private Limited
              </option>
              <option key={5} value="partnershipFirm">
                Partnership Firm
              </option>
              <option key={6} value="notForProfitOrganization">
                Not-For-Profit Organization
              </option>
              <option key={7} value="one-PersonCompany">
                One-Person Company
              </option>
              <option key={8} value="limitedLiabilityPartnership">
                Limited Liability Partnership
              </option>
            </Form.Select>
            {errors.companyType && (
              <Form.Text className="text-danger">
                {errors.companyType}
              </Form.Text>
            )}
          </Form.Group>


          <Form.Group controlId="companyRegistrationNumber" className="mb-3">
            <Form.Label className={css.Label}>
              Registration Number
            </Form.Label>
            <Form.Control
              type="text"
              name="companyRegistrationNumber"
              value={formValues.companyRegistrationNumber}
              className={css.singleLine}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.companyRegistrationNumber && (
              <Form.Text className="text-danger">
                {errors.companyRegistrationNumber}
              </Form.Text>
            )}
          </Form.Group>


          <Form.Group controlId="companyYearOfRegistration" className="mb-3">
            <Form.Label className={css.Label}>
              Year Of Registration
            </Form.Label>
            <Form.Control
              type="number"
              name="companyYearOfRegistration"
              className={css.singleLine}
              value={formValues.companyYearOfRegistration}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.companyYearOfRegistration && (
              <Form.Text className="text-danger">
                {errors.companyYearOfRegistration}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="companyGst">
            <Form.Label className={css.Label}>
              TIN/GSTIN Number
            </Form.Label>
            <Form.Control
              type="text"
              name="companyGst"
              className={css.singleLine}
              value={formValues.companyGst}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.companyGst && (
              <Form.Text className="text-danger">
                {errors.companyGst}
              </Form.Text>
            )}
          </Form.Group>

          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }}>
              <Form.Group controlId="companyLastYearTurnover" className="mb-3">
                <Form.Label className={css.Label}>
                  Last FY Turnover <span style={{ fontWeight: '300' }}>(Approx. figures)</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="companyLastYearTurnover"
                  placeholder="In INR"
                  className={css.singleLine}
                  value={formValues.companyLastYearTurnover}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.companyLastYearTurnover && (
                  <Form.Text className="text-danger">
                    {errors.companyLastYearTurnover}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <p className={css.heading}> Registration Address</p>

          <Form.Group controlId="registeredAddressLine1" className="mb-3">
            <Form.Label className={css.Label}>
              Address Line 1
            </Form.Label>
            <Form.Control
              type="text"
              name="registeredAddressLine1"
              value={formValues.registeredAddressLine1}
              className={css.singleLine}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.registeredAddressLine1 && (
              <Form.Text className="text-danger">
                {errors.registeredAddressLine1}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registeredAddressLine2" className="mb-3">
            <Form.Label className={css.Label}>
              Address Line 2
            </Form.Label>
            <Form.Control
              type="number"
              name="registeredAddressLine2"
              value={formValues.registeredAddressLine2}
              className={css.singleLine}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.registeredAddressLine2 && (
              <Form.Text className="text-danger">
                {errors.registeredAddressLine2}
              </Form.Text>
            )}
          </Form.Group>


          <Form.Group controlId="registeredAddressCountry" className="mb-3">
            <Form.Label className={css.Label}>Country </Form.Label>
            <Form.Control
              type="text"
              name="registeredAddressCountry"
              value={formValues.registeredAddressCountry}
              className={css.singleLine}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
              required
            />
            {errors.registeredAddressCountry && (
              <Form.Text className="text-danger">
                {errors.registeredAddressCountry}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registeredAddressCity" className="mb-3">
            <Form.Label className={css.Label}>City </Form.Label>
            <Form.Control
              type="number"
              name="registeredAddressCity"
              value={formValues.registeredAddressCity}
              className={css.singleLine}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.registeredAddressCity && (
              <Form.Text className="text-danger">
                {errors.registeredAddressCity}
              </Form.Text>
            )}
          </Form.Group>


          <Form.Group controlId="registeredAddressPin" className="mb-3">
            <Form.Label className={css.Label}>Pin Code </Form.Label>
            <Form.Control
              type="text"
              name="registeredAddressPin"
              value={formValues.registeredAddressPin}
              className={css.singleLine}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.registeredAddressPin && (
              <Form.Text className="text-danger">
                {errors.registeredAddressPin}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registeredAddressState" className="mb-3">
            <Form.Label className={css.Label}>State </Form.Label>
            <Form.Control
              type="number"
              name="registeredAddressState"
              value={formValues.registeredAddressState}
              className={css.singleLine}
              onChange={handleChange}
              style={{ borderRadius: "2px" }}
            />
            {errors.registeredAddressState && (
              <Form.Text className="text-danger">
                {errors.registeredAddressState}
              </Form.Text>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end  mt-5 mb-5">
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
    )
  }

  const deskTopView = () => {
    return (
      <Form
        style={{ padding: "1rem 0rem ", backgroundColor: "white" }}
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
          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }}>
              <Form.Group controlId="companyType">
                <Form.Label className={css.labelChange}>
                  Company Type :
                </Form.Label>
                <Form.Select
                  name="companyType"
                  value={formValues.companyType}
                  onChange={handleChange}
                  className="custom-select"
                  style={{ borderRadius: "2px" }}
                  required
                >
                  <option key={1} value="">
                    Select
                  </option>
                  <option key={2} value="soleProprietorship">
                    Sole Proprietorship
                  </option>
                  <option key={3} value="privateLimited">
                    Private Limited
                  </option>
                  <option key={4} value="publicLimited">
                    Private Limited
                  </option>
                  <option key={5} value="partnershipFirm">
                    Partnership Firm
                  </option>
                  <option key={6} value="notForProfitOrganization">
                    Not-For-Profit Organization
                  </option>
                  <option key={7} value="one-PersonCompany">
                    One-Person Company
                  </option>
                  <option key={8} value="limitedLiabilityPartnership">
                    Limited Liability Partnership
                  </option>
                </Form.Select>
                {errors.companyType && (
                  <Form.Text className="text-danger">
                    {errors.companyType}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="companyRegistrationNumber">
                <Form.Label className={css.labelChange}>
                  Registration Number :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="companyRegistrationNumber"
                  value={formValues.companyRegistrationNumber}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.companyRegistrationNumber && (
                  <Form.Text className="text-danger">
                    {errors.companyRegistrationNumber}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }}>
              <Form.Group controlId="companyYearOfRegistration">
                <Form.Label className={css.labelChange}>
                  Year Of Registration :
                </Form.Label>
                <Form.Control
                  type="number"
                  name="companyYearOfRegistration"
                  value={formValues.companyYearOfRegistration}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.companyYearOfRegistration && (
                  <Form.Text className="text-danger">
                    {errors.companyYearOfRegistration}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="companyGst">
                <Form.Label className={css.labelChange}>
                  TIN/GSTIN Number :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="companyGst"
                  value={formValues.companyGst}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.companyGst && (
                  <Form.Text className="text-danger">
                    {errors.companyGst}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }} sm={6}>
              <Form.Group controlId="companyLastYearTurnover">
                <Form.Label className={css.labelChange}>
                  Last FY Turnover :
                </Form.Label>
                <Form.Control
                  type="number"
                  name="companyLastYearTurnover"
                  placeholder="In INR"
                  value={formValues.companyLastYearTurnover}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.companyLastYearTurnover && (
                  <Form.Text className="text-danger">
                    {errors.companyLastYearTurnover}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <p className={css.heading}> Registration Address</p>
          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }}>
              <Form.Group controlId="registeredAddressLine1">
                <Form.Label className={css.labelChange}>
                  Address Line 1 :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="registeredAddressLine1"
                  value={formValues.registeredAddressLine1}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.registeredAddressLine1 && (
                  <Form.Text className="text-danger">
                    {errors.registeredAddressLine1}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="registeredAddressLine2">
                <Form.Label className={css.labelChange}>
                  Address Line 2 :
                </Form.Label>
                <Form.Control
                  type="number"
                  name="registeredAddressLine2"
                  value={formValues.registeredAddressLine2}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.registeredAddressLine2 && (
                  <Form.Text className="text-danger">
                    {errors.registeredAddressLine2}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }}>
              <Form.Group controlId="registeredAddressCountry">
                <Form.Label className={css.labelChange}>Country :</Form.Label>
                <Form.Control
                  type="text"
                  name="registeredAddressCountry"
                  value={formValues.registeredAddressCountry}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                  required
                />
                {errors.registeredAddressCountry && (
                  <Form.Text className="text-danger">
                    {errors.registeredAddressCountry}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="registeredAddressCity">
                <Form.Label className={css.labelChange}>City :</Form.Label>
                <Form.Control
                  type="number"
                  name="registeredAddressCity"
                  value={formValues.registeredAddressCity}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.registeredAddressCity && (
                  <Form.Text className="text-danger">
                    {errors.registeredAddressCity}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col style={{ paddingRight: "0" }}>
              <Form.Group controlId="registeredAddressPin">
                <Form.Label className={css.labelChange}>Pin Code :</Form.Label>
                <Form.Control
                  type="text"
                  name="registeredAddressPin"
                  value={formValues.registeredAddressPin}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.registeredAddressPin && (
                  <Form.Text className="text-danger">
                    {errors.registeredAddressPin}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="registeredAddressState">
                <Form.Label className={css.labelChange}>State :</Form.Label>
                <Form.Control
                  type="number"
                  name="registeredAddressState"
                  value={formValues.registeredAddressState}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {errors.registeredAddressState && (
                  <Form.Text className="text-danger">
                    {errors.registeredAddressState}
                  </Form.Text>
                )}
              </Form.Group>
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
    )
  }


  return (
    <>
      {isMobile ? (<>{mobileView()}</>) : (<>{deskTopView()}</>)}
    </>
  );
};

export default EmployerCompanyLegalInfo;
