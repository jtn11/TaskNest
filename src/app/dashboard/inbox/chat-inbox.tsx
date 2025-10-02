"use client";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

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

const ChatInbox: React.FC = () => {
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alice Johnson",
      lastMessage: "See you tomorrow!",
      unread: 2,
    },
    { id: "2", name: "Bob Smith", lastMessage: "Thanks for the update" },
    { id: "5", name: "Carol White", lastMessage: "Can we schedule a call?" },
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How are you doing?",
      sender: "Alice Johnson",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: "2",
      text: "I'm great! Just finished the project.",
      sender: "You",
      timestamp: new Date(Date.now() - 3000000),
      isOwn: true,
    },
    {
      id: "3",
      text: "That's awesome! Can you share the details?",
      sender: "Alice Johnson",
      timestamp: new Date(Date.now() - 2400000),
      isOwn: false,
    },
    {
      id: "4",
      text: "Sure, I'll send them over in a few minutes.",
      sender: "You",
      timestamp: new Date(Date.now() - 1800000),
      isOwn: true,
    },
    {
      id: "5",
      text: "See you tomorrow!",
      sender: "Alice Johnson",
      timestamp: new Date(Date.now() - 600000),
      isOwn: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "You",
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                selectedContact.id === contact.id ? "bg-blue-50" : ""
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
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <UserCircleIcon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedContact.name}
            </h2>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
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

        {/* Input Box */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
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
