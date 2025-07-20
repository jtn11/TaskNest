import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/tasksRoutes";
import workspaceRoute from "./routes/workspaceRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors()); // allow frontend to req from backend
app.use(express.json()); // parse json body

app.get("/", (_req, res) => {
  res.send("backend is here");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/workspace", workspaceRoute);

app.listen(PORT, () => {
  console.log("Server Running");
});
