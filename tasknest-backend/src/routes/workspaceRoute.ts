import express from "express";
import { authenticate } from "../middleware/authmiddleware";
import {
  createWorkspace,
  GetWorkspace,
} from "../controllers/workspace-controller";

const router = express.Router();

router.get("/", authenticate, GetWorkspace);
router.post("/", authenticate, createWorkspace);

export default router;
