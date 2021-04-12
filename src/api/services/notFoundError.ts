export class NotFoundError extends Error {
	message: string;
	status: number;
	error: string;

	constructor(message: string) {
		super();
		this.message = message;
		this.status = 404;
		this.error = 'Not Found Error';
	}
}
