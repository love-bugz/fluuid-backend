import { Request, Response } from 'express';
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

export { findAll, findById, findByHandle };
