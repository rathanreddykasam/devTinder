import { NextFunction, Request, Response } from 'express';
import { IErrorResponse } from '../models/responses/errorResponse';

const userAuth = (
	req: Request,
	res: Response<IErrorResponse>,
	next: NextFunction
): void => {
	const token = 'xyz';
	const authenticationToken = token === 'xyz';
	if (!authenticationToken) {
		res.status(401).json({
			statusCode: 401,
			status: 'Unauthorised Request',
			message:
				"You are not allowed to access please contact you'r administrator ",
		});
		return;
	}
	next();
};

const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
	const token = 'xyz';
	const authenticationToken = token === 'xyz';
	if (!authenticationToken) {
		res.status(401).json({
			statusCode: 401,
			status: 'Unauthorised Request',
			message:
				"You are not allowed to access please contact you'r administrator ",
		});
		return;
		return;
	}
	next();
};

export { userAuth, adminAuth };
