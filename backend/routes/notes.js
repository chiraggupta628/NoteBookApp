const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Notes = require('../models/Notes');

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        return res.status(400).json({ errors: "Internal server error" });
    }
});

router.post('/addnote', fetchUser, [
    body('title', "Title length must be greater than 2").isLength({ min: 3 }),
    body('description', 'Description length must be greater than 4').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        return res.status(400).json({ errors: "Internal server error" });
    }
});

router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title)
            newNote.title = title;
        if (description)
            newNote.description = description;
        if (tag)
            newNote.tag = tag;
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Error finding the note");
        }

        if (note.user.toString() != req.user.id) {
            return res.status(400).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({note});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ errors: "Internal server error" });
    }

});
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Error finding the note");
        }

        if (note.user.toString() != req.user.id) {
            return res.status(400).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted","note":note});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ errors: "Internal server error" });
    }

});


module.exports = router