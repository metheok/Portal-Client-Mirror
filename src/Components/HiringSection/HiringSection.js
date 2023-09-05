import React from 'react';
import { Button } from 'react-bootstrap';
import css from './HiringSection.module.css';

const HiringSection = () => {
	return (
		<div className={css.container}>
			<div className={css.hiringSection}>
				<div className={css.overlay}>
					<div className={css.content} >
						<h3 className={css.heading}>Discover the Power of Precision Hiring - Connect with the Perfect Talent Faster and Smarter.</h3>
						<Button className={css.Button} variant="primary"> start Hiring Better Today</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HiringSection;
