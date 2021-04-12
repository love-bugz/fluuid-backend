import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Droplet } from '../models/Droplet.model';
import { v4 as uuid } from 'uuid';

const dropletsRepo = () => getRepository(Droplet);

export class DropletController {
	async findAll(req: Request, res: Response) {
		const droplets = await dropletsRepo().find();
		res.status(200).json(droplets);
	}

	async createDroplet(req: Request, res: Response, next: NextFunction) {
		const { createdByUserId, title, audioTrack, isReply } = req.body;
		const droplet = new Droplet();
		droplet.createdByUserId = createdByUserId;
		droplet.title = title;
		droplet.audioTrack = audioTrack;
		droplet.isReply = isReply;
		droplet.id = uuid();

		console.log(droplet);
		try {
			const errors = await validate(droplet);
			if (errors.length > 0) next(errors);
			else {
				console.log('HERE 1');
				// const savedDroplet = await dropletsRepo().save(droplet);
				const saveDropletQuery = dropletsRepo().createQueryBuilder('droplet').insert().into('droplets').values(droplet).getSql();
				const savedDroplet = dropletsRepo().query(saveDropletQuery);
				console.log('HERE TOO');
				res.status(201).json(savedDroplet);
			}
		} catch (err) {
			next(err);
		}
	}
}
