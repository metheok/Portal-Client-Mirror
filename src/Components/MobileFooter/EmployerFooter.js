import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Job from '../../images/mobileFooter/Recruiter/job-seeker.svg'
import application from '../../images/mobileFooter/Recruiter/add.svg'
import css from './MobileFooter.module.css'

const EmployerFooter = () => {
	const location = useLocation();
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


			<Navbar fixed="bottom" className="bottom-tab-nav" style={{ paddingTop: '0', zIndex: '2000' }}>
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
						to="/dashboard/jobs?status=live"
						active={location.pathname.includes("/dashboard/jobs?status=live")}
						style={{
							color:
								location.pathname.includes("/dashboard/jobs?status=live")
									? "#fff"
									: "rgba(255, 255, 255, 0.74)",
						}}
					>
						<div className={css.footIcons}>
							<img
								id={location.pathname.includes("/dashboard/jobs?status=live") ? "JobSelect" : "Jobs"}
								src={Job} alt="job" style={{ width: '25px', height: '25px' }} />
						</div>
						<div className={css.footName}>
							Jobs
						</div>
					</Nav.Link>
					<Nav.Link
						as={NavLink}
						to="/dashboard/job/edit-job/new/post-job"
						active={location.pathname.includes("/dashboard/job/edit-job/new/post-job")}
						style={{
							color: location.pathname.includes("/dashboard/job/edit-job/new/post-job")
								? "#fff"
								: "rgba(255, 255, 255, 0.74)",
						}}
						className="plusIconTop"
					>
						<div className={css.pulseContainer}>
							<div className={`${css.footIcons} ${css.plusIconParent}`} style={{ opacity: '1' }}>
								<FaPlus className={css.plusIconChild} style={{ marginBottom: '0.6rem' }} />
							</div>
							<div className={css.footName} >Add a Job</div>
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
									: "rgba(255, 255, 255, 0.74)", paddingLeft: '0', paddingRight: '0'
						}}
					>
						<div className={css.footIcons}>
							<img
								id={location.pathname === "/referral" ? "referralSelect" : "referral"}
								src={application} alt="referral" style={{ width: '25px', height: '25px' }} />
						</div>
						<div className={css.footName}>Applications</div>
					</Nav.Link>
					<Nav.Link
						as={NavLink}
						to="/dashboard/settings/update-profile"
						active={location.pathname === "/dashboard/settings/update-profile"}
						style={{
							color:
								location.pathname === "/dashboard/settings/update-profile"
									? "#fff"
									: "rgba(255, 255, 255, 0.74)", paddingLeft: '0',
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

export default EmployerFooter;
