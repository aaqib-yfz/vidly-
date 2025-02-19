const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Action" },
  { id: 3, name: "Horror" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const result = validateGenre(req.body);
  if (result) {
    res.status(404).send(result);
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genres);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => {
    return g.id == parseInt(req.params.id);
  });
  if (!genre) {
    res.status(404).send("Not found");
    return;
  }

  const result = validateGenre(req.body);
  if (result) {
    res.status(400).send(result.details[0].message);
  }
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => {
    return g.id == parseInt(req.params.id);
  });
  if (!genre) {
    res.status(404).send("Not found");
    return;
  }

  const result = validateGenre(req.body);
  if (result) {
    res.status(400).send(result.details[0].message);
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(genre);
  if (result.error) {
    return result.error.message[0].details;
  }
}

module.exports = router;
