import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  movie_id: {
    ref: "movie",
    type: mongoose.Schema.Types.ObjectId,
  },
  text: { type: String },
  date: { type: Date, default: new Date() },
});

const Comment = mongoose.model("comments", CommentSchema);

export default Comment;
