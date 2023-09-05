import React from "react";
import { Alert } from "react-bootstrap";
import css from './ErrorAlert.module.css'

const ErrorAlert = ({ message }) => {
	return (
		<Alert className={css.Error} variant="danger">
			{message}
		</Alert>
	);
};

export default ErrorAlert;
