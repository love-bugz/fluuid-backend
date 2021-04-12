"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
// import { createUser, deleteUser, findAll, findByEmailId, findByHandle, findById } from '../controllers/Users.controller';
const Users_controller_1 = require("../controllers/Users.controller");
const Base_middleware_1 = require("../middleware/Base.middleware");
const Users_middleware_1 = require("../middleware/Users.middleware");
const BASE_PATH = '/users';
const UserRoutes = [
    {
        path: BASE_PATH + '/',
        method: 'get',
        action: new Users_controller_1.UserController().findAll,
        middleware: [Base_middleware_1.beginLoggingMW],
    },
    {
        path: BASE_PATH + '/id/:id',
        method: 'get',
        action: new Users_controller_1.UserController().findById,
        middleware: [Base_middleware_1.beginLoggingMW, Users_middleware_1.isUser],
    },
    {
        path: BASE_PATH + '/emailId/:emailId',
        method: 'get',
        action: new Users_controller_1.UserController().findByEmailId,
        middleware: [Base_middleware_1.beginLoggingMW, Users_middleware_1.isUser],
    },
    {
        path: BASE_PATH + '/handle/:handle',
        method: 'get',
        action: new Users_controller_1.UserController().findByHandle,
        middleware: [Base_middleware_1.beginLoggingMW, Users_middleware_1.isUser],
    },
    {
        path: BASE_PATH + '/',
        method: 'post',
        action: new Users_controller_1.UserController().createUser,
        middleware: [Base_middleware_1.beginLoggingMW, Users_middleware_1.validateNewUser],
    },
    {
        path: BASE_PATH + '/:emailId',
        method: 'delete',
        action: new Users_controller_1.UserController().deleteUser,
        middleware: [Base_middleware_1.beginLoggingMW, Users_middleware_1.isUser],
    },
];
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=User.routes.js.map