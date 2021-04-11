import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const message = err.message || 'Something went wrong';
	console.error(err);
	res.status(500).json({ message: message, error: err.toString() });
};
