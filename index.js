const express = require("express");
const app = express();
const PORT = 3000;

const userRoute = require("./routes/User");
const notesRoute = require("./routes/Notes");

const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./docs/docs.json");

app.use(express.json());

app.use("/api/docs", swaggerUI.serve);
app.get("/api/docs", swaggerUI.setup(apiDocs));

app.use("/api/user", userRoute);
app.use("/api/notes", notesRoute);

app.listen(PORT, () => {
  console.log("Server running");
});
