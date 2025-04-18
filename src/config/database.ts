const mongoose = require('mongoose');

const URI =
	'mongodb+srv://namasteydev:FiGtDnyzikVloc3S@devtinder.ctekb3d.mongodb.net/';
const DATABASE = 'devTinder';

const connectDB = async () => {
	await mongoose.connect(`${URI}${DATABASE}`);
};

export { connectDB };
