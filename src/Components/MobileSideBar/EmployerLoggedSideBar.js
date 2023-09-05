import React from "react";
import { Card, Image, Accordion } from "react-bootstrap";
import job from "../../images/SideBarIcons/job-seeker.svg";
import candidate from "../../images/SideBarIcons/add.svg";
import referral from "../../images/SideBarIcons/Network.svg";
import company from '../../images/Employer/companyDetails.svg'
import AddJob from '../../images/Employer/addAJob.svg'
import setting from "../../images/settings.svg";
import logout from "../../images/exit.svg";
import ProfileImg from "../../images/profile.png";
import { Link } from "react-router-dom";
import { logoutAndClearUser } from "../../state/auth/authSlice";
import { useDispatch } from "react-redux";
import Avatar from '../Avatar/AvatarProfile'

const EmployerLoggedSideBar = ({ closeOffcanvas, user }) => {


	const dispatch = useDispatch();
	const handleLinkClick = () => {
		dispatch(logoutAndClearUser());
	};

	/*  ----------------  Employer Details ------------------*/

	const employerDetails = [
		{
			icon: job,
			title: "Jobs",
			Subtitle: [
				{ name: "Posted Jobs", link: "/dashboard/jobs?status=live" },
				{ name: "Drafts", link: "/dashboard/jobs?status=draft" },
				{ name: "Closed jobs", link: "/dashboard/jobs?status=closed" },
			],
			link: "/dashboard/jobs?status=live",
		},
		{
			icon: candidate,
			title: "Applications",
			Subtitle: [
				{ name: "View Applications", link: "/dashboard/jobs?status=live" },
				{ name: "Shortlisted Candidates", link: "/dashboard/jobs?status=draft" },
				{ name: "Hired Candidates", link: "/dashboard/jobs?status=closed" },
				{ name: "Rejected Candidates", link: "/dashboard/jobs?status=closed" },
			],
			link: "application",
		},
	];

	const closeToggleOffcanvas = () => {
		closeOffcanvas(false);
	};

	return (
		<>
			<style>
				{`
        button:hover {
           background-color: var(--formBg) !important;
        }
        .heading {
          font-family: Open Sans;
          font-size: 20px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0.15000000596046448px;
          text-align: left;
        }

        .profileLink {
          font-family: Open Sans;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          letter-spacing: 0.25px;
          text-align: left;
          color: rgba(22, 118, 243, 1);
        }

        .title {
          font-family: Open Sans;
          font-size: 14px;
          font-weight: 600;
          line-height: 24px;
          letter-spacing: 0.10000000149011612px;
          text-align: left;
        }
								.sideProfileTag ul {
										padding-left: 1rem;
								}

								.sideProfileTag ul li {
										margin-top: 0.7rem;
										margin-bottom: 1.6rem;
										list-style-type: none;
								}

								.sideProfileTag li a {
										position: relative;
										height: 100%;
										cursor: pointer;
										color: #000;
										padding-left: 16px;
								}

        `}
			</style>
			<div className=" d-block profileHead ">
				<Link to={"/dashboard"}>
					<div style={{ display: 'flex', alignItems: 'left', marginBottom: '0.6rem' }}>
						<Avatar user={user.user} size={40} />
					</div>
					<h5 className='heading'>{user.user.profile.name}</h5>
				</Link>
				<Link
					to="/dashboard/settings/update-profile"
					className="profileLink"
					onClick={closeToggleOffcanvas}
				>
					Update Profile
				</Link>
			</div>

			<Card.Body style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}>
				<div className="sideProfileTag">
					<ul style={{ marginBottom: '0.5rem', marginTop: '2rem' }}>
						<li>
							{" "}
							<Image
								alt="logo"
								src={company}
								width="24"
								height="24"
								className="float-start me-2"
							/>
							<Link to="/dashboard/company/about"><span className="title">Company Details </span></Link>{" "}
						</li>
						<li style={{ marginBottom: '0rem' }}>
							{" "}
							<Image
								alt="logo"
								src={AddJob}
								width="24"
								height="24"
								className="float-start me-2"
							/>
							<Link to="/dashboard/job/edit-job/new/post-job"><span className="title">Add a Job </span></Link>{" "}
						</li>
					</ul>
				</div>

				{employerDetails.map((detail, index) => (
					<Accordion key={index}>
						<Accordion.Item eventKey={detail.icon}>
							<Accordion.Header>
								<Image
									alt="logo"
									src={detail.icon}
									width="24"
									height="24"
									className="float-start me-2"
								/>
								<Link to={detail.link}><span className="title">{detail.title} </span></Link>
							</Accordion.Header>
							<Accordion.Body>
								{detail.Subtitle.map((subtitle, subIndex) => (
									<p key={subIndex} className="ms-2">
										<Link to={subtitle.link}>{subtitle.name}</Link>
									</p>
								))}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				))}
				<div className="sideProfileTag">
					<ul>
						<li>
							<Image
								alt="logo"
								src={setting}
								width="24"
								height="24"
								className="float-start me-2"
							/>
							<Link to="/dashboard/settings"><span className="title">Settings </span></Link>
						</li>
					</ul>

					<div className="sideLogout">
						<Image
							alt="logo"
							src={logout}
							width="24"
							height="24"
							className="float-start me-2"
						/>
						<Link to="/" onClick={handleLinkClick}><span className="title">Logout </span></Link>
					</div>
				</div>
			</Card.Body>

		</>
	);
};

export default EmployerLoggedSideBar;
