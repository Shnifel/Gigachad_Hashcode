import express from "express";
import { addSubmission, getAllSubmissions, getSubmissions } from "../handlers/competitions/submissions.js";

const submissionsRouter = express.Router();

submissionsRouter.post("/addSubmission", addSubmission);
submissionsRouter.post("/getSubmissions", getSubmissions);
submissionsRouter.post("/getAllSubmissions", getAllSubmissions)

export default submissionsRouter;