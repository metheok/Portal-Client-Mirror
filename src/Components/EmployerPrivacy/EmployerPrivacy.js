import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import css from './EmployerPrivacy.module.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Loading from "../Loading/Loading";

import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const EmployerPrivacy = ({ isMobile }) => {
	const [initialValues, setInitialValues] = useState({});
	const [formValues, setFormValues] = useState({});


	const handleRoleChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value === "true" });
	};

	return (
		<>
			{isMobile ?
				(
					<>
						<div className="mt-4 securityContainer p-3 d-flex flex-column vh-100" >
							<Link to='/dashboard'>
								<span className={css.backArrow}><BiArrowBack /></span>
							</Link>
							<Form style={{ padding: "1rem 0", backgroundColor: 'white' }} >
								<h1 className={css.basicHeading} >Security</h1>
								<Col md={{ span: 7, offset: 1 }}>
									<Form.Group className="mb-4 mt-4" controlId="makeProfilePublic">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange} >
													Make Profile Public
												</Form.Label>
											</Col>

											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="makeProfilePublic"
													className={`${css.labelChange}`}
													style={{ marginRight: "0.6rem", padding: '0' }}
													label="Yes"
													name="makeProfilePublic"
													value={true}
													checked={formValues.makeProfilePublic === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="makeProfilePublic"
													className={`${css.labelChange} `}
													label="No"
													name="makeProfilePublic"
													value={false}
													checked={formValues.makeProfilePublic === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="makeProfilePrivate">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>
													Make Profile Private
												</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="makeProfilePrivate"
													className={`${css.labelChange} `}
													style={{ marginRight: "0.6rem" }}
													label="Yes"
													name="makeProfilePrivate"
													value={true}
													checked={formValues.makeProfilePrivate === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="makeProfilePrivate"
													className={`${css.labelChange} `}
													label="No"
													name="makeProfilePrivate"
													value={false}
													checked={formValues.makeProfilePrivate === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="makeProfileAnonymous">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>
													Make Profile Anonymous
												</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="makeProfileAnonymous"
													className={`${css.labelChange}`}
													style={{ marginRight: "0.6rem", padding: '0' }}
													label="Yes"
													name="makeProfileAnonymous"
													value={true}
													checked={formValues.makeProfileAnonymous === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="makeProfileAnonymous"
													className={`${css.labelChange}`}
													label="No"
													name="makeProfileAnonymous"
													value={false}
													checked={formValues.makeProfileAnonymous === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="jobSearchAlerts">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>
													Job Search Alerts
												</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="jobSearchAlerts"
													className={`${css.labelChange}`}
													style={{ marginRight: "0.6rem" }}
													label="Yes"
													name="jobSearchAlerts"
													value={true}
													checked={formValues.jobSearchAlerts === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="jobSearchAlerts"
													className={`${css.labelChange}`}
													label="No"
													name="jobSearchAlerts"
													value={false}
													checked={formValues.jobSearchAlerts === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="desktopNotification">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>Desktop Notification </Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="desktopNotification"
													className={`${css.labelChange}`}
													style={{ marginRight: "0.6rem" }}
													label="Yes"
													name="desktopNotification"
													value={true}
													checked={formValues.desktopNotification === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="desktopNotification"
													className={`${css.labelChange}`}
													label="No"
													name="desktopNotification"
													value={false}
													checked={formValues.desktopNotification === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="emailNotification">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>Email Notification :</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="emailNotification"
													className={`${css.labelChange}`}
													style={{ marginRight: "0.6rem" }}
													label="Yes"
													name="emailNotification"
													value={true}
													checked={formValues.emailNotification === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="emailNotification"
													className={`${css.labelChange}`}
													label="No"
													name="emailNotification"
													value={false}
													checked={formValues.emailNotification === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
								</Col>
							</Form>
							<div className="mt-auto float-end">
								<Form.Group className="d-flex justify-content-end float-end" >
									<Button
										variant="secondary"
										className="mx-3"
										type="button"
									/* 	onClick={nextTab} */
									>
										Cancel
									</Button>
									<Button
										/* disabled={
											/*	!isFormChanged||
												(validationErrors &&
												Object.keys(validationErrors).length > 0) ||
											editingField
										} */
										type="submit"
										variant="primary"
										style={{ width: "5rem" }}
										className="d-inline"
									>
										Save
									</Button>

								</Form.Group>
							</div>
						</div>
					</>
				)
				:
				(
					<>
						<div className="mt-4">
							<Form style={{ padding: "1rem 0" }}>
								<Col md={{ span: 7, offset: 1 }}>
									<Form.Group className="mb-4" controlId="makeProfilePublic">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>
													Make Profile Public :
												</Form.Label>
											</Col>

											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="makeProfilePublic"
													className={`${css.labelChange}`}
													style={{ marginRight: "1rem" }}
													label="Yes"
													name="makeProfilePublic"
													value={true}
													checked={formValues.makeProfilePublic === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="makeProfilePublic"
													className={`${css.labelChange} `}
													label="No"
													name="makeProfilePublic"
													value={false}
													checked={formValues.makeProfilePublic === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="makeProfilePrivate">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>
													Make Profile Private :
												</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="makeProfilePrivate"
													className={`${css.labelChange} `}
													style={{ marginRight: "1rem" }}
													label="Yes"
													name="makeProfilePrivate"
													value={true}
													checked={formValues.makeProfilePrivate === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="makeProfilePrivate"
													className={`${css.labelChange} `}
													label="No"
													name="makeProfilePrivate"
													value={false}
													checked={formValues.makeProfilePrivate === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="makeProfileAnonymous">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>
													Make Profile Anonymous :
												</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="makeProfileAnonymous"
													className={`${css.labelChange}`}
													style={{ marginRight: "1rem" }}
													label="Yes"
													name="makeProfileAnonymous"
													value={true}
													checked={formValues.makeProfileAnonymous === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="makeProfileAnonymous"
													className={`${css.labelChange}`}
													label="No"
													name="makeProfileAnonymous"
													value={false}
													checked={formValues.makeProfileAnonymous === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="jobSearchAlerts">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>
													Job Search Alerts :
												</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="jobSearchAlerts"
													className={`${css.labelChange}`}
													style={{ marginRight: "1rem" }}
													label="Yes"
													name="jobSearchAlerts"
													value={true}
													checked={formValues.jobSearchAlerts === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="jobSearchAlerts"
													className={`${css.labelChange}`}
													label="No"
													name="jobSearchAlerts"
													value={false}
													checked={formValues.jobSearchAlerts === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="desktopNotification">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>Desktop Notification :</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="desktopNotification"
													className={`${css.labelChange}`}
													style={{ marginRight: "1rem" }}
													label="Yes"
													name="desktopNotification"
													value={true}
													checked={formValues.desktopNotification === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="desktopNotification"
													className={`${css.labelChange}`}
													label="No"
													name="desktopNotification"
													value={false}
													checked={formValues.desktopNotification === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
									<Form.Group className="mb-4" controlId="emailNotification">
										<div className="d-flex justify-content-start">
											<Col sm={8}>
												<Form.Label className={css.labelChange}>Email Notification :</Form.Label>
											</Col>
											<Col className="d-flex justify-content-end">
												<Form.Check
													type="radio"
													id="emailNotification"
													className={`${css.labelChange}`}
													style={{ marginRight: "1rem" }}
													label="Yes"
													name="emailNotification"
													value={true}
													checked={formValues.emailNotification === true}
													onChange={handleRoleChange}
												/>

												<Form.Check
													type="radio"
													id="emailNotification"
													className={`${css.labelChange}`}
													label="No"
													name="emailNotification"
													value={false}
													checked={formValues.emailNotification === false}
													onChange={handleRoleChange}
												/>
											</Col>
										</div>
									</Form.Group>
								</Col>
								<div className="d-flex justify-content-center  mt-5 mb-3">
									<Button
										variant="secondary"
										className="mx-3"
										type="button"
									/* 	onClick={nextTab} */
									>
										Cancel
									</Button>
									<Button
										/* disabled={
											/*	!isFormChanged||
												(validationErrors &&
												Object.keys(validationErrors).length > 0) ||
											editingField
										} */
										type="submit"
										variant="primary"
										style={{ width: "5rem" }}
										className="d-inline"
									>
										Save
									</Button>


								</div>
							</Form>
						</div>
					</>
				)
			}
		</>

	)
}

export default EmployerPrivacy