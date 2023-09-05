import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function PayoutDetails({ currentTab, handleSubmit, data, setData, payout, handleBack, handleChange, setPayout, disabled, setDisabled }) {

  const [error, setError] = useState(null);

  useEffect(() => {
    const isFormFilled = Object.keys(data).every((key) => {
      const value = data[key];
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      if (value === null || value === NaN) {
        return false;
      }
      return true;
    });
    if (isFormFilled && (data.maximumBudget > data.minimumCtc)) {
      setDisabled(pValue => {
        return {
          ...pValue,
          payout: false
        }
      });
    }
    else {
      setDisabled(pValue => {
        return {
          ...pValue,
          payout: true
        }
      });
    }
  }, [data])

  useEffect(() => {
    if (data.maximumBudget !== null && data.minimumCtc !== null) {
      if (data.maximumBudget < data.minimumCtc) {
        setError("Maximum Budget should be greater than Minimum CTC")
      }
      else {
        setError(null)
      }
    }
  }, [data.maximumBudget, data.minimumCtc])

  function handleChange(e) {
    const { name, value } = e.target;
    if (e.target.type === 'number') {
      let newValue = value === "" ? null : parseInt(value)
      setData(pValue => {
        return {
          ...pValue,
          [name]: newValue
        }
      })
    } else {
      setData(pValue => {
        return {
          ...pValue,
          [name]: value
        }
      })
    }
  }

  return (
    <>
      {currentTab === "payout-details" && (
        <Form className="job-form w-60" noValidate onSubmit={(e) => handleSubmit(e, 'draft', 'save')}>
          <div className="w-100  mt-5">
            <Form.Group className="mb-4">
              <Form.Label>Annual CTC Range</Form.Label>
              <Form.Select onChange={handleChange} name="annualCtcRange" value={data.annualCtcRange} required>
                <option></option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="GBP">GBP</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Group className={error ? null : "mb-4"}>
                <Form.Label>Minimum CTC</Form.Label>
                <Form.Control onChange={handleChange} name="minimumCtc" value={data.minimumCtc} type="number" required />
              </Form.Group>
              <Form.Group
                className={error ? "ms-3" : "mb-4 ms-3"}
              >
                <Form.Label>Maximum Budget</Form.Label>
                <Form.Control onChange={handleChange} name="maximumBudget" value={data.maximumBudget} type="number" required />
              </Form.Group>
            </div>
            {error && <div className="d-flex justify-content-end">
              <div className="w-50 ps-2 small mb-4 mt-2 text-danger">{error}</div>
            </div>}
            <div className="d-flex justify-content-between align-items-end mt-2">
              <Form.Group className="mb-4">
                <Form.Label>No. Of Vacancies</Form.Label>
                <Form.Control onChange={handleChange} name="NoOfVacancies" value={data.NoOfVacancies} type="number" required />
              </Form.Group>
              <Form.Group
                className="mb-4 ms-3"
              >
                <Form.Label>No. Of Application Required</Form.Label>
                <Form.Control onChange={handleChange} name="NoOfApplications" value={data.NoOfApplications} type="number" required />
              </Form.Group>
            </div>
            <Form.Group className="mb-4">
              <Form.Label>Fulfillment Payout</Form.Label>
              <div className="mt-1 mb-4">
                <Form.Check
                  inline
                  label="Percentage"
                  name="percentage"
                  type="radio"
                  id="inline-radio-1"
                  checked={payout === "percentage"}
                  onChange={() => {
                    setPayout('percentage')
                    setData(pValue => {
                      return {
                        ...pValue,
                        FulFillmentPayoutType: 'percentage'
                      }
                    })
                  }}
                />
                <Form.Check
                  inline
                  label="Fixed Payout"
                  name="fixed"
                  type="radio"
                  id="inline-radio-2"
                  checked={payout === "fixed"}
                  onChange={() => {
                    setPayout('fixed')
                    setData(pValue => {
                      return {
                        ...pValue,
                        FulFillmentPayoutType: 'fixed'
                      }
                    })
                  }}
                />
              </div>
              <Form.Control onChange={handleChange} name="FulFillmentPayout" value={data.FulFillmentPayout} type="number"
                placeholder={payout === "percentage" ? "% of annual CTC" : null} required
              />
            </Form.Group>
          </div>
          {currentTab !== "" && <div className="d-flex justify-content-center">
            <div className="mb-4 mt-5 d-flex">
              <Button
                onClick={handleBack}
                className="border-black"
                variant="light"
              >
                Back
              </Button>
              <Button type="button" className='ms-3' onClick={(e) => handleSubmit(e, 'draft', 'draft')}>Save To Draft</Button>
              <Button disabled={disabled.payout} type="submit" className='ms-3'>Save and Next</Button>
            </div>
          </div>}
        </Form>
      )}
    </>
  );
}
