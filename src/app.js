"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const compose_middleware_1 = require("compose-middleware");
const cors_1 = __importDefault(require("cors"));
// DATABASE CONNECTION
const db_1 = require("./api/db");
// ROUTERS/CONTROLLERS
const User_routes_1 = require("./api/routes/User.routes");
const Droplet_routes_1 = require("./api/routes/Droplet.routes");
// ERROR HANDLER
const errorHandler_1 = require("./api/services/errorHandler");
db_1.connect();
// MIDDLEWARE
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/', (_req, res) => {
    console.log('Sanity test ran.');
    res.send('<h1>Hello, Sanity test.</h1>');
});
const AppRoutes = [...User_routes_1.UserRoutes, ...Droplet_routes_1.DropletRoutes];
AppRoutes.forEach(route => {
    //@ts-ignore
    app[route.method](route.path, compose_middleware_1.compose(route.middleware), (req, res, next) => {
        route
            .action(req, res, next)
            .then(() => next)
            .catch(err => next(err));
    });
});
// USE ERROR HANDLER
app.use(errorHandler_1.errorHandler);
//# sourceMappingURL=app.js.map