const express = require("express");
const app = express();
const genres = require("./routes/genres");
app.use(express.json());
const Joi = require("joi");

app.use("/api/genres", genres);
app.listen(3000, () => {
  console.log("Listening to 3000");
});
