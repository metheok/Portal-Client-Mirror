import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import notes from '../../images/notes.svg';
import css from './OnScreenMenu.module.css';
import { Link } from 'react-router-dom';

const OnScreenMenu = () => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<style>
				{`
				.modal-content {
					border: none;
				}
				`}
			</style>

			<div className={`${css.container}`}>
				<div className={css.content}>
					<button onClick={toggleModal} className={css.button}>
						<img src={notes} alt="notes" />
					</button>
					<Modal show={showModal} onHide={toggleModal} className={css.modal} centered>
						<Modal.Body className={css.modalBody}>
							<ul className={css.menuList}>
								<Link to={'/dashboard/settings/privacy'}><li onClick={() => setShowModal(false)}>Privacy</li></Link>
								<Link to={'/dashboard/settings/security'}><li onClick={() => setShowModal(false)}>Security</li></Link>
								<Link to={'/dashboard'}><li onClick={() => setShowModal(false)}>Company Details</li ></Link>
								<Link to={'/dashboard/settings/update-profile'}><li style={{ margin: '0' }} onClick={() => setShowModal(false)}>Update Profile</li></Link>
							</ul>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default OnScreenMenu;
