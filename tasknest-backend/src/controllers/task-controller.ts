import { AuthRequest } from "../middleware/authmiddleware";
import { db } from "../firebase/firebase";
import { Response } from "express";

export const getUsersTask = async (req: AuthRequest, res: Response) => {
  const workspaceId = req.params.id;
  const onlymine = req.query.onlymine === "true";

  if (!workspaceId) {
    return res.status(400).json({ message: "WorkspaceId is required" });
  }

  try {
    let query: FirebaseFirestore.Query = db
      .collection("workspace")
      .doc(workspaceId)
      .collection("tasks");
    // if (status) query = query.where("status", "==", status);
    if (onlymine) {
      if (!req.user?.uid) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      query = query.where("assignedTo", "==", req.user?.email);
      //member.email.split("@")[0]
    }

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

// update Route

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id: workspaceId, taskId } = req.params;
  const updates = req.body;
  const userId = req.user?.uid;

  try {
    const workspaceRef = db.collection("workspace").doc(workspaceId);
    const workspaceDoc = await workspaceRef.get();
    if (!workspaceDoc.exists) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    const workspaceData = await workspaceDoc.data();
    if (!workspaceData?.members?.includes(userId)) {
      return res.status(403).json({ error: "User Not Authorised" });
    }

    const taskRef = workspaceRef.collection("tasks").doc(taskId);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: "Task not found" });
    }

    await taskRef.update(updates);

    res.json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
