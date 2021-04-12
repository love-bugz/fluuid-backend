import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'class-validator';
import * as Yup from 'yup';
import { NotFoundError } from './notFoundError';
import { BadRequestError } from './badRequestError';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	let message: string;
	let error: string;
	let statusCode: number;

	if (err instanceof Yup.ValidationError) {
		if (err.errors.length > 0) message = err.errors[0];
		statusCode = 400;
		error = 'Validation Error';
	}

	if (err instanceof NotFoundError || err instanceof BadRequestError) {
		message = err.message;
		statusCode = err.statusCode;
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
			statusCode = 400;
			error = 'Validation Error';
		}

		// SQLITE constraint
		if (key === 'errno') {
			error = 'SQL Error';
		}

		if (key === 'statusCode') {
			statusCode = err[key];
		}

		if (key === 'message' && !message) {
			message = err[key];
		}
	}

	// @ts-ignore
	statusCode = statusCode || 500;
	// @ts-ignore
	message = message || 'Something went wrong';
	// @ts-ignore
	error = error || 'Undefined Error'; //change to "Undefined Error"

	res.status(statusCode).json({ statusCode, message, error });
};
