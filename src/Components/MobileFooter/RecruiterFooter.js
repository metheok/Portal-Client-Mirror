import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import myJob from '../../images/Jobseeker/myjob.svg'
import Job from '../../images/mobileFooter/Recruiter/job-seeker.svg'
import referral from '../../images/mobileFooter/Recruiter/Vector.svg'
import css from './MobileFooter.module.css'

const RecruiterFooter = () => {

	const location = useLocation();

	const Recruiter = [
		{
			id: 1,
			title: 'Home',
			icon: <AiOutlineHome size={25} />,
			link: '/'
		},
		{
			id: 2,
			title: 'Jobs',
			icon: Job,
			link: '/jobs'
		},
		{
			id: 3,
			title: 'Add a Candidate',
			icon: '',
			link: '/jobs'
		},
		{
			id: 4,
			title: 'Referrals',
			icon: <IoPersonOutline size={25} />,
			link: '/user'
		},
		{
			id: 5,
			title: 'profile',
			icon: <IoPersonOutline size={25} />,
			link: '/user'
		},
	]


	const Jobs = '/dashboard/jobs'
	const markedJobs = '/dashboard/jobs/marked'
	const referredJobs = '/dashboard/jobs/referred'
	const closedJobs = '/dashboard/jobs/closed'


	const candidates = '/dashboard/candidate/add/general'
	const addCandidate = '/dashboard/candidate/add/general'
	const yourCandidate = '/dashboard/candidate/add/yourCandidate'
	const referredCandidate = '/dashboard/candidate/add/referredCandidate'
	const selectedCandidate = '/dashboard/candidate/add/selectedCandidate'

	const referrals = '/dashboard/referrals';

	const myProfile = '/dashboard/profile'
	const settings = '/dashboard/settings'

	return (
		<>
			<style>{`
      #Jobs {
        color: #fff ;
        opacity:0.8;
      
      }
      #JobSelect {
        color: #fff ;
        opacity:1;
      }

      #referralSelect{
      color: #fff ;
        opacity:1;
      }
      #referral{
      color: #fff ;
        opacity:0.8;
      }
      `}
			</style>


			<Navbar fixed="bottom" className="bottom-tab-nav" style={{ paddingTop: '0' }}>
				<Nav className="justify-content-around w-100 footNav" >
					<Nav.Link
						as={NavLink}
						to="/dashboard"
						active={location.pathname === "/dashboard"}
						style={{
							color:
								location.pathname === "/dashboard"
									? "#fff"
									: "rgba(255, 255, 255, 0.74)",
						}}
					>
						<div className={css.footIcons}>
							<AiOutlineHome size={25} />
						</div>
						<div className={css.footName}>Home</div>
					</Nav.Link>
					<Nav.Link
						as={NavLink}
						to={Jobs}
						active={location.pathname === Jobs}
						style={{
							color:
								location.pathname === Jobs
									? "#fff"
									: "rgba(255, 255, 255, 0.74)",
						}}
					>
						<div className={css.footIcons}>
							<img
								id={location.pathname === Jobs ? "JobSelect" : "Jobs"}
								src={Job} alt="job" style={{ width: '25px', height: '25px' }} />
						</div>
						<div className={css.footName}>
							Jobs
						</div>
					</Nav.Link>
					<Nav.Link
						as={NavLink}
						to="/dashboard/candidate/add"
						active={location.pathname.includes("dashboard/candidate/add")}
						style={{
							color: location.pathname.includes("dashboard/candidate/add")
								? "#fff"
								: "rgba(255, 255, 255, 0.74)",
						}}
						className="plusIconTop"
					>
						<div className={css.pulseContainer}>
							<div className={`${css.footIcons} ${css.plusIconParent}`} style={{ opacity: '1' }}>
								<FaPlus className={css.plusIconChild} />
							</div>
							<div className={css.footName}>Add a Candidate</div>
						</div>
					</Nav.Link>
					<Nav.Link
						as={NavLink}
						to="/referral"
						active={location.pathname === "/referral"}
						style={{
							color:
								location.pathname === "/referral"
									? "#fff"
									: "rgba(255, 255, 255, 0.74)",
						}}
					>
						<div className={css.footIcons}>
							{/* <PiShareNetworkLight size={25} /> */}
							<img
								id={location.pathname === "/referral" ? "referralSelect" : "referral"}
								src={referral} alt="referral" style={{ width: '25px', height: '25px' }} />
						</div>
						<div className={css.footName}>Referrals</div>
					</Nav.Link>
					<Nav.Link
						as={NavLink}
						to="/dashboard/profile"
						active={location.pathname === "/dashboard/profiles"}
						style={{
							color:
								location.pathname === "/dashboard/profile"
									? "#fff"
									: "rgba(255, 255, 255, 0.74)",
						}}
					>
						<div className={css.footIcons}>
							<IoPersonOutline size={25} />
						</div>
						<div className={css.footName}>Profile</div>
					</Nav.Link>
				</Nav>
			</Navbar>
		</>);
};

export default RecruiterFooter;
