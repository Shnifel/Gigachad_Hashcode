import express from "express";
import authRouter from "./routes/auth.js";
import competitionRouter from "./routes/competitions.js";
import teamsRouter from "./routes/teams.js";
import markerRouter from "./routes/marker.js";
import submissionsRouter from "./routes/submissions.js";
import leaderboardRouter from "./routes/leaderboard.js";

const app = express(); // Express application for server side handling

app.use(express.json());
app.use("/server/auth", authRouter); // Direct all authentication requests to authRouter to navigate to relevant service
app.use("/server/competitions", competitionRouter);
app.use("/server/teams", teamsRouter);
app.use("/server/marker", markerRouter);
app.use("/server/submissions", submissionsRouter);
app.use("/server/leaderboard", leaderboardRouter);

app.listen(8800, () => {
    console.log("Listening on port 8800...");
})