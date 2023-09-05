import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";

const ContactUserDetails = () => {
  const [email, setEmail] = useState("anuproyca@gmail.com");
  const [alternateEmail, setAlternateEmail] = useState("anuproy@gmail.com");
  const [contactNumber, setContactNumber] = useState("9000022220");
  const [nomineeName, setNomineeName] = useState("Anup Roy");
  const [nomineeContactNumber, setNomineeContactNumber] =
    useState("7076401049");
  const [nomineeEmail, setNomineeEmail] = useState("anuproy@gmail.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // For simplicity, we're just logging the values here
  };

  return (
    <Form className="FormDetails p-3">
      <div className="d-line-block">
        <h6 className="d-inline-block">Contact Details</h6>
        {isEditing === false ? (
          <Button className="float-end MobileButtonLink" onClick={handleEdit}>
            <BsPencil size={18} />
          </Button>
        ) : (
          <Button className="MobileButtonLink float-end" onClick={handleSave}>
            Save
          </Button>
        )}
      </div>
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email ID</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="alternateEmail" className="mb-3">
        <Form.Label>Alternate Email ID</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter alternate email ID"
          value={alternateEmail}
          onChange={(e) => setAlternateEmail(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="contactNumber" className="mb-3">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="nomineeName" className="mb-3">
        <Form.Label>Nominee Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter nominee name"
          value={nomineeName}
          onChange={(e) => setNomineeName(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="nomineeContactNumber" className="mb-3">
        <Form.Label>Nominee Contact Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter nominee contact number"
          value={nomineeContactNumber}
          onChange={(e) => setNomineeContactNumber(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="nomineeEmail" className="mb-3">
        <Form.Label>Nominee Email ID</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter nominee email ID"
          value={nomineeEmail}
          onChange={(e) => setNomineeEmail(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>
    </Form>
  );
};

export default ContactUserDetails;
