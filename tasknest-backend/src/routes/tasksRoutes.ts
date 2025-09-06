import express from "express";
import { authenticate } from "../middleware/authmiddleware";
import {
  createTask,
  getUsersTask,
  updateTask,
} from "../controllers/task-controller";
import {
  addComments,
  deleteComment,
  getComments,
} from "../controllers/comments";

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, getUsersTask);
router.post("/", authenticate, createTask);
router.patch("/:taskId", authenticate, updateTask);
router.post("/:taskId/comments", authenticate, addComments);
router.get("/:taskId/comments", authenticate, getComments);
router.delete("/:taskId/comments/:commentId", authenticate, deleteComment);

// `http://localhost:8000/api/workspace/${workspaceId}/tasks/${taskId}/comments`,

export default router;
