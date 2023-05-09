import express from "express";
import { markFile } from "../handlers/competitions/marker.js";

const markerRouter = express.Router();

markerRouter.post("/markFile", markFile);

export default markerRouter;