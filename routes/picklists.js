const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Init express validator
const { check, validationResult } = require('express-validator');
// Require Picklist model
const Picklist = require('../models/Picklist');

// @route   GET api/picklists/:id
// @desc    Get unique status picklist for specified user
// @access  Private
router.get('/:id/:status', auth, async (req, res) => {
	try {
		let statusPicklist;
		if (req.params.status === 'initialized') {
			statusPicklist = await Picklist.findOne({
				author_id: req.params.id,
				status: req.params.status,
			});
		} else if (req.params.status === 'retrieving') {
			statusPicklist = await Picklist.findOne({
				retriever_id: req.params.id,
				status: req.params.status,
			});
		}

		if (!statusPicklist) {
			res.status(404).json({ msg: 'Picklist not found' });
		} else {
			res.status(200).json(statusPicklist);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   GET api/picklists
// @desc    Get all picklist items
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const picklists = await Picklist.find();

		if (!picklists) res.status(404).json({ msg: 'No picklists exist' });

		res.status(200).json(picklists);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   GET api/picklists/:id
// @desc    Get picklist by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		// Search the picklists for a picklist matching the ID passed in the req params
		const picklist = await Picklist.findById(req.params.id);

		if (!picklist) res.status(404).json({ msg: 'Picklist not found' });

		res.status(200).json(picklist);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   POST api/picklists
// @desc    Add new picklist
// @access  Private
router.post(
	'/',
	[auth, [check('list_name', 'Name is required').not().isEmpty()]],
	async (req, res) => {
		// Validate the request against the checks in the middleware above
		const errors = validationResult(req);

		// If the validation stores any errors in the errors const...
		if (!errors.isEmpty()) {
			// return a response with a bad request status and display the error(s)...
			return res.status(400).json({ errors: errors.array() });
		}

		// ...otherwise...
		const { list_name } = req.body;

		try {
			const newPicklist = new Picklist({
				list_name,
				author_id: req.user.id,
				author_name: req.user.name,
			});

			const picklist = await newPicklist.save();
			res.json(picklist);
		} catch (err) {
			console.error(err);
			res.status(500).json({ msg: 'Server Error' });
		}
	}
);

// @route   PUT api/picklists/:id
// @desc    Update Picklist
// @access  Private
router.put('/:id', auth, async (req, res) => {
	const {
		items,
		list_name,
		status,
		retriever_id,
		retriever_name,
		date_completed,
	} = req.body;
	// Build updatedData object
	const updatedData = {};

	if (list_name) updatedData.list_name = list_name;
	if (items) updatedData.items = items;
	if (status) updatedData.status = status;
	if (retriever_id) updatedData.retriever_id = retriever_id;
	if (retriever_name) updatedData.retriever_name = retriever_name;
	if (date_completed) updatedData.date_completed = date_completed;

	try {
		// Search picklists for picklist with id matching the params in the req
		let picklist = await Picklist.findById(req.params.id);

		// If the picklist from req.params does not exist, return 404
		if (!picklist)
			return res.status(404).json({ json: 'Picklist not found' });

		// set the picklist values to those passed in req.body
		picklist = await Picklist.findByIdAndUpdate(
			req.params.id,
			{ $set: updatedData },
			{ new: true }
		);

		res.json(picklist);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   DELETE api/picklists/:id
// @desc    Delete Picklist
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		// Search picklists for picklist with id matching the params in the req
		let picklist = await Picklist.findById(req.params.id);
		// If the picklist from req.params does not exist, return 404
		if (!picklist)
			return res.status(404).json({ json: 'Picklist not found' });

		await Picklist.findByIdAndRemove(req.params.id);

		res.json({ msg: `${picklist.list_name} removed` });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;
