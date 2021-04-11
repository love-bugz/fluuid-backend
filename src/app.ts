import express, { NextFunction, Request, Response } from 'express';

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

app.get('/', (_req, res) => {
	console.log('Sanity test ran.');
	res.send('<h1>Hello, Sanity test.</h1>');
});

const AppRoutes = [...UserRoutes];

AppRoutes.forEach(route => {
	(app as any)[route.method](route.path, (req: Request, res: Response, next: NextFunction) => {
		route
			.action(req, res)
			.then(() => next)
			.catch(err => next(err));
	});
});

// USE ERROR HANDLER
app.use(errorHandler);

export { app };
