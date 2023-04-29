import express from "express";
import { login } from "../handlers/admin/login.js";
import { updateProfile } from "../handlers/admin/updateProfile.js"

// Router object that will allow to navigate different services for different authentication requests
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/updateProfile", updateProfile);

export default authRouter;