import 'reflect-metadata';
import { connectDB } from './config/database';
import authRouter from './routes/auth';
import profileRouter from './routes/profile';

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Reading cookie
app.use(cookieParser());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/', profileRouter);

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
