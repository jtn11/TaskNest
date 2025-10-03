import express from "express";
import { messages } from "../controllers/messages";
import { authenticate } from "../middleware/authmiddleware";

const router = express.Router();

router.get("/:userId/:receiverId", authenticate, messages);

export default router;
