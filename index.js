const express = require("express");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Action" },
  { id: 3, name: "Horror" },
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres/", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genres);
});

app.listen(3000, () => {
  console.log("Listening to 3000");
});
