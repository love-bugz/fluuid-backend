import * as Yup from 'yup';
import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User.model';
import { NotFoundError } from '../services/notFoundError';
import { BadRequestError } from '../services/badRequestError';

function userRegistrationSchema() {
	return Yup.object().shape({
		emailId: Yup.string().strict(false).trim().required(),
		handle: Yup.string().strict(false).trim().required(),
	});
}

const validateNewUser: RequestHandler = async (req, _res, next) => {
	try {
		const userToCheck = req.body;
		const user = await userRegistrationSchema().validate(userToCheck, { abortEarly: false });
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};

const isUser: RequestHandler = async (req, _res, next) => {
	try {
		if (Object.keys(req.params).length === 0 && Object.keys(req.body).length === 0) throw new BadRequestError('Must include user id information');

		let query: string = 'default';
		let obj: QueryObject = {};

		const path = req.path.split('/');

		if (path.includes('id')) {
			query = `users.id = :id`;
			obj['id'] = req.params.id;
		} else if (path.includes('handle')) {
			query = `users.handle = :handle`;
			obj['handle'] = req.params.handle;
		} else if (path.includes('emailId') || req.method === 'DELETE') {
			query = `users.emailId = :emailId`;
			obj['emailId'] = req.params.emailId;
		}

		const user = await getRepository(User).createQueryBuilder('users').where(query, obj).getOne();

		if (!user) throw new NotFoundError('User not found');
		else {
			req.user = user;
			next();
		}
	} catch (err) {
		next(err);
	}
};

export type QueryObject = {
	[key: string]: any;
};

export { validateNewUser, isUser };
