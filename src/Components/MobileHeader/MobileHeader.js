import React, { useState } from "react";
import {
	Navbar,
	Nav,
	Container,
	Offcanvas,
	Image,
} from "react-bootstrap";
import logo from '../../images/Header/LogoImg.svg'
import MobileSideBar from "../MobileSideBar/MobileSideBar";
import { Link } from "react-router-dom";

const MobileHeader = () => {
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const handleToggleOffcanvas = () => {
		setShowOffcanvas(!showOffcanvas);
	};

	const closeOffcanvas = (value) => {
		setShowOffcanvas(value);
	};

	return (
		<Navbar bg="light" expand="lg" style={{ height: '5.5rem' }} >
			<Container className="pe-4">
				<Nav style={{ marginLeft: '3rem' }}>
					<Link to='/'>
						<Image
							alt="logo"
							src={logo}
							width="130"
							height="50"
						/>
					</Link>
				</Nav>
				<Navbar.Toggle
					aria-controls="offcanvas-nav"
					onClick={handleToggleOffcanvas}
					style={{ marginLeft: "0.9rem" }}
				/>
				<Offcanvas
					style={{ width: "80%", height: "100%", marginTop: "5px" }}
					show={showOffcanvas}
					onHide={() => setShowOffcanvas(false)}
					placement={'end'} name={'end'}
				>
					<Offcanvas.Body>
						<Nav className="flex-column">
							<MobileSideBar closeOffcanvas={closeOffcanvas} />
						</Nav>
					</Offcanvas.Body>
				</Offcanvas>
			</Container>
		</Navbar>
	);
};

export default MobileHeader;
