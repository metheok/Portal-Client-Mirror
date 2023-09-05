import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from "./JobApplyContainer.module.css";

export default function BasicDetails({
  formData,

  handleFormChange,
  errorMessages,

  jobseekerJobApplyState,

  showErrorAlert,
  loading,

  user,
  profile,
  onFillFromUser,
}) {
  return (
    <Form style={{ padding: "1rem 2.5rem 0", backgroundColor: "white" }}>
      <Col sm={{ span: 10, offset: 0 }}>
        <Row className={`mb-1 mt-1`}>
          <h2 className={css.title}>Basic Details</h2>
        </Row>
        {user?.email && profile && (
          <Row className="mb-3 px-3">
            <button
              className={`btn btn-secondary ${css.prefillButton}`}
              type="button"
              disabled={loading}
              onClick={(e) => {
                onFillFromUser();
              }}
            >
              Prefill from my profile{" "}
            </button>
          </Row>
        )}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label className={css.labelChange}>Full Name :</Form.Label>

              <Form.Control
                type="text"
                name="name"
                required
                disabled
                value={formData.name}
                onChange={handleFormChange}
                style={{ borderRadius: "2px" }}
              />

              {showErrorAlert && errorMessages.name && (
                <Form.Text className="text-danger">
                  {errorMessages.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label className={css.labelChange}>Email Id :</Form.Label>

              <Form.Control
                type="email"
                name="email"
                required
                value={formData.email}
                disabled
                onChange={handleFormChange}
                style={{ borderRadius: "2px" }}
              />

              {showErrorAlert && errorMessages.email && (
                <Form.Text className="text-danger">
                  {errorMessages.email}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label className={css.labelChange}>
                Contact Number :
              </Form.Label>

              <Form.Control
                type="text"
                name="contact"
                required
                value={formData.contact}
                disabled
                onChange={handleFormChange}
                style={{ borderRadius: "2px" }}
              />

              {showErrorAlert && errorMessages.contact && (
                <Form.Text className="text-danger">
                  {errorMessages.contact}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 px-3"></Row>
        {user?.email && profile && (
          <Row className="mb-3 px-3">
            <button
              className={`btn btn-secondary ${css.prefillButton}`}
              type="button"
              disabled={loading}
              onClick={(e) => {
                onFillFromUser();
              }}
            >
              Prefill from my profile{" "}
            </button>
          </Row>
        )}
      </Col>
    </Form>
  );
}
