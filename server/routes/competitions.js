import express from "express";
import { createCompetition, getCompetition, getCompetitions, updateCompetition, deleteCompetition } from "../handlers/competitions/competitions.js";
import { getTeam, getTeams, createTeams, joinTeam, deleteMember, deleteTeam } from "../handlers/competitions/teams.js";

// Router object that will allow to navigate different services for different authentication requests
const competitionRouter = express.Router();

competitionRouter.post("/createCompetition", createCompetition); //Direct all registration requests to register handler function
competitionRouter.post("/getCompetitions",getCompetitions);
competitionRouter.post("/getCompetition", getCompetition);
competitionRouter.post("/createTeams",createTeams);
competitionRouter.post("/joinTeams",joinTeam);
competitionRouter.post("/getTeams", getTeams);
competitionRouter.post("/getTeam", getTeam);
export default competitionRouter;