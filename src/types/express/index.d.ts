import { UserType } from '../User';
import { DropletType } from '../Droplet';

declare global {
	namespace Express {
		export interface Request {
			user: UserType;
			droplet: DropletType;
		}
	}
}
