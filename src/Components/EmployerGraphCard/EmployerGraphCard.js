import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import css from './EmployerGraphCard.module.css'
import { AiOutlineArrowUp } from "react-icons/ai";
import jobImg from '../../images/TalentRequest.png'
import applicationImg from '../../images/TotalEmployees.png'



const EmployerGraphCard = ({ title, number, remote, onSite, percentChange, backgroundImg, isMobile }) => {

	const leftSideData = {
		title: title,
		number: number,
		remote: remote,
		onSite: onSite,
	};

	const rightSideData = {
		percentChange: percentChange,
		pastMonth: `+${percentChange} % Past month`,
	};

	const graphData = [
		{ month: 'January', value: 100 },
		{ month: 'February', value: 400 },
		{ month: 'March', value: 500 },
		{ month: 'April', value: 400 },
		{ month: 'May', value: 300 },
		{ month: 'June', value: 800 },
		{ month: 'July', value: 1000 },
	];

	const backgroundImage = backgroundImg === 'job' ? jobImg : applicationImg;


	return (

		<>
			{isMobile ? (<>
				<Card className={css.backgroundImg} style={{ backgroundImage: `url(${backgroundImage})` }}>
					<Row>
						<div className={css.container}>
							<div>
								<div className={css.jobs}>{leftSideData.title}</div>
								<div className={`${css.number} mt-4`}>{leftSideData.number}</div>
								<div className={`${css.remote} mt-4`}>{leftSideData.remote}</div>
								<div className={`${css.onSite} mt-2`}>{leftSideData.onSite}</div>
							</div>
							<div>
								<div className={`${css.percentChange} mt-4`}> +{rightSideData.percentChange} % <AiOutlineArrowUp /> </div>
								<div className="graph">
									<LineChart width={100} height={70} data={graphData}>
										<Tooltip contentStyle={{ display: 'none' }} />
										<Line type="monotone" dataKey="value" stroke="rgba(34, 159, 228, 1)" strokeWidth={2} dot={false} />
									</LineChart>
									<div className={`${css.pastMonth} mt-4`}>
										<span style={{ backgroundColor: 'rgba(218, 234, 255, 1)', padding: '7px', borderRadius: '5px' }}>	{rightSideData.pastMonth} </span>
									</div>
								</div>
							</div>
						</div>
					</Row>
				</Card>
			</>) : (<>
				<Card className={css.backgroundImg} style={{ backgroundImage: `url(${backgroundImage})` }}>
					<Row>
						<div className={css.container}>
							<div>
								<div className={css.jobs}>{leftSideData.title}</div>
								<div className={`${css.number} mt-4`}>{leftSideData.number}</div>
								<div className={`${css.remote} mt-4`}>{leftSideData.remote}</div>
								<div className={`${css.onSite} mt-2`}>{leftSideData.onSite}</div>
							</div>
							<div>
								<div className={css.percentChange}> +{rightSideData.percentChange} % <AiOutlineArrowUp /> </div>
								<div className="graph">
									<LineChart width={140} height={90} data={graphData}>
										<Tooltip contentStyle={{ display: 'none' }} />
										<Line type="monotone" dataKey="value" stroke="rgba(34, 159, 228, 1)" strokeWidth={2} dot={false} />
									</LineChart>
									<div className={css.pastMonth}>
										<span style={{ backgroundColor: 'rgba(218, 234, 255, 1)', padding: '7px', borderRadius: '5px' }}>	{rightSideData.pastMonth} </span>
									</div>
								</div>
							</div>
						</div>
					</Row>
				</Card>
			</>)}

		</>


	);
};

export default EmployerGraphCard;