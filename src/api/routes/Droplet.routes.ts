import { DropletController } from '../controllers/Droplets.controller';
import { beginLoggingMW } from '../middleware/Base.middleware';
import { isUser } from '../middleware/Users.middleware';
import { validateNewDroplet } from '../middleware/Droplets.middleware';

const BASE_PATH = '/droplets';

const DropletRoutes = [
	{
		path: BASE_PATH + '/',
		method: 'get',
		action: new DropletController().findAll,
		middleware: [beginLoggingMW],
	},
	{
		path: BASE_PATH + '/',
		method: 'post',
		action: new DropletController().createDroplet,
		middleware: [beginLoggingMW, isUser, validateNewDroplet],
	},
];

export { DropletRoutes };
