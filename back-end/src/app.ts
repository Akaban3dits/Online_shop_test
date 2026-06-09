import express from "express";
import webhookRoutes from "./routes/webhook.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(webhookRoutes);

export default app;