const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.user_create);

router.post("/login", (req, res) => {
  res.send("Logged in");
});

module.exports = router;
