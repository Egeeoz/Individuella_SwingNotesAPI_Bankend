//user_create, user_login
const { hashPassword, comparePassword } = require("../bcrypt");
const { saveUser, findUser } = require("../model/user");
const jwt = require("jsonwebtoken");

const user_create = async (req, res) => {
  const { username, password } = req.body;

  const pass = await hashPassword(password);

  saveUser(username, pass);

  res.json({ success: true });
};

const user_login = async (req, res) => {
  const { username, password } = req.body;

  const user = await findUser(username);
  const correctPassword = await comparePassword(password, user.password);

  result = {
    success: false,
  };

  if (correctPassword) {
    const token = jwt.sign({ id: user.id }, "a1b1c1", {
      expiresIn: 60, //1 min
    });

    result.success = true;
    result.token = token;
  } else {
    result.message = "Not correct user credentials";
  }

  res.json(result);
};

module.exports = {
  user_create,
  user_login,
};
