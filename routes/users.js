import express from "express";
import { loginUser, createUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(200);
});

// expects client body
// with properties, "name", "email", "password"
router.post("/create", createUser);

// authentication
router.post("/login", loginUser);

export default router;
