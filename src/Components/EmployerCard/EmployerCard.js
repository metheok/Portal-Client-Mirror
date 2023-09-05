import React from 'react';
import { Card } from 'react-bootstrap';
import css from './EmployerCard.module.css';

const EmployerCard = ({ heading, number, jobTitle, openJob, closedTitle, closedJob, viewTitle, viewDetail, color }) => {
	return (
		<Card className={css.cardContainer} style={{ backgroundColor: `${color}` }}>
			<Card.Body>
				<div className={css.mobile}>
					<div>
						<Card.Title className={css.heading}>{heading}</Card.Title>
						<Card.Text className={css.number}>{number}</Card.Text>
					</div>
					<div>
						<Card.Text className={css.jobs}>{jobTitle} : {openJob}</Card.Text>
						<Card.Text className={css.closedJobs}>{closedTitle} : {closedJob}</Card.Text>
						<Card.Text className={css.view}>{viewTitle}: {viewDetail}</Card.Text>
					</div>
				</div>


			</Card.Body>
		</Card>
	);
};

export default EmployerCard;
