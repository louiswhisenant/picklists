const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Init express validator
const { check, validationResult } = require('express-validator');
// Require LibraryItem model
const LibraryItem = require('../models/LibraryItem');

// @route   GET api/library/:upcs
// @desc    Get library item by UPC
// @access  Private
router.get('/:upcs', auth, async (req, res) => {
	try {
		// Search the library for an item matching the upc passed in the req params
		const libraryItem = await LibraryItem.findOne({
			upcs: req.params.upcs,
		});

		if (!libraryItem) res.status(404).json({ msg: 'UPC not found' });

		res.status(200).json(libraryItem);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   GET api/library
// @desc    Get all library items
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const library = await LibraryItem.find();

		if (!library) res.status(404).json({ msg: 'No items exist' });

		res.status(200).json(library);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   POST api/library
// @desc    Add new library item
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'Name is required').not().isEmpty(),
			check('upcs', 'Item must contain at least one UPC').not().isEmpty(),
		],
	],
	async (req, res) => {
		// Validate the request against the checks in the middleware above
		const errors = validationResult(req);

		// If the validation stores any errors in the errors const...
		if (!errors.isEmpty()) {
			// return a response with a bad request status and display the error(s)...
			return res.status(400).json({ errors: errors.array() });
		}

		// ...otherwise...
		const { name, desc, upcs, size } = req.body;

		try {
			// Check Library Items for UPC
			let newLibraryItem = await LibraryItem.findOne({ upcs: upcs });
			// Return rejection message
			if (newLibraryItem) {
				res.status(400).json({ msg: 'Item UPC already exists' });
			}
			// Check Library Items for Name
			newLibraryItem = await LibraryItem.findOne({ name });
			// Return rejection message
			if (newLibraryItem) {
				res.status(400).json({ msg: 'Item Name already exists' });
			}

			newLibraryItem = new LibraryItem({
				name,
				desc,
				upcs,
				size,
			});

			const libraryItem = await newLibraryItem.save();
			res.json(libraryItem);
		} catch (err) {
			console.error(err);
			res.status(500).json({ msg: 'Server Error' });
		}
	}
);

// @route   PUT api/library/:id
// @desc    Update Library Item
// @access  Private
router.put('/:id', auth, async (req, res) => {
	const { name, size, desc, upcs } = req.body;

	// Build libraryItem object
	const updatedData = {};

	if (name) updatedData.name = name;
	if (size) updatedData.size = size;
	if (desc) updatedData.desc = desc;
	if (upcs) updatedData.upcs = upcs;

	try {
		// Search libraryItems for libraryItem with id matching the params in the req
		let libraryItem = await LibraryItem.findById(req.params.id);

		// If the libraryItem from req.params does not exist, return 404
		if (!libraryItem)
			return res.status(404).json({ json: 'Item not found' });

		// set the libraryItem values to those passed in req.body
		libraryItem = await LibraryItem.findByIdAndUpdate(
			req.params.id,
			{ $set: updatedData },
			{ new: true }
		);

		res.json(libraryItem);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   DELETE api/library/:id
// @desc    Delete Library Item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		// Search library for item with id matching the params in the req
		let libraryItem = await LibraryItem.findById(req.params.id);
		// If the library item from req.params does not exist, return 404
		if (!libraryItem)
			return res.status(404).json({ json: 'Item not found' });

		await LibraryItem.findByIdAndRemove(req.params.id);

		res.json({ msg: `${libraryItem.name} removed` });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;
