"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropletRoutes = void 0;
const Droplets_controller_1 = require("../controllers/Droplets.controller");
const Base_middleware_1 = require("../middleware/Base.middleware");
const Users_middleware_1 = require("../middleware/Users.middleware");
const Droplets_middleware_1 = require("../middleware/Droplets.middleware");
const BASE_PATH = '/droplets';
const DropletRoutes = [
    {
        path: BASE_PATH + '/',
        method: 'get',
        action: new Droplets_controller_1.DropletController().findAll,
        middleware: [Base_middleware_1.beginLoggingMW],
    },
    {
        path: BASE_PATH + '/',
        method: 'post',
        action: new Droplets_controller_1.DropletController().createDroplet,
        middleware: [Base_middleware_1.beginLoggingMW, Users_middleware_1.isUser, Droplets_middleware_1.validateNewDroplet],
    },
];
exports.DropletRoutes = DropletRoutes;
//# sourceMappingURL=Droplet.routes.js.map