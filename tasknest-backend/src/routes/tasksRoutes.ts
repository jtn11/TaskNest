import express from "express";
import { authenticate } from "../middleware/authmiddleware";
import { createTask, getUsersTask } from "../controllers/task-controller";

const router = express.Router();

router.get("/", authenticate, getUsersTask);
router.post("/", authenticate, createTask);

export default router;
