import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'class-validator';
import * as Yup from 'yup';
import { NotFoundError } from './notFoundError';
import { BadRequestError } from './badRequestError';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	let message: string;
	let error: string;
	let status: number;

	if (err instanceof Yup.ValidationError) {
		if (err.errors.length > 0) message = err.errors[0];
		status = 400;
		error = 'Validation Error';
	}

	if (err instanceof NotFoundError || err instanceof BadRequestError) {
		message = err.message;
		status = err.status;
		error = err.error;
	}

	for (let key in err) {
		console.log('KEY', key, 'VALUE', err[key]); // FOR DEVELOPMENT
		// class-validator ValidationError
		if (err[key] instanceof ValidationError) {
			if (Object.keys(err[key].constraints).length > 0) {
				const first = Object.keys(err[key].constraints)[0];
				message = err[key].constraints[first];
			}
			status = 400;
			error = 'Validation Error';
		}

		// SQLITE constraint
		if (key === 'errno') {
			error = 'SQL Error';
		}
	}

	// @ts-ignore
	status = status || err.statusCode || 500;
	// @ts-ignore
	message = message || err.message || 'Something went wrong';
	// @ts-ignore
	error = error || 'Undefined Error'; //change to "Undefined Error"

	res.status(status).json({ status, message, error });
};
