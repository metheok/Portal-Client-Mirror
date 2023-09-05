import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { faker } from '@faker-js/faker';
import Card from 'react-bootstrap/Card';
import css from './EmployerGraph.module.css';

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

const data = labels.map((label) => ({
	name: label,
	Hire: faker.datatype.number({ min: 0, max: 1000 }),
	Application: faker.datatype.number({ min: 0, max: 1000 }),
}));

const EmployerGraph = ({ isTablet }) => {

	const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 767);
	const [MediumMobile, setMediumMobile] = React.useState(window.innerWidth <= 500);
	const [smallMobile, setSmallMobile] = React.useState(window.innerWidth <= 400);
	const [xSmallMobile, setXSmallMobile] = React.useState(window.innerWidth <= 350);

	React.useEffect(() => {
		const handleResize = () => {
			setXSmallMobile(window.innerWidth <= 350);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	React.useEffect(() => {
		const handleResize = () => {
			setSmallMobile(window.innerWidth <= 400);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	React.useEffect(() => {
		const handleResize = () => {
			setMediumMobile(window.innerWidth <= 500);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	React.useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 767);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	console.log({ xSmallMobile });
	console.log({ smallMobile });

	let graphWidth
	let barSize

	if (xSmallMobile) {
		graphWidth = 280
		barSize = 8
	} else if (smallMobile) {
		graphWidth = 300
		barSize = 8
	} else if (MediumMobile) {
		graphWidth = 380
		barSize = 8
	} else if (isMobile) {
		graphWidth = 450
		barSize = 8
	} else if (isTablet) {
		graphWidth = 550
		barSize = 20
	} else {
		graphWidth = 580
		barSize = 20
	}


	const graphHight = isTablet ? isMobile ? 240 : 250 : 300
	return (
		<Card className={css.backgroundImg}>
			<BarChart width={graphWidth}
				height={graphHight} data={data} margin={{ left: -20 }}>
				<XAxis dataKey="name" className={css.xAxis} />
				<YAxis className={css.yAxis} axisLine={false} />
				<Tooltip />
				<Legend />
				<Bar dataKey="Hire" fill="rgba(19, 61, 122, 1)" barSize={barSize} />
				<Bar dataKey="Application" fill="rgba(34, 159, 228, 1)" barSize={barSize} />
			</BarChart>
		</Card>
	);
};

export default EmployerGraph;
