import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

// Task 10
router.get("/searchById/:id", async (req, res) => {
  const commentId = req.params["id"];

  try {
    const comment = await Comment.findById(commentId).populate("movie_id");

    if (comment === null) {
      return res.status(404).send("No comment of that ID can be found");
    }

    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

// Task 12
router.patch("/update/:id", async (req, res) => {
  const commentId = req.params["id"];
  const { text } = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        text,
      },
      { new: true }
    );

    if (comment == null) {
      return res.status(404).send(`Comment with ID ${commentId} was not found`);
    }
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

// DELETE
// Task 14 - Endpoint to search and delete comments by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const delComment = await Comment.findByIdAndDelete(req.params.id);

    if (delComment == null) {
      return res
        .status(404)
        .send(`Comment with ID ${req.params.id} was not found`);
    }

    res.send({
      message: `Comment with ID ${req.params.id} was deleted`,
      deletedComment: delComment,
    });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

// Task 14
router.delete("/delete/:id", async (req, res) => {
  const commentId = req.params["id"];

  try {
    const comment = await Comment.findByIdAndDelete(commentId);

    if (comment === null) {
      return res.status(404).send(`Movie with ID ${commentId} was not found`);
    }
    res.send({
      message: `Comment with ID ${commentId} was deleted`,
    });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

export default router;
