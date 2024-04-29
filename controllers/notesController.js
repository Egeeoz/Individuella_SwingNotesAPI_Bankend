// note_get, note_create, note_modify, note_remove
const jwt = require("jsonwebtoken");

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

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  authenticateUser,
};
