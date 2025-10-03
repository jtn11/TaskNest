import { register } from "module";
import { useEffect, useRef, useState } from "react";

export function useChatSocket(token: string) {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setmessages] = useState<any[]>([]);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: "register", token }));
    };

    // incoming messages
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setmessages((prev) => [...prev, msg]);
    };

    return () => {
      ws.current?.close();
    };
  }, [token]);

  const sendMessage = (
    senderId: string,
    receiverId: string,
    content: string,
  ) => {
    ws.current?.send(
      JSON.stringify({ type: "message", senderId, receiverId, content }),
    );
  };

  return { messages, sendMessage };
}
