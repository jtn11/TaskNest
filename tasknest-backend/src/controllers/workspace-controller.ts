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
