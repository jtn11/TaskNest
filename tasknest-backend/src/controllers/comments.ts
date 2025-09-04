import { db } from "../firebase/firebase";
import { AuthRequest } from "../middleware/authmiddleware";
import { Response } from "express";
import { admin } from "../firebase/firebase";

export const addComments = async (req: AuthRequest, res: Response) => {
  const { id: workspaceId } = req.params;
  const { taskId } = req.params;
  const { text } = req.body;
  const userId = req.user?.uid;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const commentRef = db
      .collection("workspace")
      .doc(workspaceId)
      .collection("tasks")
      .doc(taskId)
      .collection("comments")
      .doc();

    const commentData = {
      id: commentRef.id,
      text,
      createdBy: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await commentRef.set(commentData);
    res.status(201).json(commentData);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create comment ",
      error: (error as Error).message,
    });
  }
};
