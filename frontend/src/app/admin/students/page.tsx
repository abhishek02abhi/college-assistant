"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  UserCheck,
  AlertTriangle,
  GraduationCap,
  MessageSquare,
  BookOpen,
  Send,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Building,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

interface StudentRecord {
  id: string;
  name: string;
  roll_no: string;
  email: string;
  branch: string;
  semester: number;
  cgpa: number;
  attendance_percentage: number;
  risk_level: "critical" | "warning" | "safe";
  recent_queries: { query: string; timestamp: string; category: string }[];
  subjects: { name: string; percentage: number; attended: number; total: number }[];
}

export default function AdminStudentTrackRecordPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");

  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: "std-101",
      name: "Rahul Sharma",
      roll_no: "21CS104",
      email: "rahul.sharma@college.edu",
      branch: "Computer Science & Engineering",
      semester: 5,
      cgpa: 8.42,
      attendance_percentage: 70.6,
      risk_level: "critical",
      recent_queries: [
        { query: "Mujhe 75% attendance ke liye kitni classes leni padengi?", timestamp: "Today 10:15 AM", category: "Attendance" },
        { query: "DBMS Mid-Sem ka syllabus aur weightage kya hai?", timestamp: "Yesterday 4:20 PM", category: "Syllabus" },
        { query: "Hostel fee refund policy for mid-term break?", timestamp: "08 Aug 2026", category: "General Notice" },
      ],
      subjects: [
        { name: "Database Management Systems", percentage: 86.6, attended: 26, total: 30 },
        { name: "Data Structures & Algorithms", percentage: 68.75, attended: 22, total: 32 },
        { name: "Operating Systems", percentage: 72.4, attended: 21, total: 29 },
        { name: "Computer Networks", percentage: 64.2, attended: 18, total: 28 },
        { name: "Software Engineering", percentage: 90.4, attended: 19, total: 21 },
      ],
    },
    {
      id: "std-102",
      name: "Priya Patel",
      roll_no: "21CS112",
      email: "priya.patel@college.edu",
      branch: "Computer Science & Engineering",
      semester: 5,
      cgpa: 9.15,
      attendance_percentage: 88.4,
      risk_level: "safe",
      recent_queries: [
        { query: "What are the minimum CGPA rules for Google & TCS placement drives?", timestamp: "Today 11:45 AM", category: "Placement" },
        { query: "Operating systems lab assignment submission deadline?", timestamp: "07 Aug 2026", category: "Academics" },
      ],
      subjects: [
        { name: "Database Management Systems", percentage: 92.0, attended: 28, total: 30 },
        { name: "Data Structures & Algorithms", percentage: 87.5, attended: 28, total: 32 },
        { name: "Operating Systems", percentage: 89.6, attended: 26, total: 29 },
        { name: "Computer Networks", percentage: 85.7, attended: 24, total: 28 },
        { name: "Software Engineering", percentage: 95.2, attended: 20, total: 21 },
      ],
    },
    {
      id: "std-103",
      name: "Amit Kumar",
      roll_no: "21EC045",
      email: "amit.kumar@college.edu",
      branch: "Electronics & Communication",
      semester: 5,
      cgpa: 7.20,
      attendance_percentage: 73.5,
      risk_level: "warning",
      recent_queries: [
        { query: "Digital Signal Processing exam date sheet?", timestamp: "06 Aug 2026", category: "Exams" },
        { query: "How to apply for attendance condonation medical certificate?", timestamp: "04 Aug 2026", category: "Attendance" },
      ],
      subjects: [
        { name: "Digital Signal Processing", percentage: 71.0, attended: 22, total: 31 },
        { name: "VLSI Design", percentage: 74.2, attended: 23, total: 31 },
        { name: "Microcontrollers", percentage: 76.0, attended: 22, total: 29 },
      ],
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<StudentRecord>(students[0]);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeSent, setNoticeSent] = useState(false);

  const filteredStudents = students.filter((std) => {
    const matchesSearch =
      std.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = selectedBranch === "all" || std.branch === selectedBranch;
    const matchesRisk = selectedRisk === "all" || std.risk_level === selectedRisk;

    return matchesSearch && matchesBranch && matchesRisk;
  });

  const handleSendWarningNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeMessage.trim()) return;
    setNoticeSent(true);
    setTimeout(() => {
      setNoticeSent(false);
      setNoticeMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased p-4 md:p-8 space-y-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
            title="Back to Home Portal"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <div className="flex items-center space-x-3">
              <UserCheck className="w-6 h-6 text-amber-400" />
              <h1 className="text-xl font-bold text-slate-100">Student Track Record & Audit Inspector</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Admin & Faculty Portal: Monitor student attendance risks, academic CGPA, and AI query history.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3.5 py-1.5 rounded-full font-medium">
          <ShieldAlert className="w-4 h-4" />
          <span>Faculty Admin Privileges Active</span>
        </div>
      </header>

      {/* Main Grid: Student Roster vs Detailed Track Inspector */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Student List & Search (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200">Student Directory ({filteredStudents.length})</h2>
              <span className="text-[11px] text-slate-400">Semester 5</span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name, roll no, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 outline-none focus:border-amber-500"
              />
            </div>

            {/* Risk Filters */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-[10px] text-slate-400 font-medium">Risk:</span>
              <button
                onClick={() => setSelectedRisk("all")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  selectedRisk === "all" ? "bg-amber-500 text-slate-950" : "bg-slate-950 text-slate-400 border border-slate-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedRisk("critical")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  selectedRisk === "critical" ? "bg-rose-500 text-white" : "bg-slate-950 text-slate-400 border border-slate-800"
                }`}
              >
                Critical (&lt;75%)
              </button>
              <button
                onClick={() => setSelectedRisk("safe")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  selectedRisk === "safe" ? "bg-emerald-500 text-slate-950" : "bg-slate-950 text-slate-400 border border-slate-800"
                }`}
              >
                Safe (&ge;75%)
              </button>
            </div>
          </div>

          {/* Student Cards List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredStudents.map((std) => {
              const isSelected = selectedStudent.id === std.id;
              return (
                <div
                  key={std.id}
                  onClick={() => setSelectedStudent(std)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? "bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10"
                      : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-slate-950 text-sm">
                        {std.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-100">{std.name}</h3>
                        <p className="text-[10px] text-slate-400">{std.roll_no} • {std.branch.split(" ")[0]}</p>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 ${isSelected ? "text-amber-400" : "text-slate-600"}`} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400">CGPA: <strong className="text-slate-200">{std.cgpa}</strong></span>
                    <span className="text-slate-400">
                      Attendance:{" "}
                      <strong className={std.attendance_percentage < 75 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                        {std.attendance_percentage}%
                      </strong>
                    </span>
                    {std.attendance_percentage < 75 ? (
                      <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[9px] rounded-full font-bold">
                        Shortage
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] rounded-full font-semibold">
                        On Track
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Track Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Inspector Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">
                  {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-slate-100">{selectedStudent.name}</h2>
                    <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full font-semibold">
                      {selectedStudent.roll_no}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-amber-400" /> {selectedStudent.branch} (Sem {selectedStudent.semester})
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Overall Attendance</span>
                <p
                  className={`text-2xl font-black ${
                    selectedStudent.attendance_percentage < 75 ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {selectedStudent.attendance_percentage}%
                </p>
              </div>
            </div>

            {/* Attendance Alert Notice Banner */}
            {selectedStudent.attendance_percentage < 75 && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-rose-300">Exam Hall Ticket Eligibility Risk Alert</h3>
                  <p className="text-[11px] text-rose-400/80">
                    Is student ki attendance target threshold (75%) se neeche hai. College regulation rules ke anusar student ko examination hall ticket roki ja sakti hai.
                  </p>
                </div>
              </div>
            )}

            {/* Subject Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" /> Subject-Wise Class Performance
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedStudent.subjects.map((sub, i) => (
                  <div key={i} className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate max-w-[180px]">{sub.name}</span>
                      <span className={`font-mono font-bold ${sub.percentage < 75 ? "text-rose-400" : "text-emerald-400"}`}>
                        {sub.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sub.percentage < 75 ? "bg-rose-500" : "bg-emerald-500"}`}
                        style={{ width: `${sub.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Attended: {sub.attended}/{sub.total}</span>
                      <span>Target: 75%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Chat Query Inspector */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-400" /> Student AI Chat Query Logs
                </h3>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  Vector RAG Activity Log
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedStudent.recent_queries.map((q, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-semibold text-amber-400">Category: {q.category}</span>
                      <span>{q.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-mono">"{q.query}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Action: Send Direct Notice */}
            <form onSubmit={handleSendWarningNotice} className="space-y-3 pt-2 border-t border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-emerald-400" /> Send Faculty Warning / Notice
              </h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={noticeMessage}
                  onChange={(e) => setNoticeMessage(e.target.value)}
                  placeholder={`Send official email/notice to ${selectedStudent.name}...`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!noticeMessage.trim()}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>

              {noticeSent && (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Official notice sent to {selectedStudent.email} successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}