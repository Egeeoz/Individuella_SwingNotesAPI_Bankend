// note_get, note_create, note_modify, note_remove
const jwt = require("jsonwebtoken");
const Note = require("../model/note");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_secret_key");

    req.userId = decoded.id;
    console.log(req.userId);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

const note_get = async (req, res) => {
  const userId = req.userId;

  try {
    const userNotes = await Note.findUserNotes(userId);

    res.status(200).json({ success: true, notes: userNotes });
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const note_create = async (req, res) => {
  const { title, text } = req.body;
  const userId = req.userId;

  if (!title || title.length > 50 || !text || text.length > 300) {
    let errorMessage = "";

    if (!title || title.length > 50) {
      errorMessage += "Title must be less than 50 characters. ";
    }

    if (!text || text.length > 300) {
      errorMessage += "Text must be less than 300 characters.";
    }
  }

  try {
    const createdAt = new Date();
    const modifiedAt = new Date();

    const savedNote = await Note.saveNote(
      title,
      text,
      userId,
      createdAt,
      modifiedAt
    );

    res.status(200).json({ succes: true, note: savedNote });
  } catch (error) {
    res
      .status(500)
      .json({ success: "false", message: "Internal server error" });
  }
};

const note_modify = async (req, res) => {
  const { title, text } = req.body;
  const noteId = req.params.id;

  if (!title || title.length > 50 || !text || text.length > 300) {
    let errorMessage = "";

    if (!title || title.length > 50) {
      errorMessage += "Title must be less than 50 characters. ";
    }

    if (!text || text.length > 300) {
      errorMessage += "Text must be less than 300 characters.";
    }

    return res.status(400).json({ success: false, message: errorMessage });
  }

  try {
    // Check if the note exists
    const existingNote = await Note.findNoteById(noteId);
    if (!existingNote) {
      return res
        .status(400)
        .json({ success: false, message: "Note not found" });
    }

    const modifiedAt = new Date();

    // Update the note
    const newData = { title, text, modifiedAt };
    const updatedNote = await Note.updateNoteById(noteId, newData);

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    console.error("Error modifying note:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const note_remove = async (req, res) => {
  const noteId = req.body.id;

  if (!noteId) {
    return res
      .status(400)
      .json({ success: false, message: "Enter a valid note ID" });
  }

  try {
    const existingNoteId = Note.findNoteById(noteId);

    if (!existingNoteId) {
      return res.status(400).json({
        success: false,
        message: "No note found with the specified ID",
      });
    }

    Note.deleteNoteById(noteId);

    res
      .status(200)
      .json({ success: true, message: "Successfully deleted note" });
  } catch (error) {
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
};

module.exports = {
  authenticateUser,
  note_create,
  note_modify,
  note_get,
  note_remove,
};
