const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { mainModule } = require('process');
const config = require('./config');

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
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

connectDB();

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/library', require('./routes/library'));
app.use('/api/picklists', require('./routes/picklists'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
