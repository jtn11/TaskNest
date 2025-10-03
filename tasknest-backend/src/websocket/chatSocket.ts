import { auth } from "firebase-admin";
import { WebSocket, WebSocketServer } from "ws";
import { db } from "../firebase/firebase";

const connectedUsers = new Map<string, Set<WebSocket>>();

export const initWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    let currentUserId: string | null = null;

    ws.on("message", async (data) => {
      try {
        const parsed = JSON.parse(data.toString());

        // Handle user registration
        if (parsed.type === "register") {
          const { token } = parsed;

          const decoded = await auth().verifyIdToken(token);
          const userId = decoded.uid;
          currentUserId = userId;

          // Add this socket to the user's connection set
          if (!connectedUsers.has(userId)) {
            connectedUsers.set(userId, new Set());
          }
          connectedUsers.get(userId)!.add(ws);

          console.log("Registered user:", userId);
          return;
        }

        // Handle sending messages
        if (parsed.type === "message") {
          const { senderId, receiverId, content } = parsed;

          if (senderId !== currentUserId) {
            console.warn("Unauthorized sender:", senderId);
            return;
          }

          const chatID = [senderId, receiverId].sort().join("_");

          const createdAt = new Date();

          const messagePayload = {
            senderId,
            receiverId,
            content,
            createdAt,
          };

          // Store the message chat collections

          const docRef = await db
            .collection("chats")
            .doc(chatID)
            .collection("messages")
            .add(messagePayload);

          const messageToSend = {
            id: docRef.id,
            ...messagePayload,
          };

          // Send message to all receiver's connected devices (if online)
          const receiverSockets = connectedUsers.get(receiverId);
          if (receiverSockets) {
            receiverSockets.forEach((sock) => {
              if (sock.readyState === 1) {
                sock.send(JSON.stringify(messageToSend));
              }
            });
          }

          // Send message back to sender (for UI confirmation)
          const senderSockets = connectedUsers.get(senderId);
          if (senderSockets) {
            senderSockets.forEach((sock) => {
              if (sock.readyState === 1) {
                sock.send(JSON.stringify(messageToSend));
              }
            });
          }
        }
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    });

    // Handle client disconnection
    ws.on("close", () => {
      if (currentUserId && connectedUsers.has(currentUserId)) {
        const userSockets = connectedUsers.get(currentUserId)!;
        userSockets.delete(ws);

        // If no more sockets, remove user entry entirely
        if (userSockets.size === 0) {
          connectedUsers.delete(currentUserId);
        }

        console.log("Client disconnected:", currentUserId);
      }
    });
  });
};
