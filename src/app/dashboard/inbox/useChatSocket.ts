import { useEffect, useRef, useState } from "react";

export interface SocketMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt?: string | Date;
}

export function useChatSocket(token: string) {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setmessages] = useState<SocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      console.log("websocket connected");
      ws.current?.send(JSON.stringify({ type: "register", token }));
      setIsConnected(true);
    };

    // incoming messages
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setmessages((prev) => [...prev, msg]);
      } catch (err) {
        console.error("Error parsing message: ", err);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
      setIsConnected(false);
    };
  }, [token]);

  const sendMessage = (
    senderId: string,
    receiverId: string,
    content: string,
  ) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({ type: "message", senderId, receiverId, content }),
      );
    }
  };

  return { messages, sendMessage, isConnected };
}
