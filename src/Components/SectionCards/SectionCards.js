import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import css from './SectionCards.module.css';
import Empower from '../../images/Explore/empower.svg';
import Unlock from '../../images/Explore/unlock.svg';
import Dream from '../../images/Explore/Dream.svg';

function SectionCards() {
	return (
		<>
			<Container>
				<div className={css.cardContainer}>
					<Row md={12}>
						<span className={`${css.heading}`}>Explore your path</span>
						<span className={`${css.subHeading} mb-4`}>Find your path</span>
						<Container>
							<Row>
								<Col xs={12} sm={12} md={4} xl={4}>
									<div className='d-flex justify-content-center align-item-center'>
										<Card className={`${css.cardShadow} `}>
											<Card.Img variant="top" src={Empower} />
											<Card.Body className="d-flex  flex-column justify-content-center align-item-center">
												<Card.Title className={css.Title} >Empower Growth</Card.Title>
												<Card.Subtitle className={css.Subtitle}>Boost your team</Card.Subtitle>
												<Card.Text className={css.cardPara}>Discover top talent for your organization & accelerate your business growth. find the perfect match for your job opening with our AI driven candidate screening.</Card.Text>
												<Button className={` ${css.Button}`} variant="primary">For Employer</Button>
											</Card.Body>
										</Card>
									</div>
								</Col>
								<Col xs={12} sm={12} md={4} xl={4}>
									<div className='d-flex justify-content-center align-item-center'>
										<Card className={css.cardShadow}>
											<Card.Img variant="top" src={Unlock} />
											<Card.Body className="d-flex flex-column justify-content-center align-item-center">
												<Card.Title className={css.Title}>Unlock Opportunities</Card.Title>
												<Card.Subtitle className={css.Subtitle}>Maximize earnings</Card.Subtitle>
												<Card.Text className={css.cardPara}>Take your recruitment career to new heights. Gain access to a pool of verified job openings and multiply your earnings with our attractive commission structure.</Card.Text>
												<Button className={` ${css.Button}`} variant="primary">For Recruiters</Button>
											</Card.Body>
										</Card>
									</div>
								</Col>

								<Col xs={12} sm={12} md={4} xl={4}>
									<div className='d-flex justify-content-center align-item-center'>
										<Card className={css.cardShadow}>
											<Card.Img variant="top" src={Dream} />
											<Card.Body className="d-flex flex-column justify-content-center align-item-center">
												<Card.Title className={css.Title} >Your Dream Job</Card.Title>
												<Card.Subtitle className={css.Subtitle}>Within Reach</Card.Subtitle>
												<Card.Text className={css.cardPara}>Find your dream job with ease. Access validated job opportunities and receive personalized job alerts that match your skills and preferences.</Card.Text>
												<Button className={` ${css.Button}`} variant="primary">For Jobseeker</Button>
											</Card.Body>
										</Card>
									</div>
								</Col>
							</Row>
						</Container>
					</Row>
				</div>
			</Container>
		</>);
}

export default SectionCards;
