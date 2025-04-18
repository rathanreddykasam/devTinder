import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { ICommonResponse } from './models/responses/commonResponse';
import { validateRequest } from './middlewares/validate';
import { UserRequest } from './models/requestDTO/userRequest';
import { userAuth } from './middlewares/auth';
import { UserLoginRequest } from './models/requestDTO/userLoginRequest';

const express = require('express');
const app = express();

app.post('/login', (req: Request, res: Response<ICommonResponse>) => {
	console.log(req.body);
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
	} else {
		res.status(401).json({
			success: false,
			message: 'email or password is wrong!',
		});
	}
});

app.get(
	'/user',
	userAuth,
	validateRequest(UserRequest, 'query'),
	(req: Request, res: Response<ICommonResponse>): void => {
		const { id, name } = req.query;
		// Send a response matching CommonResponse
		res.json({
			success: true,
			message: `Hello, ${name}!`,
			result: { id: Number(id), name },
		});
	}
);

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
