import 'reflect-metadata';
import { Request, Response } from 'express';
import { ICommonResponse } from './models/responses/commonResponse';
import { validateRequest } from './middlewares/validate';
import { UserRequest } from './models/requestDTO/userRequest';
import { userAuth } from './middlewares/auth';
import {
	UserLoginRequest,
	UserSignUpRequest,
} from './models/requestDTO/userAuthRequest';
import { connectDB } from './config/database';
import { User } from './models/schemas/user';

const bcrypt = require('bcrypt');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Reading cookie
app.use(cookieParser());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.post(
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

app.post(
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

app.get(
	'/user',
	userAuth,
	validateRequest(UserRequest, 'query'),
	async (
		req: Request<UserRequest>,
		res: Response<ICommonResponse | string>
	) => {
		try {
			const { email } = req.query;
			const user = await User.find({ email: email });

			if (user && user.length) {
				res.json({
					success: true,
					message: `success`,
					result: user,
				});
			} else {
				res.status(404).json(`User not found with ${email}`);
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

connectDB()
	.then(() => {
		console.log('Database connection established!!!');
		app.listen(3000, () => {
			console.log('server is listening on port 3000');
		});
	})
	.catch((err: Error) => {
		console.error('connection error!', err);
	});
