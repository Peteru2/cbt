"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { candidates } from "./data/candidates";
import { useExamStore } from "./store/examStore";

export default function HomePage() {
  const router = useRouter();
useEffect(() => {
  router.prefetch("/instructions");
}, [router]);
  // =========================
  // CLEAR PREVIOUS SESSION
  // =========================
  useEffect(() => {
    localStorage.removeItem("cbt-storage");
  }, []);

  // =========================
  // LOCAL STATE
  // =========================
  const [candidateId, setCandidateIdInput] =
    useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  // =========================
  // STORE
  // =========================
  const setCandidateId = useExamStore(
    (state) => state.setCandidateId
  );

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {
    if (isLoading) return;

    setError("");

    const trimmed = candidateId
      .trim()
      .toUpperCase();

    // VALIDATION
    if (!trimmed) {
      setError("Candidate ID is required");
      return;
    }

    if (!candidates.includes(trimmed)) {
      setError("Invalid Candidate ID");
      return;
    }

    try {
      setIsLoading(true);

      // Save candidate
      setCandidateId(trimmed);

      router.push("/instructions");
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 overflow-hidden">
     

      {/* CARD */}
      <div className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        {/* HEADER */}
        <div className="text-center">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-blue-500/20">
            C
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            CBT Practice Test
          </h1>

          <p className="text-slate-400 mt-3 leading-relaxed">
            Enter your candidate ID to begin your
            examination session.
          </p>
        </div>

        {/* INPUT */}
        <div className="mt-8">
          <label className="text-sm text-slate-300 mb-2 block">
            Candidate ID
          </label>

          <input
            type="text"
            value={candidateId}
            disabled={isLoading}
            onChange={(e) =>
              setCandidateIdInput(e.target.value)
            }
            placeholder="CBT-1001"
            className="w-full h-14 rounded-2xl bg-slate-800 border border-slate-700 px-5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-60"
          />

          {error && (
            <p className="text-red-400 mt-3 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full h-14 rounded-2xl mt-7 font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
            isLoading
              ? "bg-blue-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.99]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

              <span>
                Preparing Examination...
              </span>
            </>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </main>
  );
}