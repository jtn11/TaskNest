"use client";
import { useAuth } from "@/context/auth-context";
import ChatInbox from "./chat-inbox";
import { useWorkspace } from "@/context/workspace-context";

export default function Inbox() {
  const { token, members } = useWorkspace();
  const { currentUser } = useAuth();

  console.log("members", members);
  console.log("token", token);
  console.log("currentUser", currentUser);

  if (!token || !currentUser || !members) return <div>Loading....</div>;

  return (
    <ChatInbox
      token={token}
      currentUserId={currentUser.uid}
      contacts={members.map((m) => ({
        id: m.uid,
        name: m.username,
        lastMessage: "",
        unread: 0,
      }))}
    />
  );
}
