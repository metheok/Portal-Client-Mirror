import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import css from './EmployerSection.module.css'
import arch from '../../images/EmployerSection/arch.png'
import people from '../../images/EmployerSection/employee-search.png'
import Expert from '../../images/EmployerSection/expert.svg'
import Stream from '../../images/EmployerSection/stream.svg'
import cost from '../../images/EmployerSection/cost-effective.svg'

const EmployerSection = () => {
	return (
		<div>
			<Container>
				<Row className={`mb-5 mt-5 ${css.container}`} >

					<Col xs={12} md={6} className={` ${css.parentImg} `}>
						<img src={arch} alt="Left" className={css.firstImg} />

						<img src={people} alt="Overlay" className={css.secondImg} />

					</Col>

					<Col xs={12} md={6} >
						<div className={`${css.backgroundContainer}`}>
							<Row className={`mx-2 d-flex justify-content-center align-items-center`}>
								<div style={{ width: '100%' }} className={`d-block justify-content-center align-item-center ${css.content}`}>

									<p className={css.paraHead}>Employers</p>
									<h1 className={css.heading} >Unleash Talent with Precision Hiring.</h1>
									<p align='justify' className={`${css.para}`} >Tailored solutions for employers, with simplified recruitment process and quality results.</p>

									<Card className={` ${css.card} mb-3`} >
										<Row>
											<Col xs={3} className='d-flex justify-content-center align-item-center'>
												<Card.Img variant="top" src={Expert} className={css.cardImg} />
											</Col>
											<Col className='p-0'>
												<Card.Body>
													<Card.Title className={css.bodyPara}> Expert Screening, Guaranteed Quality</Card.Title>
													<Card.Text className={css.subPara}>
														Your success is our priority. Our AI-driven screening process ensures you receive only top-tier applicants, pre-qualified for success.
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
													<Card.Title className={css.bodyPara}> Streamlined Talent Acquisition</Card.Title>
													<Card.Text className={css.subPara}>
														Time is valuable. Leverage AI to find the perfect candidate fit quickly and efficiently, reducing your hiring process time significantly.
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
													<Card.Title className={css.bodyPara}>Cost-Effective Talent Solutions</Card.Title>
													<Card.Text className={css.subPara}>
														Get more for less. With our commission-based model, you pay for results, making recruitment budget-friendly and efficient.
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

export default EmployerSection;
