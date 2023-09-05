import React from 'react';
import { Card, Button } from 'react-bootstrap';
import css from './EmployerRecentActivity.module.css';

const EmployerRecentActivity = () => {
	return (
		<Card className={`${css.card} ${css.backgroundImg}`} >
			<Card.Title className={css.recentActivity}>Recently Activity</Card.Title>
			<Card.Body>
				<Card.Text className={css.dateTime}>
					10.40 AM, Fri 10 Sept 2021
				</Card.Text>
				<Card.Text className={css.activityInfo}>
					You Posted a New Job
				</Card.Text>
				<Card.Text className={css.checkRequirements}>
					Kindly check the requirements and terms of work and make sure everything is right.
				</Card.Text>
				<div className={`d-flex ${css.todayActivityWrapper}`}>
					<div className={css.todayActivity}>
						Today you made 12 Activity
					</div>
					<div className="ml-auto d-flex justify-content-center align-items-center">
						<Button variant="danger" className={css.button}>
							See All Activity
						</Button>
					</div>
				</div>


			</Card.Body>
		</Card>
	);
}

export default EmployerRecentActivity;
