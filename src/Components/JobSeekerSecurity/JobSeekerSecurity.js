import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from './JobSeekerSecurity.module.css';

const JobSeekerSecurity = ({ handleChangePassword }) => {

	const handlePasswordTab = (e) => {
		handleChangePassword('password')
	};


	return (
		<Form className="p-4 mx-auto">
			<Form.Group as={Row} className="mb-5" controlId="password">
				<Form.Label column sm={4}>
					Password
				</Form.Label>
				<Col sm={1}>:
				</Col>
				<Col sm={2}>
					<Button className={`${css.buttonLink}`} variant="primary" onClick={handlePasswordTab}>
						Update
					</Button>{" "}
				</Col>
			</Form.Group>
			<Form.Group as={Row} className="mb-5" controlId="twoStepVerification">
				<Form.Label column sm={4}>
					2-Step Verification
				</Form.Label>
				<Col sm={1}>:
				</Col>
				<Col sm={6}>
					<Button className={css.buttonLink} variant="primary">
						Set-up
					</Button>{" "}
				</Col>
			</Form.Group>
		</Form>
	);
};

export default JobSeekerSecurity;