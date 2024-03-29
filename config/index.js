const dotenv = require('dotenv');

dotenv.config();

const config = {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	MONGO_DB_NAME: process.env.MONGO_DB_NAME,
	JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
