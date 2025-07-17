import { AuthRequest } from "../middleware/authmiddleware";
import { db } from "../firebase/firebase";
import { Response } from "express";

const TASKS_COLLECTION = "tasks";
const USERS_COLLECTION = "users";

// Get /api/tasks?workspanceId = id
export const getUsersTask = async (req: AuthRequest, res: Response) => {
  const workspaceId = req.query.workspaceId as String;

  if (!workspaceId) {
    return res.status(400).json({ message: "WorkspaceId is required" });
  }

  try {
    const snapshot = await db
      .collection(TASKS_COLLECTION)
      .where("workspaceId", "==", workspaceId)
      .get();

    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Task :", error });
  }
};

// POST /api/tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  const createdby = req.user?.uid;
  const { title, description, assignedTo, status, workspaceId } = req.body;

  if (!title || !assignedTo || !workspaceId) {
    return res
      .status(400)
      .json({ message: "Title, assignedTo, and workspaceId are required" });
  }

  try {
    const newTask = {
      title,
      description: description || "",
      createdby,
      assignedTo,
      status: status || "backlog",
      workspaceId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection(TASKS_COLLECTION).add(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task ", error });
  }
};
