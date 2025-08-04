import { AuthRequest } from "../middleware/authmiddleware";
import { db } from "../firebase/firebase";
import { Response } from "express";

// Get /api/tasks?workspanceId = id
export const getUsersTask = async (req: AuthRequest, res: Response) => {
  const workspaceId = req.params.id;
  const status = req.query.status as string;
  // const priority = req.query.priority as String ;
  const onlymine = req.query.onlymine === "true ";

  if (!workspaceId) {
    return res.status(400).json({ message: "WorkspaceId is required" });
  }

  try {
    let query: FirebaseFirestore.Query = db
      .collection("workspace")
      .doc(workspaceId)
      .collection("tasks");
    if (status) query = query.where("status", "==", status);
    if (onlymine) query = query.where("assignedTo", "==", req.user?.uid);

    const snapshot = await query.get();
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

// POST /api/workspace/:id/tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  const createdBy = req.user?.uid;
  const workspaceId = req.params.id;
  const { title, description, assignedTo, status, priority, attachments } =
    req.body;

  if (!title || !assignedTo) {
    return res
      .status(400)
      .json({ message: "Title, assignedTo,  are required" });
  }

  try {
    const newTask = {
      title,
      description: description || "",
      createdBy,
      assignedTo,
      status: status || "backlog",
      priority: priority || "medium",
      createdAt: new Date().toISOString(),
    };

    const docRef = await db
      .collection("workspace")
      .doc(workspaceId)
      .collection("tasks")
      .doc();
    await docRef.set(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task ",
      error: (error as Error).message,
    });
  }
};
