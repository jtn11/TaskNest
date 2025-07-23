import { db } from "../firebase/firebase";
import { AuthRequest } from "../middleware/authmiddleware";
import { Request, Response } from "express";

export const createWorkspace = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const { name } = req.body;

  if (!user || !user.uid) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  if (!name) {
    return res.status(400).json({ message: "Workspace name required" });
  }

  try {
    const newWorkSpace = {
      name,
      createdBy: user.uid,
      assignedBy: user.email,
      members: [user.uid],
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection("workspace").add(newWorkSpace);
    res.status(201).json({
      message: "succesfully created",
      id: docRef.id,
      workspace: newWorkSpace,
    });
  } catch (error) {
    console.error("Error creating workspace:", error);
    res.status(500).json({ message: "Failed to create workspace" });
  }
};

export const GetWorkspace = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const workspaceRef = db
      .collection("workspace")
      .where("members", "array-contains", uid);
    const snapshot = workspaceRef.get();

    if ((await snapshot).empty) {
      return res.status(404).json({ message: "No workspace found" });
    }

    const workspaces = (await snapshot).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspace:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
