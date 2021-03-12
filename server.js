const app = require('./app.js');
const config = require('./config');

const { PORT } = config;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
