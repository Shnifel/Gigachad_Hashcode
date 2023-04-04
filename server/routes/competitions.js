import express from "express";
import { createCompetition } from "../handlers/competitions/createCompetition.js";
import { getCompetitions } from "../handlers/competitions/getCompetitions.js";
import { createTeams } from "../handlers/competitions/createTeam.js";
import { joinTeams } from "../handlers/competitions/joinTeam.js";
import { getTeams } from "../handlers/competitions/getTeams.js";

// Router object that will allow to navigate different services for different authentication requests
const competitionRouter = express.Router();

competitionRouter.post("/createCompetition", createCompetition); //Direct all registration requests to register handler function
competitionRouter.post("/getCompetitions",getCompetitions);
competitionRouter.post("/createTeams",createTeams);
competitionRouter.post("/joinTeams",joinTeams);
competitionRouter.post("/getTeams", getTeams);
export default competitionRouter;