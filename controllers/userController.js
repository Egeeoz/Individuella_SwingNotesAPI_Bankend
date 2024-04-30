const { hashPassword, comparePassword } = require("../bcrypt");
const { saveUser, findUser } = require("../model/user");
const jwt = require("jsonwebtoken");

// Create user
const user_create = async (req, res) => {
  const { username, password } = req.body;

  if (!username || username === "" || !password || password === "") {
    return res
      .status(400)
      .json({ success: false, message: "Enter a username and password" });
  }

  try {
    const pass = await hashPassword(password);

    saveUser(username, pass);

    res.json({ success: true });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

// Login
const user_login = async (req, res) => {
  const { username, password } = req.body;

  const user = await findUser(username);

  if (!user) {
    //If user is not found
    return res.status(400).json({ success: false, message: "User not found" });
  }

  try {
    // Comparing password if user is found
    const correctPassword = await comparePassword(password, user.password);

    result = {
      success: false,
    };

    if (correctPassword) {
      const token = jwt.sign({ id: user.id }, "your_secret_key", {
        expiresIn: 1200, //20 min
      });

      result.success = true;
      result.token = token;
    } else {
      result.message = "Not correct user credentials";
    }

    res.json(result);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

module.exports = {
  user_create,
  user_login,
};
