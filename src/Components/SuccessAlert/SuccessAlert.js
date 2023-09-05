import React from "react";
import { Alert } from "react-bootstrap";
import css from './SuccessAlert.module.css'

const SuccessAlert = ({ message }) => {
	return (
		<Alert className={css.Alert} variant="success">
			{message}
		</Alert>
	);
};

export default SuccessAlert;