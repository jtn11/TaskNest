import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/tasksRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors()); // alow frontend to req from backend
app.use(express.json()); // parse json body

app.get("/", (_req, res) => {
  res.send("backend is here");
});

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log("Server Running");
});
