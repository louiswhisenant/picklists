const mongoose = require('mongoose');
const config = require('config');
const db =
	process.env.NODE_ENV === 'production'
		? config.get('MONGO_URI')
		: process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log('MongoDB connected...');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
