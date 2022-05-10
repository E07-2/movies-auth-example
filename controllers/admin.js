// modify the password for an existing user
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export const modifyUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const user = await User.findById(id);

  if (user === null) {
    return res.status(StatusCodes.NOT_FOUND).send("User not found");
  }

  const hash = await bcrypt.hash(password, 10);

  await user.update({
    password: hash,
  });

  res.send(200);
};
