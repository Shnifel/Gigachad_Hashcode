import express from "express"
import { getTeam, getTeams, createTeams, joinTeam, deleteMember, deleteTeam } from "../handlers/competitions/teams.js";

const teamsRouter = express.Router();

teamsRouter.post("/createTeams",createTeams);
teamsRouter.post("/joinTeams",joinTeam);
teamsRouter.post("/getTeams", getTeams);
teamsRouter.post("/getTeam", getTeam);
teamsRouter.post("/removeMember", deleteMember);
teamsRouter.post("/deleteTeam", deleteTeam);

export default teamsRouter;