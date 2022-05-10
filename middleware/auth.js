import { StatusCodes } from "http-status-codes";
import { authenticateJwt } from "../helpers/jwt.js";
import User from "../models/User.js";

export async function authorizeJwt(req, res, next) {
  const authHeader = req.headers["authorization"];
  try {
    if (!authHeader) {
      throw "You shall not pass!";
    }

    const [bearer, token] = authHeader.split(" ");
    // if promise resolves, returns the payload of the token
    const authenticatedToken = await authenticateJwt(token);
    const user = await User.findById(authenticatedToken.id);

    if (!user) {
      throw "You shall not pass!";
    }

    // mutation
    req.user = user;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Token validation failed");
  }
}

export function authAdminRole(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).send("You shall not pass!");
  }

  next();
}
