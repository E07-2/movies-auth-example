import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(200);
});

// expects client body
// with properties, "name", "email", "password"
router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
    });

    res.send("User created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

// authentication
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user === null) {
    // !user
    return res.status(StatusCodes.NOT_FOUND).send("User not found");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }

  res.send("login successful");
});

export default router;
