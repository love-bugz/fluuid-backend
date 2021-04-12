import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User.model';

const userRepo = () => getRepository(User);

export class UserController {
	async findAll(_req: Request, res: Response) {
		const users = await userRepo().find();
		res.status(200).json(users);
	}

	async findById(req: Request, res: Response) {
		const user = req.user;
		res.status(200).json(user);
	}

	async findByHandle(req: Request, res: Response) {
		const user = req.user;
		res.status(200).json(user);
	}

	async findByEmailId(req: Request, res: Response) {
		const user = req.user;
		res.status(200).json({ handle: user.handle });
	}

	async createUser(req: Request, res: Response, next: NextFunction) {
		const { emailId, handle } = req.user;
		const user = new User();
		user.emailId = emailId;
		user.handle = handle;

		try {
			const errors = await validate(user);
			if (errors.length > 0) next(errors);
			else {
				const savedUser = await userRepo().save(user);
				res.status(201).json(savedUser);
			}
		} catch (err) {
			next(err);
		}
	}

	async deleteUser(req: Request, res: Response) {
		const user = new User();
		user.id = req.user.id;
		user.emailId = req.user.emailId;

		await userRepo().remove(user);
		res.status(200).json({ message: 'user deleted' });
	}
}
