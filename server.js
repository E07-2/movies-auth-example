import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

dotenv.config();

const app = express();
const port = 3001;
const clientUrl = `http://localhost:${port}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());

// Routes

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
