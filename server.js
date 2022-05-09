import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import movieRoute from "./routes/movies.js";
import commentRoute from "./routes/comments.js";
import userRoute from "./routes/users.js";

dotenv.config();

const app = express();
const port = 3001;
const clientUrl = `http://localhost:${port}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());

// Routes
app.use("/movies", movieRoute);
app.use("/comments", commentRoute);
app.use("/users", userRoute);

console.log("Loading mflix server... 🎥");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected! 😍"))
  .catch(() => console.log("Database is not connected! ☹️"));

// Do not add code below this line!
// Serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`The server 🙈 is listening on port ${port}`);
  console.log(`Visit ${clientUrl} in your browser`);
});
