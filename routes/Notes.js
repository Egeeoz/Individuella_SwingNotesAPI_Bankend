const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.send("Got note");
});

router.post("", (req, res) => {
  res.send("Created note");
});

router.put("", (req, res) => {
  res.send("Modified a note");
});

router.delete("", (req, res) => {
  res.send("Removed a note");
});

module.exports = router;
