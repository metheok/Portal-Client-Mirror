import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from "./CandidateContact.module.css";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

const CandidateContact = ({
  dispatch,
  createCandidate,
  clearErrors,
  formValues,
  recruiterCandidateState,
  setFormValues,
  nextTab,
  previousTab,
  navigate,
}) => {
  const { user, profileLoading } = useSelector((state) => state.user);
  const {
    recruiterCandidateCreateLoading,
    recruiterCandidateCreateSuccess,
    recruiterCandidateCreateError,
  } = recruiterCandidateState;
  const [formData, setFormData] = useState({});

  const [validationErrors, setValidationErrors] = useState({});

  const changeHandle = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    let errors = { ...validationErrors };
    switch (name) {
      case "contact":
        const contactRegex = /^\d{10,14}$/;
        const isValidContact = contactRegex.test(value);

        errors = {
          ...errors,
          ...{ contact: isValidContact ? "" : "Invalid contact format" },
        };
        if (isValidContact) {
          delete errors.contact;
        }
        break;
      case "alternateNo":
        const alternateNoRegex = /^\d{10,15}$/;
        const isValidAlternateNo =
          value && value.length > 0 ? alternateNoRegex.test(value) : true;
        errors = {
          ...errors,
          ...{
            alternateNo: isValidAlternateNo ? "" : "Invalid contact format",
          },
        };
        if (isValidAlternateNo) {
          delete errors.alternateNo;
        }
        break;
      default:
        break;
    }
    setValidationErrors({
      ...errors,
    });
    setFormData({ ...formData, [name]: value });
    setFormValues({
      ...formValues,
      contactDetails: { ...formValues.contactDetails, [name]: value },
    });
  };

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      style={{ paddingLeft: "2.5rem" }}
      sm={{ span: 6, offset: 2 }}
      className="mt-5"
    >
      {recruiterCandidateCreateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {recruiterCandidateCreateError && (
        <ErrorAlert message={"Error in creating a candidate"} />
      )}

      <Form style={{ backgroundColor: "white" }}>
        <Col sm={{ span: 8, offset: 1 }}>
          <Form.Group className="mb-3" controlId="currentCity">
            <Form.Label className={css.labelChange}>Current City:</Form.Label>
            <Form.Control
              type="text"
              name="currentCity"
              value={formValues.currentCity}
              required
              style={{ borderRadius: "2px" }}
              disabled
            />
            {validationErrors.currentCity && (
              <Form.Text className="text-danger">
                {validationErrors.currentCity}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className={css.labelChange}>Email :</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formValues.email}
              style={{ borderRadius: "2px" }}
              required
              disabled
            />
            {validationErrors.email && (
              <Form.Text className="text-danger">
                {validationErrors.email}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="contact">
            <Form.Label className={css.labelChange}>Contact No:</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.contact}
              onChange={changeHandle}
              isInvalid={!!validationErrors.contact}
              required
              style={{ borderRadius: "2px" }}
            />
            {validationErrors.contact && (
              <Form.Text className="text-danger">
                {validationErrors.contact}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="alternateNo">
            <Form.Label className={css.labelChange}>Alternate No:</Form.Label>
            <Form.Control
              type="text"
              name="alternateNo"
              value={formData.alternateNo}
              onChange={changeHandle}
              isInvalid={!!validationErrors.alternateNo}
              style={{ borderRadius: "2px" }}
            />
            {validationErrors.alternateNo && (
              <Form.Text className="text-danger">
                {validationErrors.alternateNo}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <div className="d-flex justify-content-end  mt-5">
          <Button
            variant="secondary"
            className="mx-3"
            type="button"
            onClick={previousTab}
            disabled={
              (validationErrors && Object.keys(validationErrors).length > 0) ||
              recruiterCandidateCreateLoading
            }
          >
            {"Previous"}
          </Button>

          <Button
            disabled={
              !formValues?.contactDetails?.contact ||
              (validationErrors && Object.keys(validationErrors).length > 0) ||
              recruiterCandidateCreateLoading
            }
            type="button"
            variant="primary"
            onClick={() => createCandidate(formValues)}
            style={{ width: "6rem" }}
            className="d-inline"
          >
            {"Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CandidateContact;
