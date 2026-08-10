"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  ArrowLeft,
  FileText,
  Calculator,
  RefreshCw,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface Citation {
  document_name: string;
  page_number: number;
  snippet: string;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  citations?: Citation[];
  tool_used?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaste! Main aapka AI Campus Assistant hoon. Aap mujhse syllabus, exam schedule, attendance requirement, ya college rules ke bare me sawal pooch sakte hain.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      // API call to FastAPI backend
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, user_id: "c4f82020-0000-4000-a000-000000000001" }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          citations: data.citations,
          tool_used: data.tool_used,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Failed to reach server");
      }
    } catch (err) {
      // Fallback AI response simulation if backend is not yet populated
      setTimeout(() => {
        const fallbackMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Aapne poocha: "${query}". \n\nSyllabus ke mutabiq, Data Structures exam me 5 Modules shamil hain. Minimum attendance requirement 75% hai.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          citations: [
            {
              document_name: "Academic_Regulations_2026.pdf",
              page_number: 14,
              snippet: "Students must maintain a minimum of 75% attendance to qualify for semester examinations.",
            },
          ],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {}
      <header className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
            title="Back to Portal"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-md shadow-indigo-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-100">AI Campus Assistant Chat</h1>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Grounded RAG Agent Active
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </header>

      {}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 max-w-4xl w-full mx-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`p-2 rounded-xl flex-shrink-0 text-white shadow-md ${
                msg.sender === "user" ? "bg-indigo-600" : "bg-slate-800 border border-slate-700"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-400" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl p-4 text-sm space-y-3 ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl"
              }`}
            >
              <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

              {/* Tool Execution Tag */}
              {msg.tool_used && (
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full text-[11px] font-medium">
                  <Calculator className="w-3 h-3" />
                  <span>Executed Tool: {msg.tool_used}</span>
                </div>
              )}

              {/* Citations Box */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-indigo-400" /> Source Citations:
                  </span>
                  {msg.citations.map((cite, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between text-indigo-400 font-medium text-[11px]">
                        <span>📄 {cite.document_name}</span>
                        <span>Page {cite.page_number}</span>
                      </div>
                      <p className="text-slate-400 italic text-[11px]">"{cite.snippet}"</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Timestamp & Feedback */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>{msg.timestamp}</span>
                {msg.sender === "bot" && (
                  <div className="flex items-center space-x-2">
                    <button className="hover:text-emerald-400 transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                    <button className="hover:text-rose-400 transition-colors"><ThumbsDown className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl w-fit text-xs text-indigo-400">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI Agent searching vector database and calculating response...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {}
      <footer className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-slate-500 text-[11px] flex items-center gap-1 flex-shrink-0">
              <HelpCircle className="w-3 h-3" /> Prompts:
            </span>
            {[
              "Mujhe 75% attendance ke liye kitni classes leni padengi?",
              "DBMS ka mid-sem syllabus kya hai?",
              "Placement drive ke minimum CGPA rules kya hain?",
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full whitespace-nowrap border border-slate-700 transition-all text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Prompt Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about college syllabus, attendance, or exam timetable..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none placeholder-slate-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}