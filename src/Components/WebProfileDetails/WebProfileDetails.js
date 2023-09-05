import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const WebProfileDetails = ({
  tabValueChange,
  handleProfileData,
  profileData,
  formFields,
  tabKey,
  nextTab,
}) => {
  const [activeField, setActiveField] = useState(null);

  const handleCancel = () => {
    setActiveField(null);
  };

  const handleSave = () => {
    tabValueChange(tabKey);
    setActiveField(null); // Clear active field after saving
    console.log("Saved!");
  };

  const handleEdit = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleInputChange = (fieldName, value) => {
    handleProfileData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <Form style={{ maxHeight: "100vh" }}>
      <div className="p-2">
        {formFields.map((field, index) => (
          <Form.Group key={index} controlId={field.fieldName}>
            <div className="d-flex  mb-4 mt-4">
              <Form.Label
                className="me-3"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                {field.label} <h6 style={{ float: "right" }}>:</h6>
              </Form.Label>
              <div className="input-group">
                {nextTab === "password" ? (
                  <Form.Control
                    type="text"
                    value={profileData[field.fieldName]}
                    onChange={(e) =>
                      handleInputChange(field.fieldName, e.target.value)
                    }
                    size="sm"
                  />
                ) : (
                  <>
                    {activeField === field.fieldName ? (
                      <Form.Control
                        type="text"
                        value={profileData[field.fieldName]}
                        onChange={(e) =>
                          handleInputChange(field.fieldName, e.target.value)
                        }
                        size="sm"
                      />
                    ) : (
                      <h6 className=" float-start">
                        {profileData[field.fieldName]}
                      </h6>
                    )}

                    {field.fieldName !== "profilePicture" &&
                    field.fieldName !== "password" ? (
                      <>
                        {field.fieldName !== "2-stepVerification" ? (
                          <Button
                            onClick={() => handleEdit(field.fieldName)}
                            style={{ marginLeft: "auto", marginRight: "2rem" }}
                            className="buttonLink"
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button
                            className="buttonLink"
                            style={{ marginLeft: "4rem" }}
                          >
                            Set up
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button
                        className="buttonLink"
                        style={{
                          ...(nextTab !== "security"
                            ? null
                            : { marginLeft: "4rem" }),
                        }}
                      >
                        Update
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Form.Group>
        ))}

        <div className="d-flex justify-content-center mb-1 ">
          {nextTab !== "password" ? (
            <Button variant="secondary" className="me-3" onClick={handleCancel}>
              Cancel
            </Button>
          ) : null}

          {nextTab !== "bank" ? (
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSave}>
              Save and Next
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};

export default WebProfileDetails;
