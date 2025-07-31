import { AuthRequest } from "../middleware/authmiddleware";
import { db } from "../firebase/firebase";
import { Response } from "express";

const TASKS_COLLECTION = "tasks";
const USERS_COLLECTION = "users";

// Get /api/tasks?workspanceId = id
export const getUsersTask = async (req: AuthRequest, res: Response) => {
  const workspaceId = req.query.workspaceId as string;
  const status = req.query.status as string;
  // const priority = req.query.priority as String ;
  const onlymine = req.query.onlymine === "true ";

  if (!workspaceId) {
    return res.status(400).json({ message: "WorkspaceId is required" });
  }

  try {
    let query: FirebaseFirestore.Query = db
      .collection("TASKS_COLLECTION")
      .where("workspaceId", "==", workspaceId);
    if (status) query = query.where("status", "==", status);
    if (onlymine) query = query.where("assignedTo", "==", req.user?.uid);

    const snapshot = await query.get();
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

// POST /api/tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  const createdby = req.user?.uid;
  const {
    title,
    description,
    assignedTo,
    status,
    priority,
    workspaceId,
    attachments,
  } = req.body;

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
      priority: priority || "medium",
      workspaceId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection(TASKS_COLLECTION).add(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task ", error });
  }
};
