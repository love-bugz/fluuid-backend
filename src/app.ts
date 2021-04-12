import express, { NextFunction, Request, Response } from 'express';
import { compose } from 'compose-middleware';
import cors from 'cors';

// DATABASE CONNECTION
import { connect } from './api/db';

// ROUTERS/CONTROLLERS
import { UserRoutes } from './api/routes/User.routes';

// ERROR HANDLER
import { errorHandler } from './api/services/errorHandler';

connect();

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
	console.log('Sanity test ran.');
	res.send('<h1>Hello, Sanity test.</h1>');
});

const AppRoutes = [...UserRoutes];

AppRoutes.forEach(route => {
	//@ts-ignore
	(app as any)[route.method](route.path, compose(route.middleware), (req: Request, res: Response, next: NextFunction) => {
		route
			.action(req, res, next)
			.then(() => next)
			.catch(err => next(err));
	});
});

// USE ERROR HANDLER
app.use(errorHandler);
export { app };
