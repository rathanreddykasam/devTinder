import { Request, Response } from 'express';
import { validateRequest } from '../middlewares/validate';
import {
	UserLoginRequest,
	UserSignUpRequest,
} from '../models/requestDTO/userAuthRequest';
import { ICommonResponse } from '../models/responses/commonResponse';
import { User } from '../models/schemas/user';

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

authRouter.post(
	'/login',
	validateRequest(UserLoginRequest),
	async (
		req: Request<UserLoginRequest>,
		res: Response<ICommonResponse | string>
	) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email: email });
			const isPasswordValid = user
				? await user.validatePassword(password)
				: false;
			if (isPasswordValid && user) {
				const token = await user.getJWT();
				const { firstName, lastName, email, _id } = user;
				res.cookie('token', token);
				res.json({
					success: true,
					message: 'login success',
					result: {
						firstName,
						lastName,
						email,
						userId: _id,
					},
				});
			} else {
				throw new Error('Invalid Credentials!');
			}
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: 'Something went wrong! Please try again after sometime.';
			res.status(400).send(errorMessage);
		}
	}
);

authRouter.post(
	'/signup',
	validateRequest(UserSignUpRequest),
	async (
		req: Request<UserSignUpRequest>,
		res: Response<ICommonResponse | string>
	) => {
		try {
			const { password } = req.body;
			const passwordHash = await bcrypt.hash(password, 10);
			const newObj = {
				...req.body,
				password: passwordHash,
			};
			const user = new User(newObj);
			const data = await user.save();
			if (data) {
				const { firstName, lastName, email, _id } = user;
				const token = await user.getJWT();
				res.cookie('token', token);
				res.send({
					success: true,
					message: 'success',
					result: {
						firstName,
						lastName,
						email,
						userId: _id,
					},
				});
			} else {
				throw new Error('User cannot be created');
			}
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: 'Something went wrong! Please try again after sometime.';
			res.status(500).send(`${errorMessage}`);
		}
	}
);

authRouter.post('/logout', async (req: Request, res: Response) => {
	try {
		res.cookie('token', null, {
			expires: new Date(Date.now()),
		});
		res.send('Logout successfull');
	} catch (err: unknown) {
		const errorMessage =
			err instanceof Error
				? err.message
				: 'Something went wrong! Please try again after sometime.';
		res.status(500).send(`${errorMessage}`);
	}
});

export default authRouter;
