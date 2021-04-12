export class NotFoundError extends Error {
	message: string;
	statusCode: number;
	error: string;

	constructor(message: string) {
		super();
		this.message = message;
		this.statusCode = 404;
		this.error = 'Not Found Error';
	}
}
