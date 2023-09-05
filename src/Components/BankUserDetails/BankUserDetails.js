import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import "./BankUserDetails.module.css";

const BankUserDetails = () => {
  const [accountHolderName, setAccountHolderName] = useState("Mr. Anup Roy");
  const [bankName, setBankName] = useState("State Bank of India");
  const [accountNumber, setAccountNumber] = useState("888899996666");
  const [ifscCode, setIfscCode] = useState("SBIN0001222");
  const [upiId, setUpiId] = useState("anuproy02oksbi");
  const [referredId, setReferredId] = useState("REF123ABCD");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Form className="FormDetails p-3">
      <div className="d-line-block">
        <h6 className="d-inline-block">Bank Details</h6>
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
      <Form.Group controlId="accountHolderName" className="mb-3">
        <Form.Label>Account Holder Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter account holder name"
          value={accountHolderName}
          onChange={(e) => setAccountHolderName(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="bankName" className="mb-3">
        <Form.Label>Bank Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter bank name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="accountNumber" className="mb-3">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="ifscCode" className="mb-3">
        <Form.Label>IFSC Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter IFSC code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="upiId" className="mb-3">
        <Form.Label>UPI ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>

      <Form.Group controlId="referredId" className="mb-3">
        <Form.Label>Referred ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter referred ID"
          value={referredId}
          onChange={(e) => setReferredId(e.target.value)}
          disabled={!isEditing}
        />
      </Form.Group>
    </Form>
  );
};

export default BankUserDetails;
