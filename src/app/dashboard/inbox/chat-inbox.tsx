"use client";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState, useRef } from "react";
import { useChatSocket } from "./useChatSocket";
import { cn } from "@/lib/cn";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const parseTimestamp = (
    createdAt: string | number | { seconds: number } | Date | null | undefined,
  ) => {
    if (!createdAt) return new Date();
    if (
      typeof createdAt === "object" &&
      "seconds" in createdAt &&
      typeof createdAt.seconds === "number"
    ) {
      return new Date(createdAt.seconds * 1000);
    }
    return new Date(createdAt as string | number | Date);
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
        interface ApiMessage {
          id: string;
          content: string;
          senderId: string;
          receiverId: string;
          createdAt?: string | number | { seconds: number } | Date;
        }
        const data: ApiMessage[] = await res.json();

        const formatted: Message[] = data.map((msg) => ({
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
        (msg) =>
          selectedContact &&
          ((msg.senderId === currentUserId &&
            msg.receiverId === selectedContact.id) ||
            (msg.receiverId === currentUserId &&
              msg.senderId === selectedContact.id)),
      )
      .map((msg) => ({
        id: msg.id,
        text: msg.content,
        sender:
          msg.senderId === currentUserId
            ? "You"
            : selectedContact?.name || "Unknown",
        timestamp: msg.createdAt ? new Date(msg.createdAt) : new Date(),
        isOwn: msg.senderId === currentUserId,
      })),
  ].filter(
    (msg, index, self) => self.findIndex((m) => m.id === msg.id) === index,
  ); // remove duplicates

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, selectedContact]);

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
    <div className="flex h-screen bg-slate-50/50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Messages</h1>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-0.5 select-none">
            <span
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                isConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-400",
              )}
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {isConnected ? "Live" : "Offline"}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts
            .filter((contact) => contact.id !== currentUserId)
            .map((contact) => {
              const isActive = selectedContact?.id === contact.id;
              return (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all border-l-4 flex items-center gap-3",
                    isActive
                      ? "bg-blue-50/50 border-blue-500 hover:bg-blue-50/70"
                      : "border-transparent hover:bg-slate-50/50",
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 uppercase shadow-sm">
                    {contact.name ? contact.name.charAt(0) : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-slate-700 truncate">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate font-normal mt-0.5">
                      Workspace Member
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/10">
        {selectedContact ? (
          <>
            <div className="bg-white border-b border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 uppercase shadow-sm">
                  {selectedContact.name ? selectedContact.name.charAt(0) : "?"}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-800 leading-tight">
                    {selectedContact.name}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                    Direct Message
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {allMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.isOwn ? "justify-end" : "justify-start",
                  )}
                >
                  <div className={cn("max-w-md", msg.isOwn ? "order-2" : "order-1")}>
                    <div
                      className={cn(
                        "rounded-[20px] px-4 py-2.5 text-sm leading-relaxed",
                        msg.isOwn
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none shadow-md"
                          : "bg-slate-100/80 text-slate-700 rounded-tl-none border border-slate-100/20 shadow-sm",
                      )}
                    >
                      <p className="break-words">{msg.text}</p>
                    </div>
                    <p
                      className={cn(
                        "text-[9px] font-bold text-slate-400 mt-1 px-1 tracking-wider uppercase",
                        msg.isOwn ? "text-right" : "text-left",
                      )}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white border-t border-slate-100 p-4">
              <div className="flex gap-2 max-w-5xl mx-auto items-center bg-white border border-slate-200/80 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 rounded-2xl p-2 pl-3 shadow-sm transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={`Message ${selectedContact.name}...`}
                  className="flex-1 border-none focus:outline-none focus:ring-0 text-sm text-slate-600 placeholder-slate-400 py-1 bg-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={cn(
                    "p-2 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer shrink-0",
                    inputValue.trim()
                      ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md active:scale-95"
                      : "bg-slate-100 text-slate-300 cursor-not-allowed",
                  )}
                >
                  <PaperAirplaneIcon className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <p>Select a contact to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInbox;
