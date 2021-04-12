// import { createUser, deleteUser, findAll, findByEmailId, findByHandle, findById } from '../controllers/Users.controller';
import { UserController } from '../controllers/Users.controller';
import { beginLoggingMW } from '../middleware/Base.middleware';
import { isUser, validateNewUser } from '../middleware/Users.middleware';

const BASE_PATH = '/users';

const UserRoutes = [
	{
		path: BASE_PATH + '/',
		method: 'get',
		action: new UserController().findAll,
		middleware: [beginLoggingMW],
	},
	{
		path: BASE_PATH + '/id/',
		method: 'get',
		action: new UserController().findById,
		middleware: [beginLoggingMW, isUser],
	},
	{
		path: BASE_PATH + '/emailId',
		method: 'get',
		action: new UserController().findByEmailId,
		middleware: [beginLoggingMW, isUser],
	},
	{
		path: BASE_PATH + '/handle/',
		method: 'get',
		action: new UserController().findByHandle,
		middleware: [beginLoggingMW, isUser],
	},
	{
		path: BASE_PATH + '/',
		method: 'post',
		action: new UserController().createUser,
		middleware: [beginLoggingMW, validateNewUser],
	},
	{
		path: BASE_PATH + '/',
		method: 'delete',
		action: new UserController().deleteUser,
		middleware: [beginLoggingMW, isUser],
	},
];

export { UserRoutes };
