const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.use(notesController.authenticateUser);

router.get("", (req, res) => {
  res.send("Got note");
});

router.post("", notesController.note_create);

router.put("", (req, res) => {
  res.send("Modified a note");
});

router.delete("", (req, res) => {
  res.send("Removed a note");
});

module.exports = router;
