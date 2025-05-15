import { IUser } from '../src/models/schemas/user';

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}
