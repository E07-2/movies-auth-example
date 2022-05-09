import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// Task 7
router.get("/searchById/:id", async (req, res) => {
  const movieId = req.params["id"];

  try {
    const movie = await Movie.findById(movieId);

    if (movie === null) {
      return res.status(404).send("No movie of that ID can be found");
    }

    res.send(movie);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

// Task 8 - Endpoint to search for movies by title
router.get("/searchByTitle/:title", async (req, res) => {
  const title = req.params["title"];
  const limit = req.query["limit"] || 10;

  try {
    const movies = await Movie.find({
      title,
    }).limit(limit);

    if (movies.length === 0) {
      return res
        .status(404)
        .send(`No movies of title "${req.params.title}" were found`);
    }
    res.send(movies);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

// Task 11
router.patch("/update/:id", async (req, res) => {
  const movieId = req.params["id"];
  const { title, plot } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(
      movieId,
      {
        title,
        plot,
      },
      { new: true }
    );

    if (movie == null) {
      return res.status(404).send(`Comment with ID ${movieId} was not found`);
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

// Task 13 - Endpoint to search and delete movies by id
router.delete("/delete/:id", async (req, res) => {
  const movieId = req.params["id"];

  try {
    const movie = await Movie.findByIdAndDelete(movieId);

    if (movie === null) {
      return res.status(404).send(`Movie with ID ${movieId} was not found`);
    }
    res.send({
      message: `Movie with ID ${movieId} was deleted`,
    });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

export default router;
