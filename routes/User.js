const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.user_create);

router.post("/login", userController.user_login);

module.exports = router;
