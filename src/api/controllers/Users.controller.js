"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const User_model_1 = require("../models/User.model");
const userRepo = () => typeorm_1.getRepository(User_model_1.User);
class UserController {
    async findAll(_req, res) {
        const users = await userRepo().find();
        res.status(200).json(users);
    }
    async findById(req, res) {
        const user = req.user;
        res.status(200).json(user);
    }
    async findByHandle(req, res) {
        const user = req.user;
        res.status(200).json(user);
    }
    async findByEmailId(req, res) {
        const user = req.user;
        res.status(200).json(user);
    }
    async createUser(req, res, next) {
        const { emailId, handle } = req.user;
        const user = new User_model_1.User();
        user.emailId = emailId;
        user.handle = handle;
        try {
            const errors = await class_validator_1.validate(user);
            if (errors.length > 0)
                next(errors);
            else {
                const savedUser = await userRepo().save(user);
                res.status(201).json(savedUser);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async deleteUser(req, res) {
        const user = new User_model_1.User();
        user.id = req.user.id;
        user.emailId = req.user.emailId;
        await userRepo().remove(user);
        res.status(200).json({ message: 'user deleted' });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=Users.controller.js.map