const mongoose = require('mongoose');

const PicklistSchema = mongoose.Schema({
	list_name: {
		type: String,
		required: true,
	},
	author_id: {
		type: String,
		required: true,
	},
	author_name: {
		type: String,
		required: true,
	},
	items: [
		{
			name: {
				type: String,
				required: true,
				unique: false,
			},
			size: {
				type: String,
				required: false,
				unique: false,
			},
			desc: {
				type: String,
				required: false,
				unique: false,
			},
			qty: {
				type: Number,
				required: true,
				default: 1,
			},
			upcs: [
				{
					type: String,
					required: true,
				},
			],
			_id: {
				type: String,
				unique: false,
			},
		},
	],
	status: {
		type: String,
		enum: [
			'initialized',
			'submitted',
			'retrieving',
			'retrieved',
			'complete',
		],
		required: true,
		default: 'initialized',
	},
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

module.exports = mongoose.model('picklist', PicklistSchema);