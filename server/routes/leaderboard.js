import express from "express"
import { getLeaderboard } from "../handlers/competitions/leaderboard.js"

const leaderboardRouter = express.Router();

leaderboardRouter.post("/", getLeaderboard);

export default leaderboardRouter