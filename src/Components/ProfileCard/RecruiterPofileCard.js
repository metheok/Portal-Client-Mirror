import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import job from "../../images/SideBarIcons/job-seeker.svg";
import candidate from "../../images/SideBarIcons/add.svg";
import referral from "../../images/SideBarIcons/Network.svg";
import userImg from "../../images/SideBarIcons/User.svg";
import setting from "../../images/settings.svg";
import logoutImg from "../../images/exit.svg";
import Avatar from "../Avatar/AvatarProfile";
import css from "./ProfileCard.module.css";

const RecruiterPofileCard = ({ handleLinkClick, location, user }) => {

	/* ---------------- direct links --------- */
	const Jobs = '/dashboard/jobs'
	const markedJobs = '/dashboard/jobs/marked'
	const referredJobs = '/dashboard/jobs/referred'
	const closedJobs = '/dashboard/jobs/closed'


	const candidates = '/dashboard/candidate/add/general'
	const addCandidate = '/dashboard/candidate/add/general'
	const yourCandidate = '/dashboard/candidate/search'
	const referredCandidate = '/dashboard/candidate/add/referredCandidate'
	const selectedCandidate = '/dashboard/candidate/add/selectedCandidate'

	const referrals = '/dashboard/referrals';

	const myProfile = '/dashboard/profile'
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
						src={job}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location.pathname === Jobs ? "activeLink" : ''}
							to={Jobs}
						>
							My Jobs
						</Link>
					</span>
				</div>

				<ul className={css.listTitle}>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname === markedJobs ? 'activeLink' : ''}
							to={markedJobs}
						>
							Marked Jobs
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname === referredJobs ? 'activeLink' : ''}
							to={referredJobs}
						>
							Referred Jobs
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link
							className={location.pathname === closedJobs ? 'activeLink' : ''}
							to={closedJobs}
						>
							Closed Jobs
						</Link>
					</li>
				</ul>


				<div className="d-block mb-2">
					<Image
						alt="logo"
						src={candidate}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location.pathname === candidates ? "activeLink" : ''}
							to={candidates}
						>
							Candidates
						</Link>
					</span>
				</div>

				<ul className={css.listTitle}>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname === addCandidate ? 'activeLink' : ''}
							to={addCandidate}
						>
							Add a Candidate to your database
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location.pathname === yourCandidate ? 'activeLink' : ''}
							to={yourCandidate}
						>
							Your Candidates Database
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link
							className={location.pathname === referredCandidate ? 'activeLink' : ''}
							to={referredCandidate}
						>
							Referred Candidates
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link
							className={location.pathname === selectedCandidate ? 'activeLink' : ''}
							to={selectedCandidate}
						>
							Selected Candidates
						</Link>
					</li>
				</ul>

				<div className="d-block mb-4">
					<Image
						alt="logo"
						src={referral}
						width="28"
						height="25"
						className="float-start me-2"
					/>
					<span className="sideBarTitle">
						<Link
							className={location.pathname === referrals ? "activeLink" : ''}
							to={referrals}

						>
							Referrals
						</Link>
					</span>
				</div>
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

export default RecruiterPofileCard;
