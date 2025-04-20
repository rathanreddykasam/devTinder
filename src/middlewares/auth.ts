import { NextFunction, Request, Response } from 'express';
import { User } from '../models/schemas/user';
const jwt = require('jsonwebtoken');

const userAuth = async (
	req: Request,
	res: Response<string>,
	next: NextFunction
) => {
	try {
		const { token } = req.cookies;
		if (!token) {
			throw new Error('Invalid Token!');
		}

		const decodedObj = await jwt.verify(token, 'DEV@Tinder$790');
		if (!decodedObj) {
			throw new Error('Invalid Token!');
		}
		const { _id } = decodedObj;
		const user = await User.findById(_id);
		if (!user) {
			throw new Error('User not found!');
		}
		(req as any).user = user;
		next();
	} catch (err: unknown) {
		const errorMessage =
			err instanceof Error
				? err.message
				: 'Something went wrong! Please try again';
		res.status(400).send(errorMessage);
	}
};

export { userAuth };
