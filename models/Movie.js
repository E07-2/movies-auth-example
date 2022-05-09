import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  plot: { type: String },
  genres: [
    {
      type: String,
      enum: [
        "Animation",
        "Short",
        "Comedy",
        "Horror",
        "Sci-Fi",
        "Thriller",
        "Action",
        "Adventure",
        "Drama",
        "Romance",
        "War",
        "History",
        "Crime",
        "Film-Noir",
        "Family",
        "Musical",
        "Western",
        "Biography",
        "Sport",
        "Documentary",
        "Mystery",
      ],
    },
  ],
  runtime: { type: Number },
  cast: [{ type: String }],
  num_mflix_comments: { type: Number },
  poster: { type: String },
  title: { type: String },
  fullplot: { type: String },
  languages: [{ type: String }],
  released: { type: Date },
  directors: [{ type: String }],
  writers: [{ type: String }],
  awards: {
    wins: { type: Number, min: 0, default: 0 },
    nominations: { type: Number, min: 0, default: 0 },
    text: { type: String },
  },
  lastupdated: { type: Date },
  year: { type: Number },
  imdb: {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  countries: [{ type: String }],
  type: { type: String },
  tomatoes: {
    viewer: {
      rating: { type: Number },
      numReviews: { type: Number },
    },
    lastUpdated: {
      $date: { type: Date },
    },
  },
});

const Movie = mongoose.model("movies", MovieSchema);

export default Movie;
