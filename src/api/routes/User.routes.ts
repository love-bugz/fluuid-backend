import { findAll, findByHandle, findById } from '../controllers/Users.controller';

const BASE_PATH = '/users';

const UserRoutes = [
	{
		path: BASE_PATH + '/',
		method: 'get',
		action: findAll,
	},
	{
		path: BASE_PATH + '/:id',
		method: 'get',
		action: findById,
	},
	{
		path: BASE_PATH + '/handle/:handle',
		method: 'get',
		action: findByHandle,
	},
];

export { UserRoutes };
