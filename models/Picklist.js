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
	retriever_id: {
		type: String,
		required: true,
		default: 'unassigned',
	},
	retriever_name: {
		type: String,
		required: true,
		default: 'unassigned',
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
			resolved: {
				type: String,
				enum: ['requested', 'retrieved', 'cancelled'],
				required: true,
				default: 'requested',
			},
			color: {
				type: String,
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
			'stocking',
			'complete',
		],
		required: true,
		default: 'initialized',
	},
	date_created: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	date_completed: {
		type: Date,
		required: false,
	},
});

module.exports = mongoose.model('picklist', PicklistSchema);
