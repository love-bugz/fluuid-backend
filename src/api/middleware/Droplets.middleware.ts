import * as Yup from 'yup';
import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import { Droplet } from '../models/Droplet.model';
import { NotFoundError } from '../services/notFoundError';
import { BadRequestError } from '../services/badRequestError';

function dropletCreationSchema() {
	return Yup.object().shape({
		title: Yup.string().strict(false).trim().required(),
		audioTrack: Yup.string().strict(false).trim().required(),
		createdByUser: Yup.string().strict(false).trim().required(),
		isReply: Yup.boolean().required(),
	});
}

const validateNewDroplet: RequestHandler = async (req, res, next) => {
	try {
		const dropletToCheck = { ...req.body };
		// console.log(`DROPLET TO CHECK: ${JSON.stringify(dropletToCheck)}`);
		const droplet = await dropletCreationSchema().validate(dropletToCheck, { abortEarly: false });
		req.droplet = droplet;
		next();
	} catch (err) {
		next(err);
	}
};

const isDroplet: RequestHandler = async (req, res, next) => {
	try {
		if (Object.keys(req.params).length === 0) throw new BadRequestError('Must include droplet id information');

		const droplet = await getRepository(Droplet).findOne({ id: req.params.id });

		if (!droplet) throw new NotFoundError('Droplet not found');
		else {
			req.droplet = droplet;
			next();
		}
	} catch (err) {
		next(err);
	}
};

export { validateNewDroplet, isDroplet };
