export class BadRequestError extends Error {
	message: string;
	status: number;
	error: string;

	constructor(message: string) {
		super();
		this.message = message;
		this.status = 400;
		this.error = 'Bad Request Error';
	}
}
