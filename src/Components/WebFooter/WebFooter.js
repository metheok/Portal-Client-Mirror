import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import css from './WebFooter.module.css'
import logo from '../../images/Footer/logo.svg'
/* import { FaFacebook, FaTwitter, FaLinkedIn } from 'react-icons/fa';
	*/
import { BsTwitter, BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
const WebFooter = () => {
	return (
		<footer className={css.footer}>
			<Row>

				<div>
					<Row className={css.InTech} style={{ padding: '0', margin: '0' }}>
						<Col className={`d-flex justify-content-between align-item-center p-0`} >
							<Container >
								<div className='d-flex justify-content-between align-item-center p-0'>
									<Col md={6} className={css.inTechContent}>Lorem ipsum dolor sit amet consectetur. Porttitor pharetra at pharetra id i </Col>
									<Button className={css.Button} variant="primary">Get in touch</Button>
								</div>
							</Container>
						</Col>
					</Row>
				</div>
				<div>
					<Container >


						<div className='mt-3 mb-3 mx-3'>
							<Row >
								<Col xs={4} md={3} className={`${css.footerLogo} ${css.centerLinks} `}>
									<div>
										<div className={css.logoImg}>
											<img src={logo} alt="Company Logo" />
										</div>
										<div className={css.media}>
											<p className={css.mediaUs} >Follow Us</p>
											<a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><BsTwitter color='white' className={css.icons} /></a>
											<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><BsLinkedin color='white' className={css.icons} /></a>
											<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><AiFillInstagram color='white' className={css.icons} /></a>
											<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><BsFacebook color='white' className={css.icons} /></a>
										</div>
									</div>

								</Col>
								<Col xs={2} md={2} className={`${css.company} ${css.centerLinks}`}>
									<div>
										<h5>Company</h5>
										<a href="/about" rel="noreferrer">About Us </a>
										<a href="/jobs" rel="noreferrer">Jobs </a>
										<a href="/career" rel="noreferrer">Careers</a>
									</div>

								</Col>
								<Col xs={3} md={1} className={`${css.company} ${css.centerLinks}`}>
									<div>
										<h5>Products</h5>
										<a href="/candidates" rel="noreferrer">Candidates</a>
										<a href="/employer" rel="noreferrer">Employer</a>
										<a href="/recruiter" rel="noreferrer">Recruiter</a>
									</div>
								</Col>
								<Col xs={3} md={2} className={`${css.company} ${css.centerLinks} p-0`}>
									<div>
										<h5>More</h5>
										<a href="/account" rel="noreferrer">Account User</a>
										<a href="/guides" rel="noreferrer">User Guides</a>
										<a href="/webinar" rel="noreferrer">Webinars</a>
									</div>
								</Col>
								<Col xs={12} md={4} className={css.subscribe}>
									<div>
										<h5>Subscribe Our Newsletter</h5>
										<span className={css.subscribeContent} >Be the first one to know about discounts, offers and events Unsubscribe whenever you like.</span>
										<Form className={`${css.subscribeForm} mt-2`} inline>
											<Form.Control type="email" placeholder="Enter your email" />
											<Button className={css.subscribeButton} variant="primary">Subscribe Now</Button>
										</Form>
									</div>
								</Col>
							</Row>
						</div>

					</Container>

					<Row className={css.copy}>
						<Row>
							<Col className={`d-flex justify-content-between align-item-center `} >
								<Container>
									<div className='d-flex justify-content-between align-item-center'>
										<span>&copy;All copyright reserved 2023 </span>
										<span>Privacy | Term & Condition</span>
									</div>
								</Container>
							</Col>
						</Row>
					</Row>

				</div>
			</Row>
		</footer>
	);
}

export default WebFooter;
