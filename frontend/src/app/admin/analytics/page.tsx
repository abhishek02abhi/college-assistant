"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ThumbsDown,
  BarChart3,
  Cpu,
  Lock,
  RefreshCw,
  Search,
  Sliders,
  Database,
  SlidersHorizontal,
} from "lucide-react";

interface FlaggedQuery {
  id: string;
  query: string;
  response: string;
  flag_reason: string;
  timestamp: string;
  status: "pending" | "reviewed" | "resolved";
}

export default function AdminAnalyticsPage() {
  const [guardrailStrictness, setGuardrailStrictness] = useState<number>(85);
  const [strictSearch, setStrictSearch] = useState<boolean>(true);
  const [blockOutsideKnowledge, setBlockOutsideKnowledge] = useState<boolean>(true);

  const [flaggedQueries, setFlaggedQueries] = useState<FlaggedQuery[]>([
    {
      id: "log-101",
      query: "Can I get a refund on hostel fees for mid-sem break?",
      response: "According to campus rules, hostel fee refunds are calculated pro-rata.",
      flag_reason: "Low confidence grounding score (0.42) - Potential Hallucination",
      timestamp: "Today, 11:20 AM",
      status: "pending",
    },
    {
      id: "log-102",
      query: "What is the passing criteria for DBMS lab assignment?",
      response: "You need 40% in internal assignments and 75% attendance.",
      flag_reason: "User thumbs down - Outdated rule snippet cited",
      timestamp: "Yesterday, 3:45 PM",
      status: "reviewed",
    },
    {
      id: "log-103",
      query: "When is the placement drive for TCS?",
      response: "TCS drive commences on 15th November for CS and IT students with CGPA > 6.5.",
      flag_reason: "High similarity score but missing drive registration link",
      timestamp: "08 Aug 2026",
      status: "resolved",
    },
  ]);

  const handleResolveFlag = (id: string) => {
    setFlaggedQueries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "resolved" } : item))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased p-4 md:p-8 space-y-8">
      {}
      <header className="max-w-6xl mx-auto flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h1 className="text-xl font-bold text-slate-100">RAG System Analytics & Audit Portal</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Monitor grounding confidence, hallucination guardrails, and user feedback logs.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-medium">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>RAG Guardrails Active</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Groundedness Score
            </span>
            <div className="text-2xl font-black text-slate-100">94.8%</div>
            <p className="text-[11px] text-emerald-400 font-medium">+2.1% higher than last week</p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Cpu className="w-4 h-4 text-indigo-400" /> Avg Retrieval Latency
            </span>
            <div className="text-2xl font-black text-slate-100">184 ms</div>
            <p className="text-[11px] text-slate-400">ChromaDB Cosine Distance</p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Database className="w-4 h-4 text-violet-400" /> Indexed Vector Chunks
            </span>
            <div className="text-2xl font-black text-slate-100">48 Chunks</div>
            <p className="text-[11px] text-slate-400">Across 3 active PDFs</p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Flagged Queries
            </span>
            <div className="text-2xl font-black text-slate-100">3 Logs</div>
            <p className="text-[11px] text-amber-400 font-medium">1 requires admin review</p>
          </div>
        </div>

        {}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-400" /> Hallucination Guardrail Controls
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust RAG similarity thresholds and strict grounding safety limits.
              </p>
            </div>
            <span className="text-xs bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full font-medium">
              LangChain Agent Rules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider threshold */}
            <div className="space-y-3 p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200">
                  Minimum Vector Similarity Threshold
                </label>
                <span className="text-xs font-bold text-indigo-400">{guardrailStrictness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={guardrailStrictness}
                onChange={(e) => setGuardrailStrictness(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Queries with source similarity score below {guardrailStrictness}% will trigger fallback response instead of hallucinating.
              </p>
            </div>

            {/* Toggles */}
            <div className="space-y-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Strict Groundedness Enforcement</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Refuse answers if PDF citations are not found.</p>
                </div>
                <input
                  type="checkbox"
                  checked={strictSearch}
                  onChange={(e) => setStrictSearch(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Block General Out-of-Domain Query</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Restrict chatbot to college-related topics only.</p>
                </div>
                <input
                  type="checkbox"
                  checked={blockOutsideKnowledge}
                  onChange={(e) => setBlockOutsideKnowledge(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 text-rose-400" /> Downvoted & Flagged Query Audit Logs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review queries flagged by students or safety filters to update vector knowledge base.
              </p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              {flaggedQueries.length} Total Logs
            </span>
          </div>

          <div className="space-y-3">
            {flaggedQueries.map((log) => (
              <div
                key={log.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                      {log.id}
                    </span>
                    <span className="text-xs font-bold text-slate-200">Query: "{log.query}"</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p className="text-slate-400 text-[11px] font-medium">AI Generated Response:</p>
                  <p className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60 font-mono text-[11px]">
                    {log.response}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-md font-medium">
                    ⚠️ {log.flag_reason}
                  </span>

                  <div className="flex items-center space-x-2">
                    {log.status === "resolved" ? (
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleResolveFlag(log.id)}
                        className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1.5 rounded-lg transition-all"
                      >
                        Mark as Reviewed & Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}