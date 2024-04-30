const nedb = require("nedb-promises");
const database = new nedb({ filename: "notes.db", autoload: true });
const uuid = require("uuid-random");

function saveNote(title, text, userId, createdAt, modifiedAt) {
  return database.insert({
    id: uuid(),
    title,
    text,
    userId,
    createdAt,
    modifiedAt,
  });
}

function findNoteById(noteId) {
  return database.findOne({ id: noteId });
}

function findUserNotes(userId) {
  return database.find({ userId: userId });
}

const updateNoteById = async (noteId, newData) => {
  try {
    // Update the existing note
    await database.update({ id: noteId }, { $set: newData }, {});

    // Fetch and return the updated note
    const updatedNote = await database.findOne({ id: noteId });
    return updatedNote;
  } catch (error) {
    throw new Error(`Error updating note with ID ${noteId}: ${error.message}`);
  }
};

function deleteNoteById(noteId) {
  return database.remove({ id: noteId }, {});
}

module.exports = {
  saveNote,
  findNoteById,
  updateNoteById,
  deleteNoteById,
  findUserNotes,
};
