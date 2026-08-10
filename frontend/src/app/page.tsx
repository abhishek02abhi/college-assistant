"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  LayoutDashboard,
  Database,
  ShieldCheck,
  Sparkles,
  UserCheck,
  GraduationCap,
  Shield,
  ArrowRight,
  LogIn,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [accessDeniedMessage, setAccessDeniedMessage] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) {
      try {
        setSession(JSON.parse(sessionStr));
      } catch (err) {}
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_session");
      setSession(null);
    }
  };

  // Strictly prevent students from accessing Admin links using Modal state instead of alert()
  const handleAdminAccess = (targetPath: string) => {
    if (!session) {
      setAccessDeniedMessage("Please login first to access the system.");
      setTimeout(() => {
        navigateTo("/login");
      }, 1500);
      return;
    }

    if (session.role !== "admin") {
      setAccessDeniedMessage(
        `⚠️ ACCESS DENIED! You are logged in as a Student (${session.name}). Students cannot access Admin/Faculty Panel.`
      );
      return;
    }

    navigateTo(targetPath);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased p-6 md:p-12 flex flex-col justify-between space-y-12">
      {/* Access Denied Custom Modal */}
      {accessDeniedMessage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-sm text-slate-100">Access Restricted</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{accessDeniedMessage}</p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setAccessDeniedMessage(null)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-100">AI Campus Assistant</h1>
            <p className="text-xs text-slate-400">Autonomous College RAG Assistant & Auth Portal</p>
          </div>
        </div>

        {/* User Session Bar */}
        <div className="flex items-center space-x-3">
          {session ? (
            <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                {session.name[0]}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">{session.name}</p>
                <span className="text-[9px] uppercase font-bold text-indigo-400 block">{session.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-rose-400 ml-2 text-xs transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/30"
            >
              <LogIn className="w-4 h-4" />
              <span>Student / Admin Login</span>
            </a>
          )}
        </div>
      </header>

      {/* Main Dual Portal Selection */}
      <main className="max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase">
            Role-Protected Navigation
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">
            Student & Admin Access Portals
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Students are restricted to student features only. Faculty Admin access requires elevated privilege.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 1: STUDENT PORTAL */}
          <div className="p-8 bg-slate-900/90 border border-indigo-500/30 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-2xl">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Student Portal</h3>
                  <p className="text-xs text-slate-400">Personalized Chat & Academic Progress Tracker</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold rounded-full">
                Student Access
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/chat"
                className="p-5 bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-2xl transition-all shadow-lg group space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      AI Chat Assistant
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Query college syllabus, exam dates, and attendance math.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-indigo-400 flex items-center space-x-1 pt-2">
                  <span>Launch Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>

              <a
                href="/dashboard"
                className="p-5 bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-2xl transition-all shadow-lg group space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      Student Dashboard
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Subject breakdown, CGPA, and attendance shortage alert.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 pt-2">
                  <span>View Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>

          {/* SECTION 2: ADMIN PORTAL WITH STRICT GUARD */}
          <div className="p-8 bg-slate-900/90 border border-amber-500/30 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-2xl">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Admin & Faculty Portal</h3>
                  <p className="text-xs text-slate-400">Protected: Knowledge Base, Student Inspector & RAG Audit</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-full flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Protected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleAdminAccess("/admin/students")}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-amber-500/60 rounded-2xl transition-all shadow-lg group space-y-3 flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                      Student Track Inspector
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Inspect student attendance risk & query logs.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-amber-400 flex items-center space-x-1 pt-2">
                  <span>Inspect Students</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              <button
                onClick={() => handleAdminAccess("/admin/documents")}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-violet-500/60 rounded-2xl transition-all shadow-lg group space-y-3 flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-violet-600/20 text-violet-400 border border-violet-500/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-violet-400 transition-colors">
                      Knowledge Base
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Upload PDFs to process vectors into ChromaDB.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-violet-400 flex items-center space-x-1 pt-2">
                  <span>Upload PDFs</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              <button
                onClick={() => handleAdminAccess("/admin/analytics")}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-rose-500/60 rounded-2xl transition-all shadow-lg group space-y-3 flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-rose-400 transition-colors">
                      RAG Guardrails
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Hallucination controls and audit logs.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-rose-400 flex items-center space-x-1 pt-2">
                  <span>RAG Controls</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto w-full border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        AI Autonomous College Assistant • Role-Based Authentication & Guard System
      </footer>
    </div>
  );
}