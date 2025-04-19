import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
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

const User = mongoose.model('User', userSchema);

export { User };
