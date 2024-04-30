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

const note_create = async (req, res) => {
  const { title, text } = req.body;
  const userId = req.userId;

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

module.exports = {
  authenticateUser,
  note_create,
};
