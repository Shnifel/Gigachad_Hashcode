import express from "express";
import authRouter from "./routes/auth.js";

const app = express(); // Express application for server side handling

app.use(express.json());
app.use("/server/auth", authRouter); // Direct all authentication requests to authRouter to navigate to relevant service

app.listen(8800, () => {
    console.log("Listening on port 8800...");
})