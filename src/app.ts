import 'reflect-metadata';
import { Request, Response } from 'express';
import { ICommonResponse } from './models/commonResponse';
import { validateRequest } from './middleware/validate';
import { UserRequest } from './models/requestDTO/userRequest';

const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello Rathan!!');
});

app.get(
	'/user',
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
