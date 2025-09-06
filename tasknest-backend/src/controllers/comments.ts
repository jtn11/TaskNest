import { db } from "../firebase/firebase";
import { AuthRequest } from "../middleware/authmiddleware";
import { Response } from "express";

export const addComments = async (req: AuthRequest, res: Response) => {
  const { id: workspaceId, taskId } = req.params;
  const { text, userName } = req.body;
  const userId = req.user?.uid;

  console.log("Params:", req.params);
  console.log("Body:", req.body);
  console.log("User:", req.user);

  try {
    const newComment = {
      text,
      userName,
      createdBy: userId,
      createdAt: new Date().toISOString(),
    };

    const commentRef = await db
      .collection("workspace")
      .doc(workspaceId)
      .collection("tasks")
      .doc(taskId)
      .collection("comments")
      .add(newComment);

    return res.status(201).json({
      id: commentRef.id,
      ...newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ error: "Failed to create comment" });
  }
};

export const getComments = async (req: AuthRequest, res: Response) => {
  const { id: workspaceId } = req.params;
  const { taskId } = req.params;

  try {
    const commentRef = await db
      .collection("workspace")
      .doc(workspaceId)
      .collection("tasks")
      .doc(taskId)
      .collection("comments")
      .get();

    const comments = commentRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const { id: workspaceId, taskId, commentId } = req.params;

  try {
    await db
      .collection("workspace")
      .doc(workspaceId)
      .collection("tasks")
      .doc(taskId)
      .collection("comments")
      .doc(commentId)
      .delete();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Failed to delete comment" });
  }
};
