const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.use(notesController.authenticateUser);

router.get("", notesController.note_get);

router.post("", notesController.note_create);

router.put("/:id", notesController.note_modify);

router.delete("", notesController.note_remove);

module.exports = router;
