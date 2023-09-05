import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./CandidateAdditional.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";
import { cloneDeep, isEqual } from "lodash";
import moment from "moment";

const CandidateAdditional = ({
  dispatch,
  clearErrors,
  formValues,
  setFormValues,
  nextTab,
  previousTab,
  recruiterCandidateState,
}) => {
  const { recruiterCandidateCreateLoading } = recruiterCandidateState;

  const [formData, setFormData] = useState({});

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(clearErrors());

    // Handle radio button inputs separately
    if (type === "radio") {
      // Convert the value to a boolean
      const radioValue = value === "true";
      setFormData({ ...formData, [name]: radioValue });
      setFormValues({ ...formValues, [name]: radioValue });
      // If the passport radio button is set to "No," empty the passport validity input field
      if (name === "passport" && !radioValue) {
        setFormData((prevState) => ({
          ...prevState,
          validityPassport: "",
        }));
        setFormValues((prevState) => ({
          ...prevState,
          validityPassport: "",
        }));
      }

      return;
    } else {
      let newErrors = { ...validationErrors };
      switch (name) {
        case "minimumCtc":
          newErrors.minimumCtc = value
            ? value > 0
              ? null
              : "minimum CTC should be greater than 0"
            : "minimumCtc is required.";
          if (!newErrors.minimumCtc) {
            delete newErrors.minimumCtc;
          }

          break;
        case "currentCtc":
          newErrors.currentCtc = value
            ? value >= 0
              ? null
              : "current CTC should be greater than 0"
            : "currentCtc is required.";
          if (!newErrors.currentCtc) {
            delete newErrors.currentCtc;
          }

          break;
        case "validityPassport":
          newErrors.validityPassport = !moment(value, "MM/YYYY").isValid()
            ? "Invalid date format. Please use mm/yyyy."
            : null;
          if (!newErrors.validityPassport) {
            newErrors = validationErrors;
            delete newErrors.validityPassport;
          }
          break;

        default:
          break;
      }
      setValidationErrors(newErrors);

      setFormData({ ...formData, [name]: value });
      setFormValues({ ...formValues, [name]: value });
    }
  };

  if (recruiterCandidateCreateLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div style={{ paddingLeft: "2.5rem" }} className="mt-4">
      <Form style={{ backgroundColor: "white" }}>
        <Col md={{ span: 10, offset: 0 }}>
          <Form.Group className="mb-4" controlId="openToRelocate">
            <div className="d-flex justify-content-start">
              <Col sm={7}>
                <Form.Label className={css.labelChange}>
                  Open to relocate :
                </Form.Label>
              </Col>

              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToRelocate"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToRelocate"
                  value={true}
                  checked={formData.openToRelocate === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToRelocate"
                  className={`${css.labelChange} `}
                  label="No"
                  name="openToRelocate"
                  value={false}
                  checked={formData.openToRelocate === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="openToRemoteWork">
            <div className="d-flex justify-content-start">
              <Col sm={7}>
                <Form.Label className={css.labelChange}>
                  Open for remote work :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToRemoteWork"
                  className={`${css.labelChange} `}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToRemoteWork"
                  value={true}
                  checked={formData.openToRemoteWork === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToRemoteWork"
                  className={`${css.labelChange} `}
                  label="No"
                  name="openToRemoteWork"
                  value={false}
                  checked={formData.openToRemoteWork === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="openToBringYourOwnDevice">
            <div className="d-flex justify-content-start">
              <Col sm={7}>
                <Form.Label className={css.labelChange}>
                  Open to bring your own device :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToBringYourOwnDevice"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToBringYourOwnDevice"
                  value={true}
                  checked={formData.openToBringYourOwnDevice === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToBringYourOwnDevice"
                  className={`${css.labelChange}`}
                  label="No"
                  name="openToBringYourOwnDevice"
                  value={false}
                  checked={formData.openToBringYourOwnDevice === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="currentCtc">
                <Form.Label className={css.labelChange}>
                  CTC - Current CTC:
                </Form.Label>
                <Form.Control
                  type="number"
                  name="currentCtc"
                  value={formData.currentCtc}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {validationErrors.currentCtc && (
                  <Form.Text className="text-danger">
                    {validationErrors.currentCtc}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="minimumCtc">
                <Form.Label className={css.labelChange}>
                  Minimum Acceptable CTC:
                </Form.Label>
                <Form.Control
                  type="number"
                  name="minimumCtc"
                  value={formData.minimumCtc}
                  onChange={handleChange}
                  style={{ borderRadius: "2px" }}
                />
                {validationErrors.minimumCtc && (
                  <Form.Text className="text-danger">
                    {validationErrors.minimumCtc}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="openToShift">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>
                  Open for shift :
                </Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="openToShift"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="openToShift"
                  value={true}
                  checked={formData.openToShift === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="openToShift"
                  className={`${css.labelChange}`}
                  label="No"
                  name="openToShift"
                  value={false}
                  checked={formData.openToShift === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="passport">
            <div className="d-flex justify-content-start">
              <Col sm={8}>
                <Form.Label className={css.labelChange}>Passport :</Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form.Check
                  type="radio"
                  id="passport"
                  className={`${css.labelChange}`}
                  style={{ marginRight: "1rem" }}
                  label="Yes"
                  name="passport"
                  value={true}
                  checked={formData.passport === true}
                  onChange={handleChange}
                />

                <Form.Check
                  type="radio"
                  id="passport"
                  className={`${css.labelChange}`}
                  label="No"
                  name="passport"
                  value={false}
                  checked={formData.passport === false}
                  onChange={handleChange}
                />
              </Col>
            </div>
          </Form.Group>

          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="validityPassport">
                <Form.Label className={css.labelChange}>
                  Validity if Yes:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="mm/yyyy"
                  value={formData.validityPassport}
                  name="validityPassport"
                  onChange={handleChange}
                  disabled={!formData.passport}
                  //isInvalid={}  Apply isInvalid class based on dobIsValid state
                  required
                  style={{ borderRadius: "2px" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide date of Joining.
                </Form.Control.Feedback>
                {validationErrors.validityPassport && (
                  <Form.Text className="text-danger">
                    {validationErrors.validityPassport}
                  </Form.Text>
                )}
              </Form.Group>
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
              !(
                formValues.openToRelocate === true ||
                formValues.openToRelocate === false
              ) ||
              !(
                formValues.openToRemoteWork === true ||
                formValues.openToRemoteWork === false
              ) ||
              !(
                formValues.openToBringYourOwnDevice === true ||
                formValues.openToBringYourOwnDevice === false
              ) ||
              !(
                typeof formValues.currentCtc == "string" &&
                formValues.currentCtc.length > 0
              ) ||
              !(
                typeof formValues.minimumCtc == "string" &&
                formValues.minimumCtc.length > 0
              ) ||
              !(
                formValues.passport === true || formValues.passport === false
              ) ||
              (formValues.passport === true && !formValues.validityPassport) ||
              (validationErrors && Object.keys(validationErrors).length > 0)
            }
            onClick={nextTab}
          >
            {" Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CandidateAdditional;
