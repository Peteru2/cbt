"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { candidates } from "./data/candidates";
import { useExamStore } from "./store/examStore";
import { useEffect } from "react";


export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
  if (window.location.pathname === "/") {
    localStorage.removeItem("cbt-storage")
  }
}, [])
  const [candidateId, setCandidateIdInput] = useState("");
  const [error, setError] = useState("");
  const setCandidateId = useExamStore((state) => state.setCandidateId);
  const handleLogin = () => {
    const trimmed = candidateId.trim().toUpperCase();
    if (!trimmed) {
      setError("Candidate ID is required");
      return;
    }
    if (!candidates.includes(trimmed)) {
      setError("Invalid Candidate ID");
      return;
    }
    setCandidateId(trimmed);
    router.push("/instructions");
  };
  
  return (
    <main
      className="min-h-screen bg-slate-950 text-white flex items-center
justify-center px-4"
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-800
rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          CBT Practice Test
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Enter your Candidate ID to continue.
        </p>
        <input
          type="text"
          value={candidateId}
          onChange={(e) => setCandidateIdInput(e.target.value)}
          placeholder="CBT-1001"
          className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-4
outline-none"
        />
        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full h-14 rounded-xl cursor-pointer  bg-blue-600 hover:bg-blue-500
transition mt-6 font-semibold"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
