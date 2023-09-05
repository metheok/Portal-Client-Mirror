import React, { useState } from "react";
import {
	Navbar,
	Nav,
	FormControl,
	Form,
	Container,
	Offcanvas,
	Image,
} from "react-bootstrap";
import Bell from "../../images/bell.svg";
import Search from "../../images/search.svg";
import JobseekerLoggedSideBar from "../MobileSideBar/JobseekerLoggedSideBar";
import { useNavigate } from "react-router-dom";

const JobseekerLoggedHeader = ({ user }) => {
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const navigate = useNavigate();

	const handleToggleOffcanvas = () => {
		setShowOffcanvas(!showOffcanvas);
	};

	const closeOffcanvas = (value) => {
		setShowOffcanvas(value);
	};


	return (
		<Navbar bg="light" expand="lg" className="mb-3">
			<Container className="p-0">
				<Navbar.Toggle
					aria-controls="offcanvas-nav"
					onClick={handleToggleOffcanvas}
					style={{ marginLeft: "0.9rem" }}
				/>

				<Offcanvas
					style={{ width: "80%", height: "97%" }}
					show={showOffcanvas}
					onHide={() => setShowOffcanvas(false)}
				>
					<Offcanvas.Body>
						<Nav className="flex-column">
							<JobseekerLoggedSideBar user={user} closeOffcanvas={closeOffcanvas} />
						</Nav>
					</Offcanvas.Body>
				</Offcanvas>

				<Nav className="d-flex flex-row ml-auto">
				<Image
						alt="logo"
						src={Search}
						width="22"
						height="22"
						style={{ marginRight: "1.2rem" }}
						onClick={() => navigate('/dashboard/search-jobs')}
					/>
					<Image
						alt="logo"
						src={Bell}
						width="22"
						height="22"
						style={{ marginRight: "2.2rem" }}
					/>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default JobseekerLoggedHeader;
