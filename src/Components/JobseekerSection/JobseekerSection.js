import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import css from './JobseekerSection.module.css'
import arch from '../../images/JobseekerSection/arch.png'
import people from '../../images/JobseekerSection/vacation.png'
import Expert from '../../images/JobseekerSection/persoalized.svg'
import Stream from '../../images/JobseekerSection/quality.svg'
import cost from '../../images/JobseekerSection/fast.svg'

const JobseekerSection = () => {
	return (
		<div>
			<Container>
				<Row className='mb-5 mt-5'>
					<Col md={6} className={` ${css.parentImg}`}>
						<img src={arch} alt="Left" className={css.firstImg} />
						<img src={people} alt="Overlay" className={css.secondImg} />
					</Col>
					<Col md={6} >
						<div className={`${css.backgroundContainer}`}>
							<Row className={`mx-2 d-flex justify-content-center align-items-center`}>
								<div style={{ width: '100%' }} className={`d-block justify-content-center align-item-center ${css.content}`}>
									<p className={css.paraHead}>Jobseekers</p>
									<h1 className={css.heading} >Personalized opportunities just for you.</h1>
									<p align='justify' className={css.para} >Transforming your job search experience through personalized recommendations and Fast-track growth.</p>
									<Card className={` ${css.card} mb-3`} >
										<Row>
											<Col xs={3} className='d-flex justify-content-center align-item-center'>
												<Card.Img variant="top" src={Expert} className={css.cardImg} />
											</Col>
											<Col className='p-0'>
												<Card.Body>
													<Card.Title className={css.bodyPara}> Personalized Job Recommendations</Card.Title>
													<Card.Text className={css.subPara}>
														Your journey matters. Receive tailored job notifications based on your skills and aspirations, saving time in your job search.
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
													<Card.Title className={css.bodyPara}> Quality Opportunities, No Noise</Card.Title>
													<Card.Text className={css.subPara}>
														Your time is precious. Our AI filters ensure you apply to only the most relevant jobs, optimizing your chances of landing your dream role.
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
													<Card.Title className={css.bodyPara}>Fast-Track Your Career Growth</Card.Title>
													<Card.Text className={css.subPara}>
														Seize the right opportunities. Gain access to exclusive, verified openings from leading employers, accelerating your path to success.
													</Card.Text>
												</Card.Body>
											</Col>
										</Row>
									</Card>
								</div>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default JobseekerSection;

