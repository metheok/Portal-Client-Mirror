import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import css from './RecruiterSection.module.css'
import arch from '../../images/RecruiterSection/Arch.png'
import people from '../../images/RecruiterSection/company-employees.png'
import Expert from '../../images/RecruiterSection/access.svg'
import Stream from '../../images/RecruiterSection/build.svg'
import cost from '../../images/RecruiterSection/lucrative.svg'

const RecruiterSection = () => {
	return (
		<div>
			<div className={`mt-5 mb-5 ${css.Container}`}>
				<Container>
					<Row className='mt-5 mb-5'>
						<Col md={6} >
							<div className={`${css.backgroundContainer}`}>
								<Row className='mx-2'>
									<p className={css.paraHead}>Recruiter's and Recruitment Agencies</p>
									<h1 className={css.heading} >Expand your reach, Amplify your earnings.</h1>
									<p align='justify' className={css.para} >Empowering recruiters to thrive  through curated openings and seamless placements.</p>

									<Card className={` ${css.card} mb-3`} >
										<Row>
											<Col xs={3} className='d-flex justify-content-center align-item-center'>
												<Card.Img variant="top" src={Expert} className={css.cardImg} />
											</Col>
											<Col className='p-0'>
												<Card.Body>
													<Card.Title className={css.bodyPara}> Access Prime Opportunities</Card.Title>
													<Card.Text className={css.subPara}>
														Amplify your reach with 10x more curated openings, maximizing your revenue potential beyond what other freelancers experience.
													</Card.Text>
												</Card.Body>
											</Col>
										</Row>
									</Card>
									<Card className={` ${css.card} mb-3`} >
										<Row>
											<Col xs={3} className='d-flex justify-content-center align-item-center'>
												<Card.Img variant="top" src={Stream} className={css.cardImg} />
											</Col>
											<Col className='p-0'>
												<Card.Body>
													<Card.Title className={css.bodyPara}> Build and Manage Your Talent Pool</Card.Title>
													<Card.Text className={css.subPara}>
														Empower yourself with AI technology to curate and manage a pool of candidates, ensuring perfect job fits every time.
													</Card.Text>
												</Card.Body>
											</Col>
										</Row>
									</Card>
									<Card className={` ${css.card} mb-3`} >
										<Row>
											<Col xs={3} className='d-flex justify-content-center align-item-center'>
												<Card.Img variant="top" src={cost} className={css.cardImg} />
											</Col>
											<Col className='p-0'>
												<Card.Body>
													<Card.Title className={css.bodyPara}>Lucrative Rewards for Your Success</Card.Title>
													<Card.Text className={css.subPara}>
														Your success deserves recognition. Earn generously with our commission-based model for each successful placement.
													</Card.Text>
												</Card.Body>
											</Col>
										</Row>
									</Card>
								</Row>
							</div>
						</Col>
						<Col md={6} className={`${css.parentImg}`}>
							<img src={arch} alt="Left" className={css.firstImg} />
							<img src={people} alt="Overlay" className={css.secondImg} />
						</Col>
					</Row>
				</Container>
			</div>
		</div >
	);
}

export default RecruiterSection;
