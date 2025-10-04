"use client";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useChatSocket } from "./useChatSocket";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Contact {
  id: string;
  name: string;
  lastMessage?: string;
  unread?: number;
}

interface ChatInboxProps {
  token: string;
  currentUserId: string;
  contacts: Contact[];
}

const ChatInbox: React.FC<ChatInboxProps> = ({
  token,
  currentUserId,
  contacts,
}) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    contacts[0] || null,
  );
  const [inputValue, setInputValue] = useState("");

  const {
    messages: liveMessages,
    sendMessage,
    isConnected,
  } = useChatSocket(token);
  const [history, setHistory] = useState<Message[]>([]);

  const parseTimestamp = (createdAt: any) => {
    if (!createdAt) return new Date();
    if (createdAt.seconds) return new Date(createdAt.seconds * 1000);
    return new Date(createdAt);
  };

  // Fetch old messages
  useEffect(() => {
    if (!selectedContact) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/messages/${currentUserId}/${selectedContact.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await res.json();

        const formatted: Message[] = data.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.senderId === currentUserId ? "You" : selectedContact.name,
          timestamp: parseTimestamp(msg.createdAt),
          isOwn: msg.senderId === currentUserId,
        }));

        setHistory(formatted);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [currentUserId, selectedContact, token]);

  // Combine history + live messages for rendering
  const allMessages: Message[] = [
    ...history,
    ...liveMessages
      .filter(
        (msg: any) =>
          selectedContact &&
          ((msg.senderId === currentUserId &&
            msg.receiverId === selectedContact.id) ||
            (msg.receiverId === currentUserId &&
              msg.senderId === selectedContact.id)),
      )
      .map((msg: any) => ({
        id: msg.id,
        text: msg.content,
        sender:
          msg.senderId === currentUserId
            ? "You"
            : selectedContact?.name || "Unknown",
        timestamp: msg.createdAt ? new Date(msg.createdAt) : new Date(),
        isOwn: msg.senderId === currentUserId,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
      })),
  ].filter(
    (msg, index, self) => self.findIndex((m) => m.id === msg.id) === index,
  ); // remove duplicates

  const handleSend = () => {
    if (!inputValue.trim() || !selectedContact) return;
    sendMessage(currentUserId, selectedContact.id, inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts
            .filter((contact) => contact.id !== currentUserId)
            .map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                  selectedContact?.id === contact.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <UserCircleIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {contact.name}
                      </h3>
                      {contact.unread && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <UserCircleIcon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedContact?.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {allMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-md ${msg.isOwn ? "order-2" : "order-1"}`}>
                <div
                  className={`rounded-lg p-3 ${
                    msg.isOwn
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="break-words">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={!isConnected}
              className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition flex items-center gap-2"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInbox;
