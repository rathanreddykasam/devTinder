import { Request, Response } from 'express';
import { userAuth } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { UserEditRequest, UserRequest } from '../models/requestDTO/userRequest';
import { ICommonResponse } from '../models/responses/commonResponse';
import { IUser, User } from '../models/schemas/user';

const express = require('express');
const profileRouter = express.Router();

profileRouter.get(
	'/feed',
	userAuth,
	validateRequest(UserRequest, 'query'),
	async (req: Request, res: Response<ICommonResponse | string>) => {
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

profileRouter.get(
	'/user/view',
	userAuth,
	async (req: Request, res: Response<ICommonResponse | string>) => {
		try {
			const { user } = req;
			res.json({
				success: true,
				message: `success`,
				result: user,
			});
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: 'Something went wrong! Please try again after sometime.';
			res.status(500).send(`${errorMessage}`);
		}
	}
);

profileRouter.patch(
	'/user/edit',
	userAuth,
	validateRequest(UserEditRequest),
	async (req: Request, res: Response<ICommonResponse | string>) => {
		try {
			if (!validateEditableFields(req.body)) {
				throw new Error('Invalid Fields');
			}
			const loggedInUser = req.user as IUser;

			Object.keys(req.body).forEach((key) => {
				(loggedInUser as any)[key] = req.body[key];
			});
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: 'Something went wrong! Please try again after sometime.';
			res.status(500).send(`${errorMessage}`);
		}
	}
);

const validateEditableFields = (user: IUser) => {
	const editableFields = ['firstName', 'lastName', 'dob', 'gender', 'phone'];

	let isValid = Object.keys(user).every((keys: string) => {
		editableFields.includes(keys);
	});

	return isValid;
};

export default profileRouter;
