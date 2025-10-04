import { db } from "../firebase/firebase";
import { AuthRequest } from "../middleware/authmiddleware";
import { Response } from "express";

export const messages = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, receiverId } = req.params;
    const chatID = [userId, receiverId].sort().join("_");
    const snapshot = await db
      .collection("chats")
      .doc(chatID)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .get();

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        content: data.content,
        senderId: data.senderId,
        receiverId: data.receiverId,
        createdAt: data.createdAt?.toDate?.() || new Date(),
      };
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error });
  }
};
