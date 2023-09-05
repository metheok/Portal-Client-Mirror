import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import css from './EmployerHiredCard.module.css';
import person from '../../images/person.jpg'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const UserProfileCard = () => {
	return (
		<Card className={css.userCard}>
			<div className={css.userImage}>
				<img src={person} alt="person" srcset="" />
			</div>
			<div className={css.userName}>Meera Gupta</div>
			<div className={css.userTitle}>UX/UI Designer</div>
			<div className={css.userDepartment}>IT Department</div>
			<div className={css.joinDate}>Join by 20/08/2023</div>
		</Card>
	);
}

const EmployerHiredCard = ({ isMobile }) => {
	return (
		<>
			{isMobile ?
				(<>
					<Card className={css.card}>
						<div className={css.content}>
							<div className={css.leftContent}>
								<Card.Title className={css.recentlyHired}>Recently Hired Candidate</Card.Title>
							</div>

						</div>
						<Row>
							<Col>
								<UserProfileCard />
							</Col>
							<Col>
								<UserProfileCard />
							</Col>
						</Row>
						<div className={`ml-auto `}>
							<Button variant='primary' className={css.moreButton}>
								see more
							</Button>
						</div>
					</Card>
				</>) : (<>
					<Card className={css.card}>
						<div className={css.content}>
							<div className={css.leftContent}>
								<Card.Title className={css.recentlyHired}>Recently Hired Candidate</Card.Title>
							</div>
							<div className={`ml-auto `}>
								<div className={css.arrowButtons}>
									<Button variant="link" className={css.arrowButton}>
										<IoIosArrowBack size={18} className={css.arrow} />
									</Button>
									<Button variant="link" className={css.arrowButton}>
										<IoIosArrowForward size={18} className={css.arrow} />
									</Button>
								</div>
							</div>
						</div>
						<Row>
							<Col>
								<UserProfileCard />
							</Col>
							<Col>
								<UserProfileCard />
							</Col>
							<Col>
								<UserProfileCard />
							</Col>
							<Col>
								<UserProfileCard />
							</Col>
						</Row>

					</Card>
				</>)
			}
		</>
	);
}

export default EmployerHiredCard;