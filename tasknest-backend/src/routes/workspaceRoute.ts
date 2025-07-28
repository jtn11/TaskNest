import express from "express";
import { authenticate } from "../middleware/authmiddleware";
import {
  createWorkspace,
  GetWorkspace,
} from "../controllers/workspace-controller";
import {
  addMembersToWorkspace,
  fetchMembersDetails,
} from "../controllers/memberdetails";

const router = express.Router();

router.get("/", authenticate, GetWorkspace);
router.post("/", authenticate, createWorkspace);

router.get("/:id/members", authenticate, fetchMembersDetails);
router.post("/:id/members", authenticate, addMembersToWorkspace);

export default router;
