"use client";

import { useState } from "react";
import { Search, Send, Paperclip } from "lucide-react";

// ─── Mock Conversations ──────────────────────────────────────
const conversations = [
  { id: "1", name: "Sarah Johnson", role: "RN", lastMessage: "Thank you for the update!", time: "2 min ago", unread: 2 },
  { id: "2", name: "Emily Rodriguez", role: "CNA", lastMessage: "When is the next shift?", time: "15 min ago", unread: 0 },
  { id: "3", name: "Michael Chen", role: "RN", lastMessage: "Documents uploaded.", time: "1 hr ago", unread: 1 },
  { id: "4", name: "Lisa Thompson", role: "LPN", lastMessage: "I'll be available next week.", time: "3 hrs ago", unread: 0 },
  { id: "5", name: "David Kim", role: "RN", lastMessage: "Can you check my schedule?", time: "Yesterday", unread: 0 },
];

const mockMessages = [
  { id: "m1", sender: "Sarah Johnson", text: "Hi, I wanted to check if my application has been reviewed yet?", time: "10:15 AM", isMe: false },
  { id: "m2", sender: "You", text: "Hi Sarah! Yes, your application is currently under review. We'll get back to you shortly.", time: "10:18 AM", isMe: true },
  { id: "m3", sender: "Sarah Johnson", text: "Thank you for the update!", time: "10:20 AM", isMe: false },
];

/**
 * Messages page — simple messaging interface with conversation list and chat area.
 */
export default function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [showList, setShowList] = useState(true);

  return (
    <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden animate-fade-in"
         style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
      <div className="flex h-full">
        {/* ── Conversation List ──────────────────────────────── */}
        <div className={`${showList ? "flex" : "hidden"} md:flex flex-col w-full md:w-80 border-r border-border`}>
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-surface-alt
                           placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => { setSelectedConvo(convo); setShowList(false); }}
                className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors
                  hover:bg-surface-hover border-b border-border-light
                  ${selectedConvo.id === convo.id ? "bg-primary/5" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary">
                    {convo.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary truncate">{convo.name}</p>
                    <span className="text-[10px] text-text-muted shrink-0">{convo.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary truncate mt-0.5">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {convo.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat Area ─────────────────────────────────────── */}
        <div className={`${!showList ? "flex" : "hidden"} md:flex flex-col flex-1`}>
          {/* Chat header */}
          <div className="px-4 sm:px-6 py-4 border-b border-border flex items-center gap-3">
            <button onClick={() => setShowList(true)} className="md:hidden text-text-secondary hover:text-text-primary">
              ←
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">
                {selectedConvo.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{selectedConvo.name}</p>
              <p className="text-xs text-text-secondary">{selectedConvo.role}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm
                  ${msg.isMe
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-surface-alt text-text-primary border border-border rounded-bl-md"
                  }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.isMe ? "text-white/60" : "text-text-muted"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-border bg-surface-alt
                           placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-light transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
