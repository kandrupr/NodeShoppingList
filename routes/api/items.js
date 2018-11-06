const express = require('express');
const router = express.Router();

// Item Model defined with name and date
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items - Find is a built in mongoose function. Gets all collection entries.
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create an item - Creates a new item from the request. Request is in JSON as is everything.
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item ({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});


// @route   DELETE api/items/:id
// @desc    Delete an item - Given and ID, it will then remove and return a response
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({succes: false}));
});


module.exports = router;