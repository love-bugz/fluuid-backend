import { UserType } from '../User';

declare global {
	namespace Express {
		export interface Request {
			user: UserType;
		}
	}
}
