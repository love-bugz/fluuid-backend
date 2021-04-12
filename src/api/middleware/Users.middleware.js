"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = exports.validateNewUser = void 0;
const Yup = __importStar(require("yup"));
const typeorm_1 = require("typeorm");
const User_model_1 = require("../models/User.model");
const notFoundError_1 = require("../services/notFoundError");
const badRequestError_1 = require("../services/badRequestError");
function userRegistrationSchema() {
    return Yup.object().shape({
        emailId: Yup.string().strict(false).trim().required(),
        handle: Yup.string().strict(false).trim().required(),
    });
}
const validateNewUser = async (req, _res, next) => {
    try {
        const userToCheck = req.body;
        const user = await userRegistrationSchema().validate(userToCheck, { abortEarly: false });
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateNewUser = validateNewUser;
const isUser = async (req, _res, next) => {
    try {
        if (Object.keys(req.params).length === 0 && Object.keys(req.body).length === 0)
            throw new badRequestError_1.BadRequestError('Must include user id information');
        let query = 'default';
        let obj = {};
        const path = req.path.split('/');
        if (path.includes('id')) {
            query = `users.id = :id`;
            obj['id'] = req.params.id;
        }
        else if (path.includes('handle')) {
            query = `users.handle = :handle`;
            obj['handle'] = req.params.handle;
        }
        else if (path.includes('emailId') || req.method === 'DELETE') {
            query = `users.emailId = :emailId`;
            obj['emailId'] = req.params.emailId;
        }
        else if (path.includes('droplets')) {
            query = `users.id = :id`;
            obj['id'] = req.body.createdByUserId;
        }
        const user = await typeorm_1.getRepository(User_model_1.User).createQueryBuilder('users').where(query, obj).getOne();
        if (!user)
            throw new notFoundError_1.NotFoundError('User not found');
        else {
            req.user = user;
            next();
        }
    }
    catch (err) {
        next(err);
    }
};
exports.isUser = isUser;
//# sourceMappingURL=Users.middleware.js.map