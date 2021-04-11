import { createUser, findAll, findByEmailId, findByHandle, findById } from '../controllers/Users.controller';
import { beginLoggingMW } from '../middleware/Base.middleware';
import { validateNewUser } from '../middleware/Users.middleware';

const BASE_PATH = '/users';

const UserRoutes = [
	{
		path: BASE_PATH + '/',
		method: 'get',
		action: findAll,
		middleware: [beginLoggingMW],
	},
	{
		path: BASE_PATH + '/id/:id',
		method: 'get',
		action: findById,
		middleware: [beginLoggingMW],
	},
	{
		path: BASE_PATH + '/emailId',
		method: 'get',
		action: findByEmailId,
		middleware: [beginLoggingMW],
	},
	{
		path: BASE_PATH + '/handle/:handle',
		method: 'get',
		action: findByHandle,
		middleware: [beginLoggingMW],
	},
	{
		path: BASE_PATH + '/',
		method: 'post',
		action: createUser,
		middleware: [beginLoggingMW, validateNewUser],
	},
];

export { UserRoutes };
