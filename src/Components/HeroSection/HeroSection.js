import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import person from '../../images/heroSection/persons.png';
import css from './HeroSection.module.css';

const HeroSection = () => {
	return (
		<div className={css.heroSection}>
			<Container>
				<Row className={css.fullHeightRow}>
					<Col xs={12} sm={12} md={12} xl={8} className={`${css.leftSection} ${css.expandedCol} `}>
						<div className={`${css.expandedContent}d-block justify-content-center align-items-center`}>
							<h1 className={`${css.heroHead}`}>DISCOVER TOP TALENT</h1>
							<h3 >AI Powered Talent Solution</h3>
							<p>Unlock top-tier candidates matched to your specific needs effortlessly with our AI-driven platform. Streamlined hiring, exceptional results.</p>
							<Button className={`${css.Button}`} size={'lg'} variant="primary">Hire with AI Precision</Button>
						</div>
					</Col>
					<Col xs={12} md={6} xl={4} className={`${css.rightSection} ${css.expandedCol}`}>
						<div className={` ${css.expandedContent} d-flex justify-content-center align-items-center`}>
							<img src={person} alt="AI Precision" />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default HeroSection;
