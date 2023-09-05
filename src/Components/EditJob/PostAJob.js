import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PostAJob({ currentTab, handleSubmit, data, setData, disabled, setDisabled }) {

    const navigate = useNavigate();

    useEffect(() => {
        const isFormFilled = Object.values(data).every((value) => value.trim() !== '');
        if (isFormFilled) {
            setDisabled(pValue => {
                return {
                    ...pValue,
                    post: false
                }
            });
        }
        else {
            setDisabled(pValue => {
                return {
                    ...pValue,
                    post: true
                }
            });
        }
    }, [data])

    function handleChange(e) {
        const { name, value } = e.target;
        setData(pValue => {
            return {
                ...pValue,
                [name]: value
            }
        })
    }

    return (
        <>
            {currentTab === "post-job" && (
                <Form className="job-form w-60" noValidate onSubmit={(e) => handleSubmit(e, 'draft', 'save')}>
                    <div className="w-100  mt-5">

                        <Form.Group className="mb-4">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control onChange={handleChange} name="jobTitle" value={data.jobTitle} type="text" required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Workplace Type</Form.Label>
                            <Form.Select onChange={handleChange} name="workplaceType" value={data.workplaceType} required>
                                <option value=""></option>
                                <option value="On-Site">On-Site</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Remote">Remote</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Country</Form.Label>
                            <Form.Control onChange={handleChange} name="country" value={data.country} type="text" required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={handleChange} name="city" value={data.city} type="text" required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Job Type</Form.Label>
                            <Form.Select onChange={handleChange} name="jobType" value={data.jobType} required>
                                <option></option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Temporary">Temporary</option>
                                <option value="Volunteer">Volunteer</option>
                                <option value="Intership">Intership</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>

                    </div>
                    {currentTab !== "" && <div className="d-flex justify-content-center">
                        <div className="mb-4 mt-5 d-flex">
                            <Button
                                onClick={() => { navigate('/dashboard') }}
                                className="border-black"
                                variant="light"
                            >
                                Cancel
                            </Button>
                            <Button type="button" className='ms-3' onClick={(e) => handleSubmit(e, 'draft', 'draft')}>Save To Draft</Button>
                            <Button disabled={disabled.post} type="submit" className='ms-3'>Save and Next</Button>
                        </div>
                    </div>}
                </Form>
            )}
        </>
    );
}
