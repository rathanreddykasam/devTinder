import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	dob?: Date;
	gender?: string;
	token?: string;
	getJWT(): Promise<string>;
	validatePassword(inputPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		dob: Date,
		gender: String,
		token: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.methods.getJWT = async function () {
	return await jwt.sign({ _id: this._id }, 'DEV@Tinder$790', {
		expiresIn: '7d',
	});
};

userSchema.methods.validatePassword = async function (inputPassword: string) {
	return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export { User };
