"use client";
import { useRouter } from "next/navigation";
import { useExamStore } from "../store/examStore";
import { useState } from "react";

export default function InstructionsPage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const startExam = useExamStore((state) => state.startExam);
  const initializeQuestions = useExamStore(
    (state) => state.initializeQuestions,
  );
  const handleBegin = async () => {
    try {
      setIsStarting(true);
      initializeQuestions();
      startExam();
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/exam");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-slate-950 text-white flex items-center
justify-center px-4"
    >
      <div
        className="max-w-2xl w-full bg-slate-900 rounded-3xl p-8 border
border-slate-800"
      >
        <h1 className="text-3xl font-bold mb-6">Examination Instructions</h1>

        <ul className="space-y-4 text-slate-300">
          <li>• Read every question carefully.</li>
          <li>• Click Next and Previous to navigate.</li>
          <li>• Your progress is automatically saved.</li>
          <li>• The test will auto-submit when time expires.</li>
          <li>• Do not refresh unnecessarily.</li>
        </ul>

        <button
          onClick={handleBegin}
          disabled={isStarting}
          className={`h-14 px-8 mt-6 rounded-xl font-semibold transition
  ${
    isStarting
      ? "bg-blue-400 cursor-not-allowed pointer-events-none opacity-70"
      : "bg-blue-600 hover:bg-blue-500"
  }`}
        >
          {isStarting ? "Preparing Exam..." : "Begin Test"}
        </button>
      </div>
    </main>
  );
}
