"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Building,
  Mail,
  LogOut,
} from "lucide-react";

interface SubjectAttendance {
  code: string;
  name: string;
  professor: string;
  attended: number;
  total: number;
  percentage: number;
}

interface StudentProfile {
  id: string;
  name: string;
  roll_no: string;
  email: string;
  phone: string;
  branch: string;
  semester: number;
  cgpa: number;
  credits_earned: number;
  target_percentage: number;
  total_classes: number;
  attended_classes: number;
  attendance_percentage: number;
  subjects: SubjectAttendance[];
}

export default function StudentDashboardPage() {
  const [sessionUser, setSessionUser] = useState<any>(null);

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  const [profile, setProfile] = useState<StudentProfile>({
    id: "std-101",
    name: "Rahul Sharma",
    roll_no: "21CS104",
    email: "rahul.sharma@college.edu",
    phone: "+91 98765 43210",
    branch: "Computer Science & Engineering",
    semester: 5,
    cgpa: 8.42,
    credits_earned: 94,
    target_percentage: 75,
    total_classes: 150,
    attended_classes: 106,
    attendance_percentage: 70.6,
    subjects: [
      { code: "CS501", name: "Database Management Systems", professor: "Dr. A. K. Verma", attended: 26, total: 30, percentage: 86.6 },
      { code: "CS502", name: "Data Structures & Algorithms", professor: "Prof. S. Mukherjee", attended: 22, total: 32, percentage: 68.75 },
      { code: "CS503", name: "Operating Systems", professor: "Dr. Meenakshi Rao", attended: 21, total: 29, percentage: 72.4 },
      { code: "CS504", name: "Computer Networks", professor: "Prof. R. P. Singh", attended: 18, total: 28, percentage: 64.2 },
      { code: "CS505", name: "Software Engineering", professor: "Dr. Kavita Joshi", attended: 19, total: 21, percentage: 90.4 },
    ],
  });

  // Load Logged-in Session and fetch per-student data from FastAPI
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) {
      try {
        const user = JSON.parse(sessionStr);
        setSessionUser(user);

        // Fetch dynamic student profile based on logged-in ID
        fetch(`http://localhost:8000/api/v1/student/profile?student_id=${user.user_id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.name) {
              setProfile((prev) => ({
                ...prev,
                ...data,
                target_percentage: 75,
              }));
            }
          })
          .catch(() => {});
      } catch (err) {}
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_session");
      navigateTo("/login");
    }
  };

  const calculateRequiredClasses = (attended: number, total: number, target: number) => {
    if ((attended / total) * 100 >= target) return 0;
    const req = Math.ceil((target * total - 100 * attended) / (100 - target));
    return req > 0 ? req : 0;
  };

  const overallRequiredClasses = calculateRequiredClasses(
    profile.attended_classes,
    profile.total_classes,
    profile.target_percentage
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased p-4 md:p-8 space-y-8">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-extrabold text-slate-100">Student Personal Dashboard</h1>
              <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs rounded-full font-medium">
                {profile.roll_no} • Sem {profile.semester}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Isolated student view: Customized attendance, CGPA breakdown, and AI recommendations.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/chat"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Assistant</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 text-xs px-3.5 py-2.5 rounded-xl font-semibold transition-colors"
            title="Logout of session"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-indigo-500/20">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold text-slate-100">{profile.name}</h2>
                  <span className="text-[10px] px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-semibold">
                    Verified Student Session
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-indigo-400" /> {profile.branch}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" /> {profile.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl min-w-[110px] text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">CGPA</span>
                <p className="text-lg font-black text-indigo-400 mt-0.5">{profile.cgpa} / 10</p>
              </div>

              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl min-w-[110px] text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Attendance</span>
                <p
                  className={`text-lg font-black mt-0.5 ${
                    profile.attendance_percentage >= profile.target_percentage ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {profile.attendance_percentage}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shortage Warning */}
        {profile.attendance_percentage < profile.target_percentage && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-rose-300">
                  Attendance Shortage Warning ({profile.attendance_percentage}% vs Target {profile.target_percentage}%)
                </h3>
                <p className="text-xs text-rose-400/80 mt-0.5">
                  Exam hall ticket rules: You need **{overallRequiredClasses} continuous classes** to reach target.
                </p>
              </div>
            </div>
            <a
              href="/chat"
              className="text-xs bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-xl transition-all flex-shrink-0"
            >
              Ask AI Attendance Strategy →
            </a>
          </div>
        )}

        {/* Subject Table */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Subject Attendance Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                <tr>
                  <th className="p-3">Subject & Code</th>
                  <th className="p-3">Faculty</th>
                  <th className="p-3">Attended / Total</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {profile.subjects.map((sub, idx) => {
                  const isSafe = sub.percentage >= profile.target_percentage;
                  return (
                    <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                      <td className="p-3 font-bold text-slate-200">{sub.name} ({sub.code})</td>
                      <td className="p-3 text-slate-400">{sub.professor}</td>
                      <td className="p-3 text-slate-300 font-mono">{sub.attended} / {sub.total}</td>
                      <td className={`p-3 font-bold ${isSafe ? "text-emerald-400" : "text-rose-400"}`}>
                        {sub.percentage}%
                      </td>
                      <td className="p-3">
                        {isSafe ? (
                          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] rounded-full font-bold">
                            Safe
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] rounded-full font-bold">
                            Shortage
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}