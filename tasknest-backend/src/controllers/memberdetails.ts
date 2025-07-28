import { useEffect } from "react";
import { admin, db } from "../firebase/firebase";
import { AuthRequest } from "../middleware/authmiddleware";
import { Response } from "express";

export const fetchMembersDetails = async (req: AuthRequest, res: Response) => {
  try {
    const workspaceId = req.params.id;
    const workspaceDoc = await db
      .collection("workspace")
      .doc(workspaceId)
      .get();

    if (!workspaceDoc.exists) {
      res.status(404).json({ message: "workspace not found" });
    }
    const workspacedata = workspaceDoc.data();
    const membersId = workspacedata?.members || [];

    const userSnapshot = await db
      .collection("users")
      .where(admin.firestore.FieldPath.documentId(), "in", membersId)
      .get();

    const members = userSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching workspace members:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addMembersToWorkspace = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { email } = req.body;
    const { id } = req.params; // workspaceID

    console.log("email ", req.body);
    console.log("Params", req.params);

    if (!email) return res.status(400).json({ message: "Email required" });
    const userQuery = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (userQuery.empty) {
      return res.status(404).json({ message: "User not found" });
    }
    const userToAdd = userQuery.docs[0];
    const userId = userToAdd.id;

    const workspaceRef = db.collection("workspace").doc(id);
    await workspaceRef.update({
      members: admin.firestore.FieldValue.arrayUnion(userId),
    });
    res
      .status(200)
      .json({
        message: "Member added Successfully",
        user: { userId, ...userToAdd.data() },
      });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
