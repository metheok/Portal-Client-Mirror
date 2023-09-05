import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import css from './EmployerSecurity.module.css';
import { BsPencil } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const EmployerSecurity = ({ handleChangePassword, isMobile }) => {

	const handlePasswordTab = (e) => {
		handleChangePassword('password')
	};


	return (
		<>
			{isMobile ? (
				<>
					<div className="securityContainer p-3" >
						<Link to='/dashboard'>
							<span className={css.backArrow}><BiArrowBack /></span>
						</Link>
						<Form className="mx-auto mt-3" style={{ backgroundColor: 'white' }}>

							<h1 className={css.basicHeading}>Security</h1>
							<Form.Group as={Row} className="mb-2" controlId="password">
								<Form.Label column sm={4} className={css.BasicReadOnly}>
									Password
								</Form.Label>
								<Col sm={2}>
									<Button className={`${css.buttonLink}`} style={{ color: 'rgba(22, 118, 243, 1)', backgroundColor: 'transparent' }} variant="primary" onClick={handlePasswordTab}>
										Update
									</Button>
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-5" controlId="twoStepVerification">
								<Form.Label column sm={4} className={css.BasicReadOnly}>
									2-Step Verification
								</Form.Label>
								<Col sm={6}>
									<Button className={css.buttonLink} style={{ color: 'rgba(22, 118, 243, 1)', backgroundColor: 'transparent' }} variant="primary">
										Set-up
									</Button>
								</Col>
							</Form.Group>
						</Form>
					</div>
				</>
			)
				:
				(
					<>
						<Form className="p-4 mx-auto" >
							<Form.Group as={Row} className="mb-5" controlId="password">
								<Form.Label column sm={4} className={css.BasicReadOnly}>
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
					</>
				)}
		</>
	);
};

export default EmployerSecurity;
