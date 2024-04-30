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

function updateNoteById(noteId, newData) {
  return database.update({ id: noteId }, { $set: newData }, {});
}

function deleteNotebyId(noteId) {
  return database.remove({ id: noteId }, {});
}

module.exports = {
  saveNote,
  findNoteById,
  updateNoteById,
  deleteNotebyId,
};
