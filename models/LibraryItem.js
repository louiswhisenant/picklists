const mongoose = require('mongoose');

const LibraryItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	size: {
		type: String,
	},
	desc: {
		type: String,
	},
	upcs: {
		type: Array,
		required: true,
		unique: true,
	},
	color: {
		type: String,
	},
});

module.exports = mongoose.model('libraryItem', LibraryItemSchema);
