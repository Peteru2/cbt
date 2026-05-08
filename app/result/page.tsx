"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useExamStore } from "../store/examStore";
import { calculateScore } from "../utils/calculateStore";

export default function ResultPage() {
  const router = useRouter();


  const hasHydrated = useExamStore(
    (state) => state.hasHydrated
  );

  const answers = useExamStore(
    (state) => state.answers
  );

  const selectedQuestions = useExamStore(
    (state) => state.selectedQuestions
  );

  const resetExam = useExamStore(
    (state) => state.resetExam
  );


  const [isFinishing, setIsFinishing] =
    useState(false);

  const [showResult, setShowResult] =
    useState(false);


  const score = calculateScore(
    selectedQuestions,
    answers
  );

  const percentage =
    selectedQuestions.length > 0
      ? Math.round(
          (score / selectedQuestions.length) * 100
        )
      : 0;


  useEffect(() => {
    if (hasHydrated) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [hasHydrated]);


  const handleReset = async () => {
    if (isFinishing) return;

    try {
      setIsFinishing(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      resetExam();

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsFinishing(false);
    }
  };


  // if (!hasHydrated) {
  //   return (
  //     <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
  //       <div className="flex flex-col items-center gap-5">
  //         <div className="h-14 w-14 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin" />

  //         <div className="text-center">
  //           <h2 className="text-white text-lg font-semibold">
  //             Loading Result
  //           </h2>

  //           <p className="text-slate-400 text-sm mt-1">
  //             Restoring examination data...
  //           </p>
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }


  if (!selectedQuestions.length) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-bold text-white">
            No Result Found
          </h1>

          <p className="text-slate-400 mt-3 leading-relaxed">
            Your examination result could not be
            restored. Please start a new session.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold"
          >
            Return Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 overflow-hidden">
  
      <div
        className={`relative max-w-xl w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-all duration-700 ${
          showResult
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }`}
      >
        {/* BADGE */}
        <div className="h-20 w-20 rounded-3xl bg-blue-600 flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-lg shadow-blue-500/20">
          ✓
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Examination Result
        </h1>

        <p className="text-slate-400 mb-10">
          Your examination has been completed
          successfully.
        </p>

        {/* PERCENTAGE */}
        <div className="relative mb-10">
          <div className="text-8xl md:text-9xl font-black text-blue-500 tracking-tight">
            {percentage}%
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm">
            Final Score: {score} /{" "}
            {selectedQuestions.length}
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-slate-400">
              Performance
            </span>

            <span className="font-semibold text-white">
              {percentage >= 70
                ? "Excellent"
                : percentage >= 50
                ? "Good"
                : "Needs Improvement"}
            </span>
          </div>

          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleReset}
          disabled={isFinishing}
          className={`w-full h-14 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
            isFinishing
              ? "bg-blue-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.99]"
          }`}
        >
          {isFinishing ? (
            <>
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

              <span>Finalizing Session...</span>
            </>
          ) : (
            "Finish"
          )}
        </button>
      </div>
    </main>
  );
}