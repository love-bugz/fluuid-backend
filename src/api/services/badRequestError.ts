export class BadRequestError extends Error {
	message: string;
	statusCode: number;
	error: string;

	constructor(message: string) {
		super();
		this.message = message;
		this.statusCode = 400;
		this.error = 'Bad Request Error';
	}
}
