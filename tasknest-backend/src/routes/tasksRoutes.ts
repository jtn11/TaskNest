import express from "express";
import { authenticate } from "../middleware/authmiddleware";
import {
  createTask,
  getUsersTask,
  updateTask,
} from "../controllers/task-controller";

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, getUsersTask);
router.post("/", authenticate, createTask);
router.patch("/:taskId", authenticate, updateTask);

export default router;
