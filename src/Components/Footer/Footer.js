import React from 'react'
import css from './Footer.module.css'
import MobileFooter from '../MobileFooter/MobileFooter'
import Employer from '../MobileFooter/EmployerFooter'
import Jobseeker from '../MobileFooter/JobseekerFooter'
import Recruiter from '../MobileFooter/RecruiterFooter'
import { useLocation } from 'react-router-dom';

const Footer = ({ isMobile, auth, user }) => {


	const { loading, error } = auth;
	const { userLoading, userError } = user;
	const userType = user?.user?.user?.userType;


	let MobileLoggedFooter = [];

	if (userType === "recruiter") {
		MobileLoggedFooter = (<Recruiter user={user} />);
	} else if (userType === "employer") {
		MobileLoggedFooter = (<Employer user={user} />);
	} else if (userType === "jobseeker") {
		MobileLoggedFooter = (<Jobseeker user={user} />);
	}


	const location = useLocation();

	console.log(location);
	// List of routes where the footer should be excluded
	const IncludePathName = ['/dashboard'];
	const IncludeSearch = ['?status=live&page=1'];



	// Check if the current route is in the list of excluded routes
	const shouldIncludePathName = IncludePathName.includes(location.pathname);
	const shouldIncludeSearch = IncludeSearch.includes(location.search);


	console.log(shouldIncludePathName, shouldIncludeSearch);

	return (
		<>
			{isMobile && !loading && !error && !userLoading && !userError && (shouldIncludePathName || shouldIncludeSearch) ? (
				<>{user.user && MobileLoggedFooter}</>
			) : null}
		</>
	)
}

export default Footer