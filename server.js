const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

dotenv.config();

const app = express();
const port = 3001;
const clientUrl = "http://localhost:3001";

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
