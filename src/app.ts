import CommonResponse from './models/commonResponse';
import { Request, Response, NextFunction } from 'express';

const express = require('express');

const app = express();

// app.use('/',(req, res) => {
//     res.send("Hello Rathan!!");
// })

app.get(
	'/user',
	(req: Request, res: Response, next: NextFunction) => {
		// Placeholder middleware; remove if not needed
		next();
	},
	(req: Request, res: Response<CommonResponse>): void => {
		const { id, name } = req.query as { id?: string; name?: string };

		// Validate query parameters (optional, but recommended)
		if (!id || !name) {
			res.status(400).json({
				success: false,
				message: 'Missing id or name query parameters',
			});
		}

		console.log('Query params:', id, name);

		// Send a response matching CommonResponse
		res.json({
			success: true,
			message: `Hello, ${name}!`,
			result: { id, name },
		});
	}
);

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
