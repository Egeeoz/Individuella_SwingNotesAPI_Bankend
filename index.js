const express = require("express");
const app = express();
const PORT = 3000;

const userRoute = require("./routes/User");
const notesRoute = require("./routes/Notes");

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log("Server running");
});
