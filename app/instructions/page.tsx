"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useExamStore } from "../store/examStore";

export default function InstructionsPage() {
  const router = useRouter();

  // =========================
  // LOCAL STATE
  // =========================
  const [isStarting, setIsStarting] =
    useState(false);

  // =========================
  // STORE
  // =========================
  const startExam = useExamStore(
    (state) => state.startExam
  );

  const initializeQuestions = useExamStore(
    (state) => state.initializeQuestions
  );

  // =========================
  // START EXAM
  // =========================
  const handleBegin = async () => {
    if (isStarting) return;

    try {
      setIsStarting(true);

      // Small frame delay
      // allows loading UI to paint first
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(true))
      );

      // Initialize exam
      initializeQuestions();

      startExam();

      // Intentional premium delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      router.push("/exam");
    } catch (error) {
      console.error(error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <main className="min-h-screen py-20 bg-slate-950 text-white flex items-center justify-center px-4 overflow-hidden">


      {/* CARD */}
      <div className="relative max-w-2xl w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        {/* HEADER */}
        <div className="mb-8">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/20 mb-6">
            i
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Examination Instructions
          </h1>

          <p className="text-slate-400 mt-3 leading-relaxed">
            Please read the following instructions
            carefully before beginning your test.
          </p>
        </div>

        {/* INSTRUCTIONS */}
        <div className="space-y-4">
          {[
            "Read every question carefully before selecting an answer.",
            "Use the Next and Previous buttons to navigate between questions.",
            "Your progress is automatically saved during the examination.",
            "The examination will auto-submit when the timer expires.",
            "Avoid refreshing or closing the browser unnecessarily.",
          ].map((instruction, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-2xl p-4"
            >
              <div className="h-8 w-8 min-w-[32px] rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              <p className="text-slate-300 leading-relaxed">
                {instruction}
              </p>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleBegin}
          disabled={isStarting}
          className={`w-full h-14 mt-8 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
            isStarting
              ? "bg-blue-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.99]"
          }`}
        >
          {isStarting ? (
            <>
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

              <span>
                Preparing Examination...
              </span>
            </>
          ) : (
            "Begin Test"
          )}
        </button>
      </div>
    </main>
  );
}