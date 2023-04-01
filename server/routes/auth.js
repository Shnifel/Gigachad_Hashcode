import express from "express";
import { register } from "../handlers/auth/register.js";
import { login } from "../handlers/auth/login.js";
import { verifyEmail } from "../handlers/auth/emailVerify.js";

// Router object that will allow to navigate different services for different authentication requests
const authRouter = express.Router();

authRouter.post("/register", register); //Direct all registration requests to register handler function


authRouter.post("/login", login);

authRouter.post("/emailVerify", verifyEmail); // Direct all email verification requests

export default authRouter;