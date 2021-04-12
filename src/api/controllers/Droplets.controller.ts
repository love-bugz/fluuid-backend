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
		const { createdByUserId, title, audioTrack, isReply } = req.droplet;
		const droplet = new Droplet();
		droplet.createdByUserId = createdByUserId;
		droplet.title = title;
		droplet.audioTrack = audioTrack;
		droplet.isReply = isReply;

		console.log(req.droplet);
		try {
			const errors = await validate(droplet);
			if (errors.length > 0) next(errors);
			else {
				console.log('HERE');
				const savedDroplet = await dropletsRepo().save(droplet);
				res.status(201).json(savedDroplet);
			}
		} catch (err) {
			next(err);
		}
	}
}
