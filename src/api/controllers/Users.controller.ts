import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User.model';

async function findAll(_req: Request, res: Response) {
	const repository = getRepository(User);
	const users = await repository.find();
	res.status(200).json(users);
}

async function findById(req: Request, res: Response) {
	const repository = getRepository(User);
	const user = await repository.findOne(req.params.id);
	res.status(200).json(user);
}

async function findByHandle(req: Request, res: Response) {
	const repository = getRepository(User);
	const user = await repository.findOne({ handle: req.params.handle });
	res.status(200).json(user);
}

async function findByEmailId(req: Request, res: Response) {
	const repository = getRepository(User);
	const user = await repository.findOne({ emailId: req.body.emailId });
	if (user) {
		res.status(200).json({ handle: user.handle });
	} else {
		res.status(404).json({ message: 'user not found' });
	}
}

async function createUser(req: Request, res: Response, next: NextFunction) {
	const repository = getRepository(User);
	const { emailId, handle } = req.user;
	const user = new User();
	user.emailId = emailId;
	user.handle = handle;

	try {
		const errors = await validate(user);
		if (errors.length > 0) next(errors);
		else {
			const savedUser = await repository.save(user);
			res.status(201).json(savedUser);
		}
	} catch (err) {
		next(err);
	}
}

export { findAll, findById, findByHandle, findByEmailId, createUser };
