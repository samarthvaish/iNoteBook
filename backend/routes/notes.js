const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  let notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

router.post(
  "/addnote",
  fetchUser,
  [
    body("tittle", "tittle can not be empty").isLength({ min: 1 }),
    body("description", "description can not be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { tittle, description, tag } = req.body;
      let note = new Note({
        tittle: tittle,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      let savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("tittle", "tittle can not be empty").isLength({ min: 1 }),
    body("description", "description can not be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { tittle, description, tag } = req.body;
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      let newNote = {};
      newNote.tittle = tittle;
      newNote.description = description;
      newNote.tag = tag;
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Access Denied");
      }

      let updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(updatedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    let deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.json({ deletedNote: deletedNote, Status: "deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
