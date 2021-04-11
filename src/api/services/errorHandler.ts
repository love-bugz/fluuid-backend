import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'class-validator';
import * as Yup from 'yup';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let message: string;
	console.error(err);
	let error: string;
	let status: number;
	let details: string[] = [];

	if (err instanceof Yup.ValidationError) {
		if (err.errors.length > 0) message = err.errors[0];
		status = 400;
		error = 'Validation Error';
	}

	for (let key in err) {
		console.log('KEY', key, err[key]);
		// class-validator ValidationError
		if (err[key] instanceof ValidationError) {
			if (Object.keys(err[key].constraints).length > 0) {
				for (let i in err[key].constraints) {
					details.push(err[key].constraints[i]);
				}
			}
			status = 400;
			if (details.length > 0) {
				message = details[0];
				details.pop();
			}
			error = 'Validation Error';
		}

		// SQLITE constraint
		if (key === 'errno') {
			if (err[key] === 19) {
				error = 'SQL Constraint Error';
				message = err.message;
			}
		}
	}

	// @ts-ignore
	status = status || 500;
	// @ts-ignore
	message = message || 'Something went wrong';
	// @ts-ignore
	error = error || JSON.stringify(err); //change to "Undefined Error"

	const response: ErrorResponse = { status, message, error };

	res.status(status).json(response);
};

export type ErrorResponse = {
	[key: string]: any;
};
