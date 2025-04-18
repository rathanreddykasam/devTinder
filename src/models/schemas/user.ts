import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
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
		required: true,
	},
	phone: {
		type: String,
		required: true,
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
});

const User = mongoose.model('User', userSchema);

export { User };
