import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Droplet } from '../models/Droplet.model';

const dropletsRepo = () => getRepository(Droplet);

export class DropletController {
	async findAll(req: Request, res: Response) {
		const droplets = await dropletsRepo().find();
		res.status(200).json(droplets);
	}

	async createDroplet(req: Request, res: Response, next: NextFunction) {
		const { createdByUser, title, audioTrack, isReply } = req.body;
		const droplet = new Droplet();
		droplet.createdByUser = createdByUser;
		droplet.title = title;
		droplet.audioTrack = audioTrack;
		droplet.isReply = isReply;

		try {
			const errors = await validate(droplet);
			if (errors.length > 0) next(errors);
			else {
				const savedDroplet = await dropletsRepo().save(droplet);
				res.status(201).json(savedDroplet);
			}
		} catch (err) {
			next(err);
		}
	}

	async deleteDroplet(req: Request, res: Response) {
		const droplet = new Droplet();
		droplet.id = req.droplet.id;
		droplet.createdByUser = req.droplet.createdByUser;

		await dropletsRepo().remove(droplet);
		res.status(200).json({ message: 'droplet deleted' });
	}
}
