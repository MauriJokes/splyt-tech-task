import express from "express";
import bodyParser from "body-parser";
import eventRoutes from "@routes/event.js";
import eventLimiter from "middlewares/rate-limiter.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/", eventRoutes);
app.use(eventLimiter);

export default app;
