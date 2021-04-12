"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropletController = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Droplet_model_1 = require("../models/Droplet.model");
const dropletsRepo = () => typeorm_1.getRepository(Droplet_model_1.Droplet);
class DropletController {
    async findAll(req, res) {
        const droplets = await dropletsRepo().find();
        res.status(200).json(droplets);
    }
    async createDroplet(req, res, next) {
        const { createdByUserId, title, audioTrack, isReply } = req.droplet;
        const droplet = new Droplet_model_1.Droplet();
        droplet.createdByUserId = createdByUserId;
        droplet.title = title;
        droplet.audioTrack = audioTrack;
        droplet.isReply = isReply;
        console.log(req.droplet);
        try {
            const errors = await class_validator_1.validate(droplet);
            if (errors.length > 0)
                next(errors);
            else {
                console.log('HERE');
                const savedDroplet = await dropletsRepo().save(droplet);
                res.status(201).json(savedDroplet);
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.DropletController = DropletController;
//# sourceMappingURL=Droplets.controller.js.map