import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import job from "../../images/SideBarIcons/job-seeker.svg";
import setting from "../../images/settings.svg";
import logoutImg from "../../images/exit.svg";
import CompanyDetails from "../../images/Employer/companyDetails.svg";
import AddJob from "../../images/Employer/addAJob.svg";
import Avatar from "../Avatar/AvatarProfile";
import css from "./ProfileCard.module.css";

const EmployerProfileCard = ({ handleLinkClick, location, user }) => {


	/* ---------------- direct links --------- */
	const companyLink = '/dashboard/company/about'
	const AddJobLink = '/dashboard/job/edit-job/new/post-job'
	const jobsLink = '/dashboard/jobs?status=live'
	const jobPostedLink = '/dashboard/jobs?status=live'
	const jobDraftLink = '/dashboard/jobs?status=draft'
	const jobClosedLink = '/dashboard/jobs?status=closed'

	const application = '/dashboard/1'
	const viewApplications = '/dashboard/2'
	const listedCandidates = '/dashboard/3'
	const hiredCandidates = '/dashboard/4'
	const rejectedCandidates = '/dashboard/5'

	const settings = '/dashboard/settings/update-profile'


	return (
		<Card>
			<div className=" m-2 ">
				<Link to={"/dashboard"}>
					<Avatar user={user} size={66} />
					<h5 className={css.centerHeading}>{user?.profile?.name}</h5>
				</Link>
			</div>

			<Card.Body>

				<div className="d-block mb-4">
					<Image
						alt="logo"
						src={CompanyDetails}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location?.pathname === companyLink ? "activeLink" : ''}
							to={companyLink}
						>
							Company details
						</Link>
					</span>
				</div>
				<div className="d-block mb-4">
					<Image
						alt="logo"
						src={AddJob}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location?.pathname === AddJobLink ? "activeLink" : ''}
							to={AddJobLink}
						>
							Add a Job
						</Link>
					</span>
				</div>

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
							className={location?.search.includes('status=live') ? "activeLink" : ''}
							to={jobsLink}

						>
							Jobs
						</Link>
					</span>
				</div>

				<ul className={css.listTitle}>
					<li className="ms-2 mb-1">
						<Link

							className={location?.search.includes('status=live') ? 'activeLink' : ''}
							to={jobPostedLink}
						>
							Posted Jobs
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location?.search.includes('status=draft') ? 'activeLink' : ''}
							to={jobDraftLink}
						>
							Drafts
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location?.search.includes('status=closed') ? 'activeLink' : ''}
							to={jobClosedLink}
						>
							Closed jobs
						</Link>
					</li>
				</ul>

				<div className="d-block mb-2">
					<Image
						alt="logo"
						src={AddJob}
						width="28"
						height="25"
						className="float-start me-2"
					/>

					<span className="sideBarTitle">
						<Link
							className={location?.pathname === application ? "activeLink" : ''}
							to={application}
						>
							Applications
						</Link>
					</span>
				</div>

				<ul className={css.listTitle}>
					<li className="ms-2 mb-1">
						<Link

							className={location?.pathname === viewApplications ? "activeLink" : ''}
							to={viewApplications}
						>
							View Applications
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location?.pathname === listedCandidates ? "activeLink" : ''}
							to={listedCandidates}
						>
							Shortlisted Candidates
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location?.pathname === hiredCandidates ? "activeLink" : ''}
							to={hiredCandidates}
						>
							Hired Candidates
						</Link>
					</li>
					<li className="ms-2 mb-1">
						<Link

							className={location?.pathname === rejectedCandidates ? "activeLink" : ''}
							to={rejectedCandidates}
						>
							Rejected Candidates
						</Link>
					</li>
				</ul>

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
							className={location?.pathname === settings ? "activeLink" : ''}
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

export default EmployerProfileCard;
