import express from "express";
import { addSubmission, getSubmissions } from "../handlers/competitions/submissions.js";

const submissionsRouter = express.Router();

submissionsRouter.post("/addSubmission", addSubmission);
submissionsRouter.post("/getSubmissions", getSubmissions);

export default submissionsRouter;