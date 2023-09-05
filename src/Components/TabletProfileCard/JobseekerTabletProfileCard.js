import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import userImg from "../../images/SideBarIcons/User.svg";
import setting from "../../images/settings.svg";
import logoutImg from "../../images/exit.svg";
import MyJob from "../../images/Jobseeker/myjob.svg";
import myApplication from "../../images/Jobseeker/myApplication.svg";
import Avatar from "../Avatar/AvatarProfile";
import css from "./TabletProfileCard.module.css";

const JobseekerTabletProfileCard = ({ handleLinkClick, location, user }) => {

	/* ---------------- direct links --------- */
	const MyJobs = '/dashboard/jobs/favorite'
	const favoriteJobs = '/dashboard/jobs/favorite'
	const appliedJobs = '/dashboard/jobs/applied'
	const MyJobClosed = '/dashboard/jobs/closed'


	const myApplications = '/dashboard/myApplication'
	const all = '/dashboard/all'
	const underProcess = '/dashboard/underProcess';
	const Offers = '/dashboard/Offers';
	const myApplicationClosed = '/dashboard/closedJobs';

	const myProfile = '/dashboard/viewprofile'
	const settings = '/dashboard/settings'


	return (
		<Card>
			<div className=" m-2 ">
				<Link to={"/dashboard"}>
					<Avatar user={user} size={66} />
					<h5 className={css.centerHeading}>{user.profile.name}</h5>
				</Link>
			</div>

			<Card.Body>
				<div className="d-block mb-2">
					<Image
						alt="logo"
						src={MyJob}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location.pathname === MyJobs ? "activeLink" : ''}
							to={MyJobs}
						>
							My Jobs
						</Link>
					</span>
				</div>

				<ul className={css.listTitle}>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname.includes(favoriteJobs) ? 'activeLink' : ''}
							to={favoriteJobs}
						>
							Favorite Jobs
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname.includes(appliedJobs) ? 'activeLink' : ''}
							to={appliedJobs}
						>
							Applied Jobs
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link
							className={location.pathname.includes(MyJobClosed) ? 'activeLink' : ''}
							to={MyJobClosed}
						>
							Closed jobs
						</Link>
					</li>
				</ul>


				<div className="d-block mb-2">
					<Image
						alt="logo"
						src={myApplication}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location.pathname === myApplications ? "activeLink" : ''}
							to={myApplications}
						>
							My Applications
						</Link>
					</span>
				</div>
				<ul className={css.listTitle}>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname === all ? 'activeLink' : ''}
							to={all}
						>
							All
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname === underProcess ? 'activeLink' : ''}
							to={underProcess}
						>
							Under Process
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link
							className={location.pathname === Offers ? 'activeLink' : ''}
							to={Offers}
						>
							Offers
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link
							className={location.pathname === myApplicationClosed ? 'activeLink' : ''}
							to={myApplicationClosed}
						>
							Closed Jobs
						</Link>
					</li>
				</ul>

				<div className="d-block mb-4">
					<Image
						alt="logo"
						src={userImg}
						width="28"
						height="25"
						className="float-start me-2"
					/>
					<span className="sideBarTitle">
						<Link
							className={location.pathname === myProfile ? "activeLink" : ''}
							to={myProfile}

						>
							My profile
						</Link>
					</span>
				</div>

				<div className="d-block mb-4">
					<Image
						alt="logo"
						src={setting}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location.pathname === settings ? "activeLink" : ''}
							to={settings}
						>
							Settings
						</Link>
					</span>
				</div>
				<div className="d-block mb-4">
					<Image
						alt="logo"
						src={logoutImg}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							onClick={handleLinkClick}
							to={'/'}
						>
							Logout
						</Link>
					</span>
				</div>


			</Card.Body>
		</Card>
	);
};

export default JobseekerTabletProfileCard;
