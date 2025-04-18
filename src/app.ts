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
import { IErrorResponse } from './models/responses/errorResponse';

const express = require('express');
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.post(
	'/login',
	validateRequest(UserLoginRequest),
	(req: Request, res: Response<ICommonResponse>) => {
		const { email, password } = req.body;
		if (email && password) {
			res.status(200).json({
				success: true,
				message: 'successfull',
				result: {
					user: {
						id: 1,
						name: 'Rathan Reddy kasam',
						email,
					},
					token:
						'lkksndkjkjwuyegubwjbdjvajsbdjg!jbcsjhbvgjg6rtwuebrjytdfasdvhwfeykf@lkasbjfv#as',
				},
			});
		}
	}
);

app.post(
	'/signup',
	validateRequest(UserSignUpRequest),
	async (req: Request, res: Response<ICommonResponse | IErrorResponse>) => {
		try {
			const user = new User({ ...req.body });
			const data = await user.save();
			if (data) {
				res.send({
					success: true,
					message: 'success',
					result: data,
				});
			} else {
			}
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'An unknown error occurred';
			console.log('Something went wrong', errorMessage);
			res.status(500).send({
				statusCode: 500,
				status: 'unsuccessfull',
				message: `Something went wrong. ${errorMessage}`,
			});
		}
	}
);

app.get(
	'/user',
	userAuth,
	validateRequest(UserRequest, 'query'),
	async (
		req: Request<UserRequest>,
		res: Response<ICommonResponse | IErrorResponse>
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
				res.status(404).json({
					statusCode: 404,
					status: 'Not Found',
					message: `User not found with ${email}`,
				});
			}
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'An unknown error occurred';
			console.log('Something went wrong', errorMessage);
			res.status(500).send({
				statusCode: 500,
				status: 'unsuccessfull',
				message: `Something went wrong. ${errorMessage}`,
			});
		}
	}
);

connectDB()
	.then(() => {
		console.log('Database connectio established!!!');
		app.listen(3000, () => {
			console.log('server is listening on port 3000');
		});
	})
	.catch((err: Error) => {
		console.error('connection error!', err);
	});
