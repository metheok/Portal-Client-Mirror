import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import user from '../../images/Employer/edit.svg'
import privacy from '../../images/Employer/privacy.svg'
import Security from '../../images/Employer/verified.svg'
import { BiArrowBack } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

const EmployerMobileSettings = () => {

	const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 800);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		console.log("Mobile navigation check:", isMobile, location.pathname);
		if (!isMobile && location.pathname === "/dashboard/settings" ||
			location.pathname === "/dashboard/settings/") {
			navigate("/dashboard/settings/update-profile");
		}
	}, [isMobile, location, navigate]);

	return (
		<>
			<style>
				{`
				.title {
					font-family: Open Sans;
						font-size: 16px;	
						font-weight: 700;
						line-height: 16px;
						letter-spacing: 0em;
										}
					h2 {
											font-family: Open Sans;
						font-size: 20px;
						font-weight: 700;
						line-height: 24px;
						letter-spacing: 0.10000000149011612px;
						text-align: left;
				} 

				 .back-arrow{
					font-size:25px;
					color:rgba(0, 0, 0, 0.5);
					}

				`}
			</style>

			<Container fluid className="p-4">
				<Row>
					<Col xs={2} sm={1}>
						<Link to='/dashboard'>
							<span className="back-arrow"><BiArrowBack /></span>
						</Link>
					</Col>
				</Row>
				<Row className='mt-4'>
					<Col xs={10} sm={11} >
						<h2>Settings</h2>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col xs={12}>
						<div className="d-flex align-items-center">
							<span >
								<img src={user} alt="user" />
							</span>
							<Link to='/dashboard/settings/update-profile'>
								<span className='title ms-4' >Update Profile</span>
							</Link>
						</div>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col xs={12}>
						<div className="d-flex align-items-center">
							<span>
								<img src={privacy} alt="user" />
							</span>
							<Link to="/dashboard/settings/privacy">
								<span className='title ms-4'>Privacy</span>
							</Link>
						</div>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col xs={12}>
						<div className="d-flex align-items-center">
							<span >
								<img src={Security} alt="user" />
							</span>
							<Link to='/dashboard/settings/security' >
								<span className='title ms-4'>Security</span>
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</>);
};

export default EmployerMobileSettings;
