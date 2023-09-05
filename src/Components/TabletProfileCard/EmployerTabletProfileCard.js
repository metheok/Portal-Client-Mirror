import React from "react";
import { Card, Image, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import job from "../../images/SideBarIcons/job-seeker.svg";
import setting from "../../images/settings.svg";
import logoutImg from "../../images/exit.svg";
import CompanyDetails from "../../images/Employer/companyDetails.svg";
import AddJob from "../../images/Employer/addAJob.svg";
import Avatar from "../Avatar/AvatarProfile";
import css from "./TabletProfileCard.module.css";
import ModalButton from '../../images/carbon_drill-farward.svg'


const EmployerTabletProfileCard = ({ openModal, handleLinkClick, location, user }) => {




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
		<Card className={css.cardWidth}>


			<div className={css.centeredImageContainer} >
				<img src={ModalButton} alt="button" onClick={openModal} />
			</div>
			<div className=" m-2 ">
				<Link to={"/dashboard"}>
					<Avatar user={user} size={60} />
					<h5 className={css.centerHeading}>{user.profile.name}</h5>
				</Link>
			</div>


			<div className={`mb-3 ${css.centeredImageContainer}`}>
				<Link
					className={location.pathname === companyLink ? "activeLink" : ''}
					to={companyLink}
				>
					<div className={css.centeredImage}>
						<Image
							alt="logo"
							src={CompanyDetails}
							width="28"
							height="25"
						/>
					</div>
					<span>Company details</span>
				</Link>
			</div>

			<div className={`mb-3 ${css.centeredImageContainer}`}>
				<Link
					className={location.pathname === AddJobLink ? "activeLink" : ''}
					to={AddJobLink}
				>
					<div className={css.centeredImage}>
						<Image
							alt="logo"
							src={AddJob}
							width="28"
							height="25"
						/>
					</div>
					<span>Add a Job</span>
				</Link>
			</div>

			<div className={`mb-3 ${css.centeredImageContainer}`}>
				<Link
					className={location.search.includes('status=live') ? "activeLink" : ''}
					to={jobsLink}
				>
					<div className={css.centeredImage}>
						<Image
							alt="logo"
							src={job}
							width="28"
							height="25"
						/>
					</div>
					<span>Jobs</span>
				</Link>
			</div>

			<div className={`mb-3 ${css.centeredImageContainer}`}>
				<Link
					className={location.pathname === application ? "activeLink" : ''}
					to={application}
				>
					<div className={css.centeredImage}>
						<Image
							alt="logo"
							src={AddJob}
							width="28"
							height="25"
						/>
					</div>
					<span>Applications</span>
				</Link>
			</div>

			<div className={`mb-3 ${css.centeredImageContainer}`}>
				<Link className={location.pathname === settings ? "activeLink" : ''}
					to={settings}
				>
					<div className={css.centeredImage}>
						<Image
							alt="logo"
							src={setting}
							width="28"
							height="25"
						/>
					</div>
					<span>Settings</span>
				</Link>
			</div>
			<div className={`mb-3 ${css.centeredImageContainer}`}>
				<Link
					onClick={handleLinkClick}
					to={'/'}
				>
					<div className={css.centeredImage}>
						<Image
							alt="logo"
							src={logoutImg}
							width="28"
							height="25"
						/>
					</div>
					<span>Logout  </span>
				</Link>
			</div>

		</Card>
	);
};

export default EmployerTabletProfileCard;
