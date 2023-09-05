import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import css from "./RecruiterBankDetails.module.css";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { clone, cloneDeep, isEqual } from "lodash";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const RecruiterBankDetails = ({
  recruiterProfileUpdate,
  dispatch,
  clearErrors,
  navigate,
  key,
}) => {
  const {
    user,
    profileLoading,
    profileUpdateLoading,
    profileUpdateSuccess,
    profileUpdateError,
  } = useSelector((state) => state.user);

  const [initialValues, setInitialValues] = useState({});

  const [editingField, setEditingField] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);

  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [isFormChanged, setIsFromChanged] = useState(false);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);

  React.useEffect(() => {
    if (profileUpdateSuccess && formSubmitSuccess) {
      setFormSubmitSuccess(false);

      navigate("/dashboard/profile/contact");

      return;
    }
  }, [profileUpdateSuccess, navigate, formSubmitSuccess]);
  React.useEffect(() => {
    const values = {
      accountHolderName: user?.profile?.bank?.accountHolderName,
      bankName: user?.profile?.bank?.bankName,
      accountNumber: user?.profile?.bank?.accountNumber,
      ifsc: user?.profile?.bank?.ifsc,
      upi: user?.profile?.bank?.upi,
      referredId: user.profile.referredId,
    };
    // Deep copy the received values and set to state
    const copiedValues = cloneDeep(values);
    setInitialValues(copiedValues);
    setFormValues(copiedValues);
  }, [user]);

  React.useEffect(() => {
    setIsFromChanged(!isEqual(formValues, initialValues));
  }, [formValues, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    setShowErrorAlert(false);
    switch (name) {
      case "accountHolderName":
        setFormValues({ ...formValues, accountHolderName: value });
        break;
      case "bankName":
        setFormValues({ ...formValues, bankName: value });
        break;
      case "accountNumber":
        setFormValues({ ...formValues, accountNumber: value });
        break;
      case "ifsc":
        setFormValues({ ...formValues, ifsc: value });
        break;
      case "upi":
        setFormValues({ ...formValues, upi: value });
        break;
      case "referredId":
        setFormValues({ ...formValues, referredId: value });
        break;
      default:
        break;
    }
  };

  const handleEdit = (fieldName) => {
    dispatch(clearErrors());

    setEditingField(fieldName);
  };

  const handleSave = (fieldName) => {
    const errors = clone(validationErrors);
    switch (fieldName) {
      case "accountHolderName":
        if (!formValues.accountHolderName) {
          errors.accountHolderName = "Please enter account holder name";
          break;
        } else if (formValues.accountHolderName) {
          const rgx = /^[A-Za-z]{5,100}$/;
          const test = rgx.test(formValues.accountHolderName);
          if (!test) {
            errors.accountHolderName = "Please enter valid name";
            break;
          }
        }
        delete errors.accountHolderName;

        break;
      case "bankName":
        if (!formValues.bankName) {
          errors.bankName = "Please enter bank Name";
          break;
        } else if (formValues.bankName) {
          const rgx = /^[A-Za-z]{5,100}$/;
          const test = rgx.test(formValues.bankName);
          if (!test) {
            errors.bankName = "Please enter valid bank name";
            break;
          }
        }
        delete errors.bankName;

        break;
      case "accountNumber":
        if (!formValues.accountNumber) {
          errors.accountNumber = "Please enter account number";
          break;
        } else if (formValues.accountNumber) {
          const rgx = /^\d{5,100}$/;
          const test = rgx.test(formValues.accountNumber);
          if (!test) {
            errors.accountNumber = "Please enter valid account number";
            break;
          }
        }
        delete errors.accountNumber;

        break;
      case "ifsc":
        if (!formValues.ifsc) {
          errors.ifsc = "Please enter IFSC code";
          break;
        } else if (formValues.ifsc) {
          const rgx = /^[\w\.\-_]{3,}@[a-zA-Z]{3,}/;
          const test = rgx.test(formValues.ifsc);
          if (!test) {
            errors.ifsc = "Please enter valid IFSC code";
            break;
          }
        }
        delete errors.ifsc;

        break;
      case "upi":
        if (!formValues.upi) {
          errors.upi = "Please enter UPI code";
          break;
        } else if (formValues.upi) {
          const upiRgx = /^[\w\.\-_]{3,}@[a-zA-Z]{3,}/;
          const test = upiRgx.test(formValues.upi);
          if (!test) {
            errors.upi = "Please enter valid UPI code";
            break;
          }
        }
        delete errors.upi;

        break;
      default:
        break;
    }
    setValidationErrors(errors);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setFormValues(initialValues);
    setValidationErrors({});
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    const formData = {
      accountHolderName: formValues.accountHolderName,
      bankName: formValues.bankName,
      accountNumber: formValues.accountNumber,
      ifsc: formValues.ifsc,
      upi: formValues.upi,
    };
    // return;
    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setShowErrorAlert(true);
      setErrorMessage("Please fill in all the required fields correctly.");
      return;
    }

    try {
      await dispatch(recruiterProfileUpdate({ bank: formData }));
      setFormSubmitSuccess(true);
    } catch (error) {
      // Handle any errors that occur during form submission.
      console.error("Error submitting the form:", error);
      setShowErrorAlert(true);
      setErrorMessage("Failed to update profile. Please try again later.");
    }
  };

  const renderAccHolderNameField = () => (
    <Form.Group className="mb-4" as={Row} controlId="accountHolderName">
      <Form.Label column sm={3}>
        Account Holder Name
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "accountHolderName" ? (
          <Form.Control
            type="text"
            name="accountHolderName"
            value={formValues.accountHolderName}
            onChange={handleChange}
            isInvalid={validationErrors["accountHolderName"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.accountHolderName}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["accountHolderName"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "accountHolderName" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            disabled={profileUpdateLoading}
            type="button"
            onClick={() => handleSave("accountHolderName")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("accountHolderName")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderBankNameField = () => (
    <Form.Group className="mb-4" as={Row} controlId="bankName">
      <Form.Label column sm={3}>
        Bank Name
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "bankName" ? (
          <Form.Control
            type="text"
            name="bankName"
            value={formValues.bankName}
            onChange={handleChange}
            isInvalid={validationErrors["bankName"]}
            required
          />
        ) : (
          <Form.Control plaintext readOnly defaultValue={formValues.bankName} />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["bankName"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "bankName" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("bankName")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            disabled={profileUpdateLoading}
            variant="primary"
            onClick={() => handleEdit("bankName")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderAccNumberField = () => (
    <Form.Group className="mb-4" as={Row} controlId="accountNumber">
      <Form.Label column sm={3}>
        Account Number
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "accountNumber" ? (
          <Form.Control
            type="number"
            name="accountNumber"
            value={formValues.accountNumber}
            onChange={handleChange}
            isInvalid={validationErrors["accountNumber"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.accountNumber}
          />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["accountNumber"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "accountNumber" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("accountNumber")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("accountNumber")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderIfscCodeField = () => (
    <Form.Group className="mb-4" as={Row} controlId="ifsc">
      <Form.Label column sm={3}>
        IFSC Code
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "ifsc" ? (
          <Form.Control
            type="text"
            name="ifsc"
            value={formValues.ifsc}
            onChange={handleChange}
            isInvalid={validationErrors["ifsc"]}
            required
          />
        ) : (
          <Form.Control plaintext readOnly defaultValue={formValues.ifsc} />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["ifsc"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "ifsc" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            type="button"
            disabled={profileUpdateLoading}
            onClick={() => handleSave("ifsc")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("ifsc")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderUpiIdField = () => (
    <Form.Group className="mb-4" as={Row} controlId="upi">
      <Form.Label column sm={3}>
        UPI Id
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "upi" ? (
          <Form.Control
            type="text"
            name="upi"
            value={formValues.upi}
            onChange={handleChange}
            isInvalid={validationErrors["upi"]}
            required
          />
        ) : (
          <Form.Control plaintext readOnly defaultValue={formValues.upi} />
        )}
        <p style={{ color: "red" }} type="invalid">
          {validationErrors["upi"]}
        </p>
      </Col>
      <Col sm={2}>
        {editingField === "upi" ? (
          <Button
            className={css.buttonLink}
            variant="primary"
            disabled={profileUpdateLoading}
            type="button"
            onClick={() => handleSave("upi")}
          >
            Save
          </Button>
        ) : (
          <Button
            className={css.buttonLink}
            type="button"
            variant="primary"
            disabled={profileUpdateLoading}
            onClick={() => handleEdit("upi")}
          >
            Edit
          </Button>
        )}
      </Col>
    </Form.Group>
  );
  const renderReferralIdField = () => (
    <Form.Group className="mb-3" as={Row} controlId="referredId">
      <Form.Label column sm={3}>
        Referred Id
      </Form.Label>
      <Col sm={1}>:</Col>
      <Col sm={6}>
        {editingField === "referredId" ? (
          <Form.Control
            type="referredId"
            name="referredId"
            value={formValues.referredId}
            onChange={handleChange}
            isInvalid={validationErrors["referredId"]}
            required
          />
        ) : (
          <Form.Control
            plaintext
            readOnly
            defaultValue={formValues.referredId}
          />
        )}
      </Col>
    </Form.Group>
  );

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {profileUpdateSuccess && (
        <SuccessAlert message="Data saved successfully!" />
      )}
      {showErrorAlert && <ErrorAlert message={errorMessage} />}
      {profileUpdateError && <ErrorAlert message={"Something went wrong"} />}

      <Form className="p-3">
        {renderAccHolderNameField()}
        {renderBankNameField()}
        {renderAccNumberField()}
        {renderIfscCodeField()}
        {renderUpiIdField()}
        {renderReferralIdField()}

        <Form.Group as={Row}>
          <Col sm={{ span: 8, offset: 4 }}>
            <Button
              variant="secondary"
              className="me-3"
              style={{ width: "5rem", fontSize: "0.9rem" }}
              onClick={handleCancel}
              disabled={profileUpdateLoading}
            >
              Cancel
            </Button>
            <Button
              disabled={
                profileUpdateLoading ||
                !isFormChanged ||
                (validationErrors &&
                  Object.keys(validationErrors).length > 0) ||
                editingField
              }
              type="button"
              onClick={handleSaveAll}
              variant="primary"
              style={{ width: "8rem", fontSize: "0.9rem" }}
            >
              {profileUpdateLoading ? "Saving..." : "Save and Next"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default RecruiterBankDetails;
