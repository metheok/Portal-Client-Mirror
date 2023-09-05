import React from 'react';
import sun from '../../images/sun.png'

const Greeting = () => {
	const currentTime = new Date();
	const currentHour = currentTime.getHours();

	let greeting, icon;

	if (currentHour >= 5 && currentHour < 12) {
		greeting = 'Good Morning';
		icon = <img src={sun} alt='sun' />;
	} else if (currentHour >= 12 && currentHour < 18) {
		greeting = 'Good Afternoon';
		icon = <img src={sun} alt='sun' />;
	} else {
		greeting = 'Good Evening';
		icon = '🌙';
	}

	return (
		<div>
			<div>{greeting} {icon}</div>
		</div>
	);
};

export default Greeting;