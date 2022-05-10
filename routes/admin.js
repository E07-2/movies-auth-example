import express from "express";
import { modifyUserPassword } from "../controllers/admin.js";

const router = express.Router();

// only for admin users
// modify the password for an existing user
router.patch("/password/:id", modifyUserPassword);

export default router;
