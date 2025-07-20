import express from "express";
import { authenticate } from "../middleware/authmiddleware";
import { createWorkspace } from "../controllers/workspace-controller";

const router = express.Router();

router.post("/", authenticate, createWorkspace);

export default router;
