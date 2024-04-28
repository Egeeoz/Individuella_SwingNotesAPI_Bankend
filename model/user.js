const nedb = require("nedb-promises");
const database = new nedb({ filename: "users.db", autoload: true });
const uuid = require("uuid-random");

function saveUser(username, password) {
  database.insert({ username: username, password: password, id: uuid() });
}

function findUser(username) {
  return database.findOne({ username: username });
}

module.exports = { saveUser, findUser };
